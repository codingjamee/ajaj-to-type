import { AwardModel } from "../schemas/award";
const ObjectId = require('mongoose').Types.ObjectId;

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async checkAwardId({ awardId }) {
    const user = await AwardModel.findOne({ _id: ObjectId(awardId) });
    return user;
  }

  static async findByAwardId({ awardId }) {
    const award = await AwardModel.findOne({ _id: ObjectId(awardId) });
    return award;
  }

  static async findAll({ userId }) {
    const awards = await AwardModel.find({ userId });
    const filteredAwards = awards.map(({...rest}) => [rest._doc].map(({userId, createdAt, updatedAt, __v, ...rest}) => rest)).flat();
    const result = filteredAwards.sort(((a,b) => {
      if (new Date(a.awardDate) > new Date(b.awardDate)) return 1;
      if (new Date(a.awardDate) < new Date(b.awardDate)) return -1;

      if (a.awardName > b.awardName) return 1;
      if (a.awardName < b.awardName) return -1;
    }));
    return result;
  }

  static async update({ awardId, fieldToUpdate, newValue }) {
    const filter = { _id: ObjectId(awardId) };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(filter, update, option);
    return updatedAward;
  }

  static async delete({ awardId }) {
    const result = await AwardModel.findOneAndDelete({ _id: ObjectId(awardId) });
    console.log('result', result);
    return result;
  }
}

export { Award };
