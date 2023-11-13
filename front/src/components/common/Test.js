import { useState } from "react";
import FormCommon from "./FormCommon";
import FormWrapper from "./FormWrapper";

const Test = () => {
  const [test, setTest] = useState("");
  const [edit, setEdit] = useState(false);
  const formBtnArr = [
    {
      variant: "primary",
      type: "submit",
      className: "me-3",
      text: "추가",
      onClickHandler: () => setEdit((prev) => !prev),
    },
    {
      variant: "secondary",
      type: "button",
      className: "me-3",
      text: "취소",
      onClickHandler: () => setEdit((prev) => !prev),
    },
  ];

  const testHandler = (e) => {
    e.preventDefault();
    console.log(test);
  };

  return (
    <FormWrapper
      onSubmitHandler={testHandler}
      btnSet={formBtnArr}
      isEditable="true"
    >
      <FormCommon changeHandler={setTest} value={test} />
    </FormWrapper>
  );
};

export default Test;
