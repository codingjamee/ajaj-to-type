import { useCallback, useEffect, useState } from "react";
import { Form, Card, Col } from "react-bootstrap";
import FormWrapper from "@components/common/FormWrapper";
import ButtonCommon from "@components/common/ButtonCommon";
import { educationsCommonFormProps } from "@utils/formListCommonProps";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useInput from "@hooks/useInput";
import useApi from "@hooks/useApi";
import LoadingLayer from "@UI/LoadingLayer";

const initialValue = {
  schoolName: "",
  major: "",
  degree: "",
  addmissionDate: "2019-01-01",
  graduationDate: "2023-01-01",
};

const Education = ({ isEditable, education = {}, setEducations }) => {
  const userState = useSelector((state) => state.userLogin);
  const [editMode, setEditMode] = useState(false);
  const [data, onChange] = useInput(education || initialValue);
  const { schoolName, major, degree, admissionDate, graduationDate } = data;
  const { result, loading, trigger, reqIdentifier } = useApi({
    method: "put",
    path: `user/${userState.userInfo?.id}/education/${education._id}`,
    data: {},
    shouldInitFetch: false,
  });

  //form 상세설정 어레이
  const eduState = useMemo(
    () => [
      {
        value: schoolName,
        changeHandler: (e) => onChange(e),
      },
      {
        value: major,
        changeHandler: (e) => onChange(e),
      },
      {
        value: degree,
        changeHandler: (e) => onChange(e),
      },
      {
        value: admissionDate,
        changeHandler: (e) => onChange(e),
      },
      {
        value: graduationDate,
        changeHandler: (e) => onChange(e),
      },
    ],
    [schoolName, major, degree, admissionDate, graduationDate, onChange]
  );

  const eduFormList = useMemo(
    () =>
      educationsCommonFormProps.map((eduCommon, index) => {
        return { ...eduCommon, ...eduState[index] };
      }),
    [eduState]
  );

  //수정해서 onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const updatedEducationData = {
      schoolName,
      major,
      degree,
      admissionDate,
      graduationDate,
    };

    //put 서버와 통신
    trigger({
      method: "put",
      path: `user/${userState.userInfo?.id}/education/${education._id}`,
      data: updatedEducationData,
      applyResult: true,
      isShowBoundary: true,
    });
  };

  //삭제함수

  const onClickDel = async (eduId) => {
    await trigger({
      method: "delete",
      path: `user/${userState.userInfo?.id}/education/${eduId}`,
      data: "",
      applyResult: true,
      isShowBoundary: true,
    });
  };

  useEffect(() => {
    if (reqIdentifier !== "putData") return;
    setEducations((prev) => {
      const updatedEdus = prev.map((prevEdu) => {
        if (prevEdu._id === education._id) {
          return {
            ...prevEdu,
            schoolName,
            major,
            degree,
            admissionDate,
            graduationDate,
          };
        }
        return prevEdu;
      });
      return updatedEdus;
    });
    setEditMode(false);
  }, [result]);

  useEffect(() => {
    if (reqIdentifier !== "deleteData") return;
    setEducations((prev) => {
      const updatedEducations = prev.filter(
        (educations) => educations._id !== education._id
      );
      return updatedEducations;
    });
    // }
  }, [result]);

  return (
    <Card className="border-0" style={{ width: "100%" }}>
      {!editMode && loading && <LoadingLayer message="Loading....." />}
      {!editMode && !loading && (
        <>
          <Card.Title>{education.schoolName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {education.major}
            <br />
            {education.degree}
          </Card.Subtitle>
          <Card.Text>
            {education.admissionDate} ~ {education.graduationDate}
          </Card.Text>
          {isEditable && (
            <Form.Group className="mb-5 text-center">
              <Col>
                <ButtonCommon
                  variant="outline-primary"
                  type="submit"
                  className="me-3"
                  text="Edit"
                  onClickHandler={() => setEditMode((prev) => !prev)}
                />
                <ButtonCommon
                  variant="outline-secondary"
                  text="Delete"
                  onClickHandler={() => onClickDel(education._id)}
                />
              </Col>
            </Form.Group>
          )}
        </>
      )}
      {editMode && (
        <FormWrapper
          formList={eduFormList}
          onSubmitHandler={onSubmitHandler}
          setAddForm={setEditMode}
          isEditable={isEditable}
        />
      )}
    </Card>
  );
};

export default Education;
