import styles from "./LoadingLayer.module.css";
import { useDispatch } from "react-redux";
import { loadingActions } from "../store/loading";
import ButtonCommon from "../components/common/ButtonCommon";
import LoadingIndicator from "./LoadingIndicator";
import React, { useEffect, useRef } from "react";
const LoadingLayer = React.memo((props) => {
  const ButtonRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    ButtonRef.current.focus();
  }, []);

  const onBtnClickHandler = () => {
    dispatch(loadingActions.close());
  };
  return (
    <>
      <div className={styles.backdrop}>
        <div className="error-modal__actions">
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
