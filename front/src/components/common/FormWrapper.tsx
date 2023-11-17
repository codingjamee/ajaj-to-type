import { Form, Row, Col } from "react-bootstrap";
import ButtonCommon from "./ButtonCommon";
import FormCommon from "./FormCommon";
import { useMemo } from "react";
import { FormWrapperProps } from "../../../typings/types";

//form button 상세설정 어레이

const FormWrapper = ({
  formList = [],
  onSubmitHandler,
  setAddForm,
  isEditable,
}: FormWrapperProps) => {
  const btnSet = useMemo(
    () => [
      {
        variant: "primary",
        type: "submit",
        className: "me-3",
        text: "추가",
        onClickHandler: onSubmitHandler,
      },
      {
        variant: "secondary",
        type: "button",
        className: "me-3",
        text: "취소",
        onClickHandler: () => {
          return setAddForm((prev) => !prev);
        },
      },
    ],
    [onSubmitHandler, setAddForm]
  );

  return (
    <Form onSubmit={onSubmitHandler}>
      {formList?.map((formstat) => (
        <FormCommon {...formstat} key={formstat.controlId} />
      ))}
      {isEditable && (
        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            {btnSet.map((btn) => (
              <ButtonCommon {...btn} key={btn.text} />
            ))}
          </Col>
        </Form.Group>
      )}
    </Form>
  );
};

export default FormWrapper;
