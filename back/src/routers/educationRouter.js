const { Router } = require('express');
const { login_required, userId_checked, request_checked } = require('../middlewares/requireMiddleware');
const { NotFoundError } = require('../middlewares/errorHandlingMiddleware');
const { educationAuthService } = require('../services/educationService');
const ObjectId = require('mongoose').Types.ObjectId;

const educationAuthRouter = Router();

// 학력 추가하기
educationAuthRouter.post("/user/:id/education", login_required, request_checked, async function (req, res, next) {
    try {
        const userId = ObjectId(req.params.id);
        const { schoolName, major, degree, admissionDate, graduationDate } = req.body;
        const newEducation = await educationAuthService.addEducation({ userId, schoolName, major, degree, admissionDate, graduationDate});

      if (!newEducation) {
        throw new NotFoundError("해당 학력이 생성되지 않았습니다.");
      }

      res.status(201).send({
        eduId: newEducation._id,
        message: "학력 추가에 성공했습니다."
      });
    } catch (error) {
      next(error);
    }
  });

// 학력 전체 가져오기
educationAuthRouter.get("/user/:id/educations", login_required, async function (req, res, next) {
  try {
    const userId = ObjectId(req.params.id);
    const educations = await educationAuthService.getEducations({userId});

    if (!educations) {
      throw new NotFoundError("학력을 가져올 수 없습니다.");
    }
    res.status(200).send({educations});
  } catch (error) {
    next(error);
  }
});


// 학력 수정하기
educationAuthRouter.put("/user/:id/education/:eduId", login_required, userId_checked, request_checked, async function (req, res, next) {
    try {
      const eduId = ObjectId(req.params.eduId);

      const { schoolName, major, degree, admissionDate, graduationDate } = req.body;
      const toUpdate = { schoolName, major, degree, admissionDate, graduationDate };

      const updatedEducation = await educationAuthService.setEducation({ eduId, toUpdate });

      if (!updatedEducation) {
        throw new NotFoundError("해당 학력이 수정되지 않았습니다.");
      }
  
      res.status(200).send({
        message: "학력 수정에 성공했습니다."
      });
    } catch (error) {
      next(error);
    }
  });

// 학력 삭제하기
educationAuthRouter.delete("/user/:id/education/:eduId", login_required, userId_checked, async function (req, res, next) {
  const eduId = ObjectId(req.params.eduId);
  try {
    const deleteEducation = await educationAuthService.deleteEducation({ eduId });

    if (!deleteEducation) {
      throw new NotFoundError("해당 학력이 삭제되지 않았습니다.");
    }

    res.status(200).send({
      message: "학력 삭제에 성공했습니다."
    });
  } catch (error) {
    next(error);
  }
})

export { educationAuthRouter };
