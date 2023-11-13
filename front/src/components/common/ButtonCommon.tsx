import React, {
  useImperativeHandle,
  useRef,
  MouseEvent,
  ForwardedRef,
} from "react";
import { Button } from "react-bootstrap";

export type ButtonCommonType = {
  focus: () => void;
};

export type ButtonProps = {
  variant: string;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string | undefined;
  onClickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
  size?: "sm" | "lg" | undefined;
  text: string;
};

const ButtonCommon = React.forwardRef<ButtonCommonType, ButtonProps>(
  (props, ref) => {
    const {
      variant,
      type = undefined,
      className,
      onClickHandler,
      size = undefined,
      text = "",
    } = props;

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useImperativeHandle(
      ref as ForwardedRef<ButtonCommonType>,
      () => {
        return {
          focus: () => {
            buttonRef.current?.focus();
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
        ref={buttonRef}
      >
        {text}
      </Button>
    );
  }
);

export default ButtonCommon;
