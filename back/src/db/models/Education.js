import { EducationModel } from "../schemas/education";
const ObjectId = require('mongoose').Types.ObjectId;

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async checkEducationId({ eduId }) {
    const user = await EducationModel.findOne({ _id: ObjectId(eduId) });
    return user;
  }

  static async findAll({ userId }) {
    const educations = await EducationModel.find({ userId });
    const filteredEducations = educations.map(({...rest}) => [rest._doc].map(({userId, createdAt, updatedAt, __v, ...rest}) => rest)).flat();
    const result = filteredEducations.sort(((a,b) => {
      if (new Date(a.admissionDate) > new Date(b.admissionDate)) return 1;
      if (new Date(a.admissionDate) < new Date(b.admissionDate)) return -1;

      if (new Date(a.graduationDate) > new Date(b.graduationDate)) return 1;
      if (new Date(a.graduationDate) < new Date(b.graduationDate)) return -1;
    }));

    return result;
  }

  static async findByEduId({ eduId }) {
    const Education = await EducationModel.findOne({ _id: ObjectId(eduId) });
    return Education;
  }

  static async update({ eduId, fieldToUpdate, newValue }) {
    const filter = { _id: ObjectId(eduId) };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedEducation = await EducationModel.findOneAndUpdate(filter, update, option);
    return updatedEducation;
  }

  static async delete({ eduId }) {
    const result = await EducationModel.findOneAndDelete({ _id: ObjectId(eduId) });
    return result;
  }
}


export { Education };
