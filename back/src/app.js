import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { educationAuthRouter } from "./routers/educationRouter";
import { projectAuthRouter } from "./routers/projectRouter";
import { awardAuthRouter } from "./routers/awardRouter";
import { certificateAuthRouter } from "./routers/certificateRouter";

const app = express();

// CORS 에러 방지
const corsOption = {
  origin: [
    "http://kdt-ai-9-team3.elicecoding.com",
    "http://kdt-ai-9-team3.elicecoding.com:3000",
    "http://ec2-13-124-235-120.ap-northeast-2.compute.amazonaws.com",
    "http://ec2-13-124-235-120.ap-northeast-2.compute.amazonaws.com:3000",
    "13.124.235.120",
    "13.124.235.120:80",
    "http://localhost:3000",
    "http://34.64.75.220",
    "http://34.64.75.220:3000",
  ],
  optionsSuccessStatus: 200,

  credentials: true, // false하면 login창에서 다음으로 넘어가지 않음.
  // header에 Access-Control-Allow-Credentials 포함 여부

  exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOption));
//app.use(cors());
// corsOption 제거하면 login창에서 다음으로 넘어가지 않음.


// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, Elice 레이서 1차 프로젝트 3팀 API 입니다.");
});


// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use("/api", userAuthRouter);
app.use("/api", educationAuthRouter);
app.use("/api", projectAuthRouter);
app.use("/api", awardAuthRouter);
app.use("/api", certificateAuthRouter);


// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };
