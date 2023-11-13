import { UserModel } from "../schemas/user";
import { RefreshTokenModel } from "../schemas/refreshToken"
const ObjectId = require('mongoose').Types.ObjectId;

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ userId }) {
    const user = await UserModel.findOne({ _id: ObjectId(userId) });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    const filteredUsers = users.map(({...rest}) => [rest._doc].map(({password, createdAt, updatedAt, __v, deletedAt, ...rest}) => rest)).flat();
    const result = filteredUsers.sort(((a,b) => {
      // 이름순으로 정렬
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;

      // 동명이인이라면 이메일 순으로 정렬
      if (a.email > b.email) return 1;
      if (a.email < b.email) return -1;
    }));
    return result;
  }

  // 페이징 part
  static async findAll_paging({ currentPage }) {
    const showCount = 4; // 임시로 4개만
    const usersCount = await UserModel.find()
    const totalPage = Math.ceil((Object.keys(usersCount).length) / showCount);
    const skipPage = (currentPage-1) * showCount;
    console.log('시작 인덱스', skipPage);
    console.log('totalPage', totalPage);
    const users = await UserModel.find().skip(skipPage).limit(showCount);

    // const filteredUsers = users.map(({...rest}) => [rest._doc].map(({_id, password, createdAt, updatedAt, __v, deletedAt, ...rest}) => rest)).flat();
    // const result = filteredUsers.sort(((a,b) => {
    //   // 이름순으로 정렬
    //   if (a.name > b.name) return 1;
    //   if (a.name < b.namegit) return -1;

    //   // 동명이인이라면 이메일 순으로 정렬
    //   if (a.email > b.email) return 1;
    //   if (a.email < b.email) return -1;
    // }));
    return {totalPage, users};
  }

  static async update({ userId, fieldToUpdate, newValue }) {
    const user = await UserModel.findOne({ _id: ObjectId(userId) });
    const beforeUserImgUrl = user.userImgUrl;

    const filter = { _id: ObjectId(userId) };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);

    return {beforeUserImgUrl, updatedUser};
  }

  static async findRefreshToken({ userId }) {
    // id 값을 받으면 해당 id의 token값을 가져와 줍니다
    const refreshToken = await RefreshTokenModel.findOne({ userId: ObjectId(userId) }) // userId가 맞음
    return refreshToken.token;
  }
}

export { User };

