import React, { useCallback, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ButtonCommon from "@components/common/ButtonCommon";
import FormWrapper from "@components/common/FormWrapper";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { projectsCommonFormProps } from "@utils/formListCommonProps";
import Project from "./Project";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import useApi from "@hooks/useApi";
import LoadingLayer from "@UI/LoadingLayer";
import useInput from "@hooks/useInput";

const initialValue = {
  projectName: "",
  projectDetail: "",
  projectImgFile: {},
  imgBase64: null,
  projectStartDate: "2023-01-01",
  projectEndDate: "2023-01-01",
};
const Projects = (props) => {
  const [addForm, setAddForm] = useState(false);
  const [projects, setProjects] = useState([]);

  const [imgBase64, setImgBase64] = useState(null);
  const [projectImgFile, setProjectImgFile] = useState({});
  const [data, onChange, _, reset, onChangeFile] = useInput(initialValue);
  const { projectName, projectDetail, projectStartDate, projectEndDate } = data;

  const userState = useSelector((state) => state.userLogin);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);
  const { isEditable } = props;
  const { result, loading, reqIdentifier, trigger } = useApi({
    method: "get",
    path: `user/${userState?.userInfo?.id}/projects`,
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
    if (e.target?.files && e.target?.files[0]) {
      onChangeFile(e);
      setImgBase64([]);
    }
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        const base64Sub = base64.toString();
        setImgBase64(base64Sub);
        setProjectImgFile(e.target.files[0]);
      }
    };
  };

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectImgFile) {
      alert("이미지를 등록해주세요");
      return;
    }

    const formData = new FormData();

    formData.append("projectName", projectName);
    formData.append("projectDetail", projectDetail);
    formData.append("image", projectImgFile);
    formData.append("projectStartDate", projectStartDate);
    formData.append("projectEndDate", projectEndDate);
    //post 서버와 통신

    trigger({
      method: "post",
      path: `user/${userState?.userInfo?.id}/project`,
      data: formData,
      applyResult: true,
      isShowBoundary: true,
    });
  };

  // 모든 project 목록 가져오기 서버와 통신
  useEffect(() => {
    if (portfolioOwnerData.id) {
      trigger({
        method: "get",
        path: `user/${portfolioOwnerData.id}/projects`,
        data: {},
        applyResult: true,
        isShowBoundary: true,
      });
    }
  }, [portfolioOwnerData.id]);

  //result가 변하면(projects가져오면) 트리거됨
  useEffect(() => {
    if (reqIdentifier !== "getData") return;
    setProjects(result.data?.projects || []);
  }, [result.data, reqIdentifier]);

  //요청성공시 재렌더링
  useEffect(() => {
    if (reqIdentifier !== "postData") return;
    const postedNewId = result.data?.projectId;
    const postedNewImgUrl = result.data?.projectImgUrl;
    if (result.status === 201) {
      setProjects((prev) => {
        return [
          ...prev,
          {
            _id: postedNewId,
            projectName,
            projectDetail,
            projectImgUrl: postedNewImgUrl,
            projectStartDate,
            projectEndDate,
          },
        ];
      });
      reset();
      setAddForm(false);
    }
  }, [result, reqIdentifier]);

  return (
    <>
      <Card border="warning">
        <h3>프로젝트</h3>
        <br />
        {loading && <LoadingLayer message="Loading....." />}
        {!loading &&
          projects &&
          projects.map((project, index) => (
            <Project
              key={`project-${index}`}
              isEditable={isEditable}
              formList={projectFormList}
              setProjects={setProjects}
              project={project}
            />
          ))}
        {isEditable && (
          <Card>
            {addForm && (
              <FormWrapper
                {...props}
                formList={projectFormList}
                onSubmitHandler={handleSubmit}
                setAddForm={setAddForm}
              />
            )}
            <ButtonCommon
              variant="light"
              size="sm"
              onClickHandler={() => {
                setImgBase64("");
                reset();
                setAddForm((prev) => !prev);
              }}
              text={addForm ? "-" : "+"}
            />
          </Card>
        )}
      </Card>
      <br />
    </>
  );
};

export default Projects;
