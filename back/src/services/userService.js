import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid";
const jwt = require('../middlewares/jwtMiddleware');


class userAuthService {
  static async getUserDeletedAt({ email }) {
    const user = await User.findByEmail({ email });
    return user;
  }

  static async addUser({ name, email, password }) {
    const user = await User.findByEmail({ email });
    let errorMessage = null;
    if (user) {
      errorMessage = "이 이메일은 현재 사용중인 이메일입니다. 다른 이메일을 사용해주세요.";
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { name, email, password: hashedPassword };

    // db에 저장
    await User.create({ newUser });

    return { errorMessage };
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    let errorMessage = null;
    if (!user) {
      errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      errorMessage =
        "비밀번호가 일치하지 않습니다.";
    }

    const accessToken = jwt.sign(user);
    const refreshToken = jwt.refresh();

    const id = user._id;
    const name = user.name;
    const description = user.description;
    const userImgUrl = user.userImgUrl;
    const loginUser = { id, email, name, description, userImgUrl };

    return { errorMessage, accessToken, refreshToken, loginUser };
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  // 페이징 part
  static async getUsers_paging({ currentPage }) {
    const { totalPage, users } = await User.findAll_paging({ currentPage });
    return { totalPage, users };
  }


  static async setUser({ userId, toUpdate }) {
    let user = await User.findById({ userId });
    const beforeUserImgUrl = user.userImgUrl
    let errorMessage = null;

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      errorMessage =
        "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      const fieldToUpdate = "email";
      const newValue = toUpdate.email;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    // if (toUpdate.password) {
    //   const fieldToUpdate = "password";
    //   const newValue = bcrypt.hash(toUpdate.password, 10);
    //   user = await User.update({ userId, fieldToUpdate, newValue });
    // }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.userImgUrl) {
      const fieldToUpdate = "userImgUrl";
      const newValue = toUpdate.userImgUrl;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    return { errorMessage, beforeUserImgUrl };
  }

  static async getUserInfo({ userId }) {
    const currentUserInfo = await User.findById({ userId });
    let errorMessage = null;
    if (!currentUserInfo) {
      errorMessage =
        "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
    }
    return { errorMessage, currentUserInfo };
  }

  static async getToken({ userId }) {
    const token = await User.findRefreshToken({ userId });
    return token;
  }

  static async deleteUser({ userId }) {
    const fieldToUpdate = "deletedAt";
    const newValue = new Date();
    const { beforeUserImgUrl, deletedUser } = await User.update({ userId, fieldToUpdate, newValue });
    return { beforeUserImgUrl, deletedUser };
  }

}

export { userAuthService };
