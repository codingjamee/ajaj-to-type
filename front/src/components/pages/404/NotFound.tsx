import { useNavigate } from "react-router-dom";
import logo from "@assets/logo0.png";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ fontSize: "100px", textAlign: "center" }}>
      <span className="material-symbols-outlined">
        Error 페이지를 찾을 수 없습니다 Error
      </span>
      <div
        onClick={() => {
          navigate("/login");
        }}
      >
        <img
          src={logo}
          style={{ width: "100px", height: "100px" }}
          alt="error"
        />
        <span
          className="material-symbols-outlined"
          style={{ cursor: "pointer" }}
        >
          login 로그인 하러가기
        </span>
      </div>
    </div>
  );
};

export default NotFound;
