import { ErrorBoundary } from "react-error-boundary";
import img from "@assets/logo0.png";
import ButtonCommon, { ButtonProps } from "@components/common/ButtonCommon";
import LoginFormR from "./LoginFormR";
import { ErrorFallbackProps } from "index";

const BtnSetting: ButtonProps = {
  variant: "primary",
  type: "submit",
  className: "me-3",
  text: "로그인 다시하러가기",
};

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  resetErrorBoundary,
}) => {
  return (
    <div>
      <h1>
        로그인에 실패했습니다
        <img src={img} alt="err" />
        ...
      </h1>
      <ButtonCommon
        {...BtnSetting}
        onClickHandler={() => {
          resetErrorBoundary();
        }}
      />
    </div>
  );
};

const Login = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <LoginFormR />
    </ErrorBoundary>
  );
};
export default Login;
