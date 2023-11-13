import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
// import { v4 as uuidv4 } from "uuid";

class educationAuthService {
  static async addEducation(educationInfo) {
    const newEducation = { ...educationInfo };
    const createdNewUser = await Education.create({ newEducation });
    return createdNewUser;
  };

  static async checkEducation({ eduId }) {
    const user = await Education.checkEducationId({ eduId });
    return user;
  };

  static async getEducations({ userId }) {
    const educations = await Education.findAll({ userId });
    return educations;
  };

  static async getEducation({ eduId }) {
    const education = await Education.findByEduId({ eduId });
    return education;
  };

  static async setEducation({ eduId, toUpdate }) {
    let education = await Education.findByEduId({ eduId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage = "해당 학력이 존재하지 않습니다";
      return { errorMessage };
    }

    // 업데이트 대상에 school이 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.schoolName) {
      const fieldToUpdate = "schoolName";
      const newValue = toUpdate.schoolName;
      education = await Education.update({ eduId, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ eduId, fieldToUpdate, newValue });
    }

    if (toUpdate.degree) {
      const fieldToUpdate = "degree";
      const newValue = toUpdate.degree;
      education = await Education.update({ eduId, fieldToUpdate, newValue });
    }

    if (toUpdate.admissionDate) {
      const fieldToUpdate = "admissionDate";
      const newValue = toUpdate.admissionDate
      education = await Education.update({ eduId, fieldToUpdate, newValue });

    }

    if (toUpdate.graduationDate) {
      const fieldToUpdate = "graduationDate";
      const newValue = toUpdate.graduationDate
      education = await Education.update({ eduId, fieldToUpdate, newValue });
    }

    return education;
  }
  static async deleteEducation({ eduId }) {
    const result = await Education.delete({ eduId });
    return result;
  };
}


export { educationAuthService };