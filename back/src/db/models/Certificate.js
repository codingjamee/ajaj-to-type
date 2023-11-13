import { CertificateModel } from "../schemas/certificate";
const ObjectId = require('mongoose').Types.ObjectId;

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async checkCertificateId({ certificateId }) {
    const user = await CertificateModel.findOne({ _id: ObjectId(certificateId) });
    return user;
  }

  static async findByCertificateId({ certificateId }) {
    const certificate = await CertificateModel.findOne({ _id: ObjectId(certificateId) });
    return certificate;
  }

  static async findAll({ userId }) {
    const certificates = await CertificateModel.find({ userId });
    const filteredCertificates = certificates.map(({...rest}) => [rest._doc].map(({userId, createdAt, updatedAt, __v, ...rest}) => rest)).flat();
    const result = filteredCertificates.sort(((a,b) => {
      if (new Date(a.acquisitionDate) > new Date(b.acquisitionDate)) return 1;
      if (new Date(a.acquisitionDate) < new Date(b.acquisitionDate)) return -1;

      if (a.certificateName > b.certificateName) return 1;
      if (a.certificateName < b.certificateName) return -1;
    }));
    return result;
  }

  static async update({ certificateId, fieldToUpdate, newValue }) {
    const filter = { _id: ObjectId(certificateId) };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(filter, update, option);
    return updatedCertificate;
  }

  static async delete({ certificateId }) {
    const result = await CertificateModel.findOneAndDelete({ _id: ObjectId(certificateId) });
    return result;
  }
}

export { Certificate };
