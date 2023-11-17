import React, {
  useImperativeHandle,
  useRef,
  MouseEvent,
  ForwardedRef,
  ComponentPropsWithoutRef,
} from "react";
import { Button } from "react-bootstrap";

export type ButtonCommonType = {
  focus: () => void;
};

export type ButtonProps = {
  variant: string;
  text: string;
  onClickHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string | undefined;
  type?: "submit" | "reset" | "button" | undefined;
  size?: "sm" | "lg" | undefined;
} & ComponentPropsWithoutRef<"button">;

const ButtonCommon = React.forwardRef<ButtonCommonType, ButtonProps>(
  (
    {
      variant,
      type,
      className,
      onClickHandler,
      size,
      text,
      ...otherProps
    }: ButtonProps,
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useImperativeHandle(
      ref,
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
        {...otherProps}
      >
        {text}
      </Button>
    );
  }
);

export default ButtonCommon;
