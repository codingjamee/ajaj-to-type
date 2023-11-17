import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
import { RootState } from "@store/index";

type projectInitialValue = {
  projectName: string;
  projectDetail: string;
  projectImgFile: object | null;
  imgBase64: null;
  projectStartDate: string;
  projectEndDate: string;
};

interface State {
  userId: number;
  projectName: string;
  projectDetail: string;
  projectImgUrl: string;
  projectStartDate: string;
  projectEndDate: string;
}

const initialValue: projectInitialValue = {
  projectName: "",
  projectDetail: "",
  projectImgFile: {},
  imgBase64: null,
  projectStartDate: "2023-01-01",
  projectEndDate: "2023-01-01",
};
const Projects = ({ isEditable }: { isEditable: boolean }) => {
  const [addForm, setAddForm] = useState(false);
  const [projects, setProjects] = useState<State[] | null>([]);

  const [imgBase64, setImgBase64] = useState(null);
  const [projectImgFile, setProjectImgFile] = useState({});
  const [data, onChange, _, reset, onChangeFile] = useInput(initialValue);
  const { projectName, projectDetail, projectStartDate, projectEndDate } = data;

  const userState = useSelector((state: RootState) => state.userLogin);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);
  const { result, loading, reqIdentifier, trigger } = useApi({
    method: "get",
    path: `user/${userState?.userInfo?._id}/projects`,
    data: {},
    shouldInitFetch: false,
  });

  //form 상세설정 어레이
  const projectState = useMemo(
    () => [
      {
        value: projectName,
        changeHandler: (e: ChangeEvent<HTMLInputElement>) => onChange(e),
      },
      {
        value: projectDetail,
        changeHandler: (e: ChangeEvent<HTMLInputElement>) => onChange(e),
      },
      {
        value: imgBase64,
        changeHandler: (e: ChangeEvent<HTMLInputElement>) =>
          handleChangeFile(e),
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

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0] || null;

    if (e.target?.files && e.target?.files[0]) {
      onChangeFile(e);
      setImgBase64([]);
    }
    let reader = new FileReader();

    if (selectedFile) reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        const base64Sub = base64.toString();
        setImgBase64([base64Sub]);
        setProjectImgFile(selectedFile);
      }
    };
  };

  //제출버튼 클릭시
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    if (portfolioOwnerData?._id) {
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
                isEditable={isEditable}
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