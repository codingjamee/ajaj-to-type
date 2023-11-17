import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ButtonCommon from "@components/common/ButtonCommon";
import img from "@assets/logo0.png";
import { ButtonProps } from "@components/common/ButtonCommon";

export interface ErrorFallbackProps {
  resetErrorBoundary: () => void;
}

const BtnSetting: ButtonProps = {
  variant: "primary",
  text: "다시시도!",
  type: "submit",
  className: "me-3",
};

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  resetErrorBoundary,
}) => {
  return (
    <div>
      <h1>
        어디선가 에러가 났어요....
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

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
