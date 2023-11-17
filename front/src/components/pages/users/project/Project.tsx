import React, { useEffect, useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import ButtonCommon from "@components/common/ButtonCommon";
import FormWrapper from "@components/common/FormWrapper";
import { projectsCommonFormProps } from "@utils/formListCommonProps";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useApi from "@hooks/useApi";
import useInput from "@hooks/useInput";
import LoadingLayer from "@UI/LoadingLayer";

const initialValue = {
  projectName: "",
  projectDetail: "",
  projectImgFile: {},
  imgBase64: null,
  projectStartDate: "2023-01-01",
  projectEndDate: "2023-01-01",
};

const Project = ({ isEditable, project = {}, setProjects }) => {
  const [editMode, setEditMode] = useState(false);
  const [projectImgFile, setProjectImgFile] = useState(null);
  const [data, onChange, _, _2, onChangeFile] = useInput(initialValue);
  const { projectName, projectDetail, projectStartDate, projectEndDate } = data;

  const userState = useSelector((state) => state.userLogin);
  const [imgBase64, setImgBase64] = useState(project.projectImgUrl || null);
  const { result, loading, reqIdentifier, trigger } = useApi({
    method: "put",
    path: `user/${userState.userInfo?.id}/project/${project._id}`,
    data: {},
    shouldInitFetch: false,
  });

  //form 상세설정 어레이
  const projectState = useMemo(
    () => [
      {
        value: projectName,
        changeHandler: (e) => onChange(e),
      },
      {
        value: projectDetail,
        changeHandler: (e) => onChange(e),
      },
      {
        value: imgBase64,
        changeHandler: (e) => handleChangeFile(e),
      },
      { value: projectStartDate, changeHandler: (e) => onChange(e) },
      { value: projectEndDate, changeHandler: (e) => onChange(e) },
    ],
    [
      onChange,
      projectName,
      projectDetail,
      imgBase64,
      projectStartDate,
      projectEndDate,
    ]
  );

  const projectFormList = useMemo(
    () =>
      projectsCommonFormProps.map((projectCommon, index) => {
        return { ...projectCommon, ...projectState[index] };
      }),
    [projectState]
  );

  const handleChangeFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      onChangeFile(e);
      setImgBase64([]);
      setProjectImgFile({});
    }
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        var base64Sub = base64.toString();

        setImgBase64(base64Sub);
        setProjectImgFile(e.target.files[0]);
      }
    };
  };

  //수정해서 onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("projectName", projectName);
    formData.append("projectDetail", projectDetail);
    formData.append("image", projectImgFile);
    formData.append("projectStartDate", projectStartDate);
    formData.append("projectEndDate", projectEndDate);
    //put 서버와 통신

    trigger({
      method: "put",
      path: `user/${userState?.userInfo?.id}/project/${project._id}`,
      data: formData,
      applyResult: true,
      isShowBoundary: true,
    });
  };

  //삭제함수

  const onClickDel = async (projectId) => {
    trigger({
      method: "delete",
      path: `user/${userState.userInfo?.id}/project/${projectId}`,
      data: {},
      applyResult: false,
      isShowBoundary: true,
      shouldSetError: true,
    });
  };

  useEffect(() => {
    if (reqIdentifier !== "putData") return;
    const postedNewImgUrl = result.data?.projectImgUrl;
    console.log(postedNewImgUrl);
    setProjects((prev) => {
      const updatedProjects = prev.map((prevProject) => {
        if (prevProject._id === project._id) {
          return {
            ...prevProject,
            projectName,
            projectDetail,
            projectImgUrl: postedNewImgUrl,
            projectStartDate,
            projectEndDate,
          };
        }
        return prevProject;
      });
      return updatedProjects;
    });
    result.data?.message && alert(result.data?.message);
    setEditMode(false);
    setImgBase64(null);
    setProjectImgFile({}); //파일 비워주기?
    //생각해볼것... 파일을 만약 제출하지 않고 프로젝트 명 설명을 넣었다면?
  }, [result, reqIdentifier]);

  //내가 삭제할 id를 걸러줌
  useEffect(() => {
    console.log(reqIdentifier);
    if (reqIdentifier !== "deleteData") return;
    setProjects((prevObj) => {
      const updatedCertificates = prevObj.filter(
        (projects) => projects._id !== project._id
      );
      return updatedCertificates;
    });
    // }
  }, [result, reqIdentifier]);

  return (
    <Card
      className="border-0"
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "content-box",
      }}
    >
      {!editMode && loading && <LoadingLayer message="Loading....." />}
      {!editMode && !loading && (
        <>
          <Card.Title>{project.projectName}</Card.Title>

          <Card.Subtitle
            className="mb-2 text-muted"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {project.projectDetail}
            <img
              alt="projectImg"
              src={project.projectImgUrl}
              style={{ width: "100%" }}
            />
          </Card.Subtitle>
          <Card.Text>
            {project.projectStartDate} ~ {project.projectEndDate}
          </Card.Text>

          {isEditable && (
            <Form.Group className="mb-5 text-center">
              <Col sm={{ span: 20 }}>
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
                  onClickHandler={() => onClickDel(project._id)}
                />
              </Col>
            </Form.Group>
          )}
        </>
      )}
      {editMode && (
        <FormWrapper
          onSubmitHandler={onSubmitHandler}
          isEditable={isEditable}
          formList={projectFormList}
          setAddForm={setEditMode}
        />
      )}
    </Card>
  );
};

export default Project;
