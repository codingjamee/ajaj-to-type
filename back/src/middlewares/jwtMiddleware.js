import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY || "jwt-secret-key";

module.exports = {
    sign: (user) => { // access token 발급
      const payload = { // access token에 들어갈 payload
        user_id: user.id,
      };
      return jwt.sign(payload, secret, {
        expiresIn: '1h', 	  // 유효기간
      });
    },
    
    verify: (token) => { // access token 검증
      try{
        const jwtDecoded = jwt.verify(token, secret);
        jwtDecoded.errormessage = null;
        return jwtDecoded;
      } catch (error) {
        const jwtDecoded = {};
        jwtDecoded.errormessage = error.message;
        return jwtDecoded;
      }
    },

    refresh: () => { // refresh token 발급
      return jwt.sign({}, secret, { // refresh token은 payload 없이 발급
        algorithm: 'HS256',
        expiresIn: '3h',
      });
    },
}
