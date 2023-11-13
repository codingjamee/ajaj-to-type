import React, { useImperativeHandle, useRef } from "react";
import { Button } from "react-bootstrap";

const ButtonCommon = React.forwardRef((props, ref) => {
  const {
    variant,
    type = "",
    className,
    onClickHandler,
    size = "",
    text = "",
  } = props;

  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current.focus();
        },
      };
    },
    []
  );

  return (
    <Button
      variant={variant}
      type={type}
      className={className}
      onClick={onClickHandler}
      size={size}
      ref={inputRef}
    >
      {text}
    </Button>
  );
});

export default ButtonCommon;
