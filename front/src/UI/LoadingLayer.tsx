import styles from "./LoadingLayer.module.css";
import { useDispatch } from "react-redux";
import { loadingActions } from "../store/loading.js";
import ButtonCommon from "../components/common/ButtonCommon";
import LoadingIndicator from "./LoadingIndicator";
import React, { useEffect, useRef } from "react";

interface LoadingLayerProps {
  message: string;
  children?: string;
}

const LoadingLayer: React.FC<LoadingLayerProps> = React.memo((props) => {
  const ButtonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    ButtonRef.current?.focus();
  }, []);

  const onBtnClickHandler = () => {
    dispatch(loadingActions.close());
  };
  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles["error-modal__actions"]}>
          <p>{props.children}</p>
          <LoadingIndicator />
          <ButtonCommon
            onClickHandler={onBtnClickHandler}
            variant="outline-light"
            text="Close"
            ref={ButtonRef}
          />
          <h1 className={styles.loadingLayer}>{props.message}</h1>
        </div>
      </div>
    </>
  );
});

export default LoadingLayer;
