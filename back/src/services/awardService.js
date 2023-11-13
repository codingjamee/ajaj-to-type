import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
// import { v4 as uuidv4 } from "uuid";

class awardAuthService {
    static async addAward( awardInfo ) {
      // const awardId = uuidv4();
      const newAward = { ...awardInfo };
      const createdNewUser = await Award.create({ newAward });
      return createdNewUser;
  };

    static async checkAward({ awardId }) {
      const user = await Award.checkAwardId({ awardId });
      return user;
  };

    static async getAwards({ userId }) {
        const awards = await Award.findAll({ userId });
        return awards;
    };

    static async getAward({ awardId }) {
        const award = await Award.findByAwardId({ awardId });
        return award;
    };


    static async setAward({ awardId, toUpdate }) {
        let award = await Award.findByAwardId({ awardId });
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!award) {
          const errorMessage = "해당 학력이 존재하지 않습니다";
          return { errorMessage };
        }
    
        if (toUpdate.awardName) {
          const fieldToUpdate = "awardName";
          const newValue = toUpdate.awardName;
          award = await Award.update({ awardId, fieldToUpdate, newValue });
        }
    
        if (toUpdate.awardDetail) {
          const fieldToUpdate = "awardDetail";
          const newValue = toUpdate.awardDetail;
          award = await Award.update({ awardId, fieldToUpdate, newValue });
        }
    
        if (toUpdate.awardOrganization) {
          const fieldToUpdate = "awardOrganization";
          const newValue = toUpdate.awardOrganization;
          award = await Award.update({ awardId, fieldToUpdate, newValue });
        }
    
        if (toUpdate.awardDate) {
          const fieldToUpdate = "awardDate";
          const newValue = toUpdate.awardDate
          award = await Award.update({ awardId, fieldToUpdate, newValue });

        }
    
        return award;
      }
    static async deleteAward({ awardId }) {
        const result = await Award.delete({ awardId });
        return result;
    };
}


export { awardAuthService };