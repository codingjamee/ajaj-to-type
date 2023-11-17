import { Form, Row, Col } from "react-bootstrap";
import ButtonCommon from "./ButtonCommon";
import FormCommon from "./FormCommon";
import { FormEvent, useMemo } from "react";

//form button 상세설정 어레이

export type OptionArrType = {
  name: string;
  text: string;
};

type FormListType = {
  controlId: string;
  name: string;
  select?: boolean;
  customClassName: string;
  label?: string;
  optionValue?: string;
  optionArr?: OptionArrType[];
};

type FormWrapperProps = {
  formList: FormListType[];
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void> | boolean;
  setAddForm: React.Dispatch<React.SetStateAction<FormListType[]>>;
  isEditable: boolean;
};

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
