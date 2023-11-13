import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
// import { v4 as uuidv4 } from "uuid";

class certificateAuthService {
    static async addCertificate( certificateInfo ) {
      // const certificateId = uuidv4();
      const newCertificate = { ...certificateInfo };
      const createdNewUser = await Certificate.create({ newCertificate });
      return createdNewUser;
  };

    static async checkCertificate({ certificateId }) {
      const user = await Certificate.checkCertificateId({ certificateId });
      return user;
  };

    static async getCertificates({ userId }) {
        const certificates = await Certificate.findAll({ userId });
        return certificates;
    };

    static async getCertificate({ certificateId }) {
        const certificate = await Certificate.findByCertificateId({ certificateId });
        return certificate;
    };

    static async setCertificate({ certificateId, toUpdate }) {
        let certificate = await Certificate.findByCertificateId({ certificateId });
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!certificate) {
          const errorMessage = "해당 자격증이 존재하지 않습니다";
          return { errorMessage };
        }
    
        if (toUpdate.certificateName) {
          const fieldToUpdate = "certificateName";
          const newValue = toUpdate.certificateName;
          certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue });
        }

        if (toUpdate.certificateDetail) {
          const fieldToUpdate = "certificateDetail";
          const newValue = toUpdate.certificateDetail;
          certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue });
        }
    
        if (toUpdate.certificateOrganization) {
          const fieldToUpdate = "certificateOrganization";
          const newValue = toUpdate.certificateOrganization;
          certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue });
        }
    
        if (toUpdate.acquisitionDate) {
          const fieldToUpdate = "acquisitionDate";
          const newValue = toUpdate.acquisitionDate;
          certificate = await Certificate.update({ certificateId, fieldToUpdate, newValue });
        }
  
        return certificate;
      }

    static async deleteCertificate({ certificateId }) {
        const result = await Certificate.delete({ certificateId });
        return result;
    };
}


export { certificateAuthService };