const { Router } = require('express');
const { login_required, userId_checked, request_checked } = require('../middlewares/requireMiddleware');
const { NotFoundError } = require('../middlewares/errorHandlingMiddleware');
const { awardAuthService } = require('../services/awardService');
const ObjectId = require('mongoose').Types.ObjectId;
const awardAuthRouter = Router();

// 수상내역 추가하기
awardAuthRouter.post("/user/:id/award", login_required, request_checked, async function (req, res, next) {
    try {
      const userId = ObjectId(req.params.id);
        const { awardName, awardDetail, awardOrganization, awardDate } = req.body;
        const newAward = await awardAuthService.addAward({
            userId, awardName, awardDetail, awardOrganization, awardDate});

      if (!newAward) {
        throw new NotFoundError("해당 수상내역이 생성되지 않았습니다.");
      }
      console.log('추가 오브젝트 id', newAward._id);
      res.status(201).send({
        awardId: newAward._id,
        message: "수상내역 추가에 성공했습니다."
      });
    } catch (error) {
      next(error);
    }
  });


// 수상내역 전체 가져오기
awardAuthRouter.get("/user/:id/awards", login_required, async function (req, res, next) {
  try {
    const userId = ObjectId(req.params.id);
    const awards = await awardAuthService.getAwards({ userId });

    if (!awards) {
      throw new NotFoundError("수상내역을 가져올 수 없습니다.");
    }
    res.status(200).send({awards});
  } catch (error) {
    next(error);
  }
});


// 수상내역 수정하기
awardAuthRouter.put("/user/:id/award/:awardId", login_required, userId_checked, request_checked, async function (req, res, next) {
    try {
      const awardId = ObjectId(req.params.awardId);

      const { awardName, awardDetail, awardOrganization, awardDate } = req.body;
      const toUpdate = { awardName, awardDetail, awardOrganization, awardDate };

      const updatedAward = await awardAuthService.setAward({ awardId, toUpdate });

      if (!updatedAward) {
        throw new NotFoundError("해당 수상내역이 수정되지 않았습니다.");
      }
  
      res.status(200).send({
        message: "수상내역 수정에 성공했습니다."
      });
    } catch (error) {
      next(error);
    }
  });


// 수상내역 삭제하기
awardAuthRouter.delete("/user/:id/award/:awardId", login_required, userId_checked, async function (req, res, next) {
  const awardId = ObjectId(req.params.awardId);
  try {
    const deleteAward = await awardAuthService.deleteAward({ awardId });

    if (!deleteAward) {
      throw new NotFoundError("해당 수상내역이 삭제되지 않았습니다.");
    }

    res.status(200).send({
      message: "수상내역 삭제에 성공했습니다."
    });
  } catch (error) {
    next(error);
  }
  
})

export { awardAuthRouter };
