import is from "@sindresorhus/is";
const { educationAuthService } = require('../services/educationService');
const { userAuthService } = require('../services/userService');
const { awardAuthService } = require('../services/awardService');
const { certificateAuthService } = require('../services/certificateService');
const { projectAuthService } = require('../services/projectService');
const { NotFoundError, UnauthorizedError, BadRequestError } = require('../middlewares/errorHandlingMiddleware');
const jwt = require('./jwtMiddleware');
const ObjectId = require('mongoose').Types.ObjectId;

// 탈퇴한 회원인지 확인
async function deleted_checked(req, res, next) {
  try {
    const { email } = req.body;
    const user = await userAuthService.getUserDeletedAt({ email });
    if (!user) {
      throw new UnauthorizedError("존재하지 않는 회원입니다.");
    }
    if (user.deletedAt) {
      throw new UnauthorizedError("탈퇴한 회원입니다.");
    }
    next();
  } catch (error) {
    next(error);
  }
}

// 로그인 되어있는지 확인
async function login_required(req, res, next) {
  // 쿠키 헤더 값을 가져옵니다.
  const cookies = req.headers["cookie"] || '';
  const cookieArray = cookies.split(';');

  // 유저토큰과 리프레시 토큰을 저장할 변수를 초기화합니다.
  let userToken = null;

  // 쿠키를 정렬합니다.
  const sortedCookies = cookieArray.map((cookie) => cookie.trim());
  // 정렬된 쿠키에서 유저 토큰을 찾습니다.
  for (const cookie of sortedCookies) {
    const [name, value] = cookie.split('=');
    if (name === 'user_cookie') {
      userToken = value;
    }
  }

  // 현재 접속중인 user의 DB에서 refresh 토큰 정보를 얻습니다 < - 이게 안되는 중..
  const current_userId = req.currentUserId;
  const userlist_userId = req.body.id;
  const params_userId = req.params.id;

  let userId = '';
  if (current_userId) {
    userId = ObjectId(current_userId);
  } else if (userlist_userId) {
    userId = ObjectId(userlist_userId);
  } else {
    userId = ObjectId(params_userId);
  }

  try {
    if (userToken) {
      // 해당 token이 정상적인 token인지 확인
      const jwtDecoded = jwt.verify(userToken);

      if (jwtDecoded.errormessage === 'jwt expired') {
        console.log(jwtDecoded.errormessage)
        const refreshToken = await userAuthService.getToken({ userId });
        if (!refreshToken) {
          throw new UnauthorizedError("권한이 없습니다.");
        }

        const user = await userAuthService.getUserInfo({ userId });
        // 엑세스 토큰 발급
        userToken = jwt.sign(user)
        if (!userToken) {
          throw new UnauthorizedError("권한이 없습니다.");
        }

        // 클라이언트로 새로운 유저 토큰을 전송
        res.cookie("user_cookie", userToken, {
          path: "/",
          httpOnly: true,
          sameSite: "lax",
          maxAge: 3 * 60 * 60 * 1000,
        });

        // 다시 발급된 userToken을 검사
        const jwtDecodedNew = jwt.verify(userToken);
        const user_idNew = jwtDecodedNew.user_id;
        req.currentUserId = user_idNew;
        next();
      } else if (jwtDecoded.errormessage === null) {

        const user_id = ObjectId(jwtDecoded.user_id);
        req.currentUserId = user_id;
        next();
      } else {
        // 정상적인 토큰이 아닌 경우
        throw new UnauthorizedError("정상적인 토큰이 아닙니다.");
      }
    } else {
      throw new UnauthorizedError("로그인한 유저만 사용할 수 있는 서비스입니다.");
    }
  } catch (error) {
    next(error);
  }
}

// 수정 및 삭제 시 권한 있는지 확인
// 접근 중인 userId(User)와 mvp id의 userId와 같은지 확인 -> mvp 모델에 따라 다르게
async function userId_checked(req, res, next) {
  let userId = req.params.id;
  let eduId = req.params.eduId;
  let projectId = req.params.projectId;
  let awardId = req.params.awardId;
  let certificateId = req.params.certificateId;

  try {
    if (userId) {
      userId = ObjectId(userId);
      if (eduId) {
        eduId = ObjectId(eduId);
        const user = await educationAuthService.checkEducation({ eduId });
        if (!user) {
          throw new NotFoundError("Not Found");
        }
        if (user.userId.toString() !== userId.toString()) {
          throw new UnauthorizedError("접근 권한이 없습니다.");
        }
      }
      if (projectId) {
        projectId = ObjectId(projectId);
        const user = await projectAuthService.checkProject({ projectId });
        if (!user) {
          throw new NotFoundError("Not Found");
        }
        if (user.userId.toString() !== userId.toString()) {
          throw new UnauthorizedError("접근 권한이 없습니다.");
        }
      }
      if (awardId) {
        awardId = ObjectId(awardId);
        const user = await awardAuthService.checkAward({ awardId });
        if (!user) {
          throw new NotFoundError("Not Found");
        }
        if (user.userId.toString() !== userId.toString()) {
          throw new UnauthorizedError("접근 권한이 없습니다.");
        }
      }
      if (certificateId) {
        certificateId = ObjectId(certificateId);
        const user = await certificateAuthService.checkCertificate({ certificateId });
        if (!user) {
          throw new NotFoundError("Not Found");
        }
        if (user.userId.toString() !== userId.toString()) {
          throw new UnauthorizedError("접근 권한이 없습니다.");
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}

// 요청 값 있는지 확인
function request_checked(req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError("요청 값이 없습니다.")
    }
    next();
  } catch (error) {
    next(error);
  }
}

export { deleted_checked, login_required, userId_checked, request_checked };
