const { Router } = require('express');
const { deleted_checked, login_required, request_checked } = require('../middlewares/requireMiddleware');
const { userAuthService } = require('../services/userService');
const { NotFoundError } = require('../middlewares/errorHandlingMiddleware');
const { imageUploader, imageDelete } = require("../middlewares/awssdkMiddleware");
const { RefreshTokenModel } = require('../db/schemas/refreshToken');
const ObjectId = require('mongoose').Types.ObjectId;

const userAuthRouter = Router();

// 회원가입하기
userAuthRouter.post("/user/register", request_checked, async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    const { errorMessage } = await userAuthService.addUser({ name, email, password });

    if (errorMessage) {
      throw new NotFoundError(errorMessage);
    }

    res.status(200).send({
      message: "회원가입에 성공했습니다."
    });
  } catch (error) {
    next(error);
  }
});

// 로그인하기
userAuthRouter.post("/user/login", deleted_checked, request_checked, async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const { errorMessage, accessToken, refreshToken, loginUser } = await userAuthService.getUser({ email, password });
    if (errorMessage) {
      throw new NotFoundError(errorMessage);
    }

    res.cookie("user_cookie", accessToken, {
      path: "/", // 쿠키 저장 경로
      httpOnly: true, // 클라이언트에서 쿠키 조작 불가
      sameSite: "lax",
      maxAge: 3 * 60 * 60 * 1000, // 쿠키의 유효기간 (3시간)
    });
    // refreshToken을 db로 저장
    try {
      const userId = loginUser.id; // 사용자 ID를 가져옵니다
      // 리프래시 토큰을 생성 (이미 있다면 제거하고 재발급)
      const existingRefreshToken = await RefreshTokenModel.findOne({ userId });

      if (existingRefreshToken) {
        // 기존 리프래시 토큰이 있다면 삭제
        await existingRefreshToken.remove();
      }

      // 새로운 리프래시 토큰 생성
      const refreshTokenDocument = new RefreshTokenModel({
        userId: userId,
        token: refreshToken,
        madeAt: new Date()
      });

      // 데이터베이스에 리프래시 토큰 저장
      refreshTokenDocument.save();
    } catch (error) {
      console.error("리프래시 토큰 저장 중 오류 발생:", error);
    }

    const { id, name, description, userImgUrl } = loginUser;
    res.status(200).send({ id, email, name, description, userImgUrl, message: "로그인에 성공했습니다." });

  } catch (error) {
    next(error);
  }
});


// 전체 사용자목록 가져오기
// userAuthRouter.get("/userlist", login_required, async function (req, res, next) {
//     try {
//       const users = await userAuthService.getUsers();
//       if (!users) {
//         throw new NotFoundError("사용자 목록을 가져올 수 없습니다.");
//       }

//       res.status(200).send(users);
//     } catch (error) {
//       next(error);
//     }
//   }
// );


// 전체 사용자목록 가져오기 - 페이징
userAuthRouter.get("/userlist", login_required, async function (req, res, next) {
  try {
    
    const currentPage = req.query.page;
    console.log('currentPage', currentPage);
    
    const { totalPage, users } = await userAuthService.getUsers_paging({ currentPage });
      if (!users) {
        throw new NotFoundError("사용자 목록을 가져올 수 없습니다.");
      }
    res.status(200).send({
      users: users,
      totalPage: totalPage});
  } catch (error) {
    next(error);
  }
}
);


// 회원 정보 가져오기
userAuthRouter.get("/user/current", login_required, async function (req, res, next) {
    try {
      const userId = ObjectId(req.currentUserId);
      const { errorMessage, currentUserInfo } = await userAuthService.getUserInfo({ userId });

      if (errorMessage) {
        throw new NotFoundError(errorMessage);
      }
      
      const { id, email, name, description, userImgUrl } = currentUserInfo;
      res.status(200).send({ id, email, name, description, userImgUrl });
    } catch (error) {
      next(error);
    }
  }
);

// 회원 정보 수정
userAuthRouter.patch("/users/:id", login_required, imageUploader.array("image"), request_checked,
  async function (req, res, next) {
    try {
      const userId = ObjectId(req.params.id);
      const userImgUrl = req.files[0].location;
      console.log('수정할 이미지 url', userImgUrl);
      const { name, email, password, description } = req.body;
      const toUpdate = { name, email, password, description, userImgUrl };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const { errorMessage, beforeUserImgUrl } = await userAuthService.setUser({ userId, toUpdate });

      if (errorMessage) {
        throw new NotFoundError(errorMessage);
      }
      if (beforeUserImgUrl) {
        console.log('삭제할 url', beforeUserImgUrl);
        await imageDelete(beforeUserImgUrl);
      }

      res.status(200).send({
        userImgUrl: userImgUrl,
        message: "회원정보 수정에 성공했습니다."
      });
    } catch (error) {
      next(error);
    }
  }
);

// 회원 정보 가져오기
userAuthRouter.get("/users/:id", login_required, async function (req, res, next) {
    try {
      const userId = ObjectId(req.params.id);
      const { errorMessage, currentUserInfo } = await userAuthService.getUserInfo({ userId });
      if (errorMessage) {
        throw new NotFoundError(errorMessage);
      }

      const { id, email, name, description, userImgUrl } = currentUserInfo;
      res.status(200).send({ id, email, name, description, userImgUrl });
    } catch (error) {
      next(error);
    }
  }
);

// 로그아웃
userAuthRouter.get("/logout", async function (req, res, next) {
  res.clearCookie('user_cookie').end();
})


// 회원 탈퇴
userAuthRouter.delete("/users/:id", login_required, async function (req, res, next) {
  try {
    const userId = ObjectId(req.params.id);
    const { beforeUserImgUrl, deletedUser } = await userAuthService.deleteUser({ userId });

    if (beforeUserImgUrl) {
      await imageDelete(beforeUserImgUrl)
    }
    if (!deletedUser) {
      throw new NotFoundError("탈퇴과정에서 오류가 났습니다. 다시 시도해주세요.");
    }

    res.clearCookie('user_cookie').end();
    res.status(200).send({
      message: "회원 탈퇴에 성공했습니다. 이용해주셔서 감사합니다."
    });
  } catch (error) {
    next(error);
  }
})


export { userAuthRouter };
