import React, { Suspense, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ButtonCommon from "../../../common/ButtonCommon";
import FormWrapper from "../../../common/FormWrapper";
import { PortfolioOwnerDataContext } from "../Portfolio";
import { awardsCommonFormProps } from "../../../../utils/formListCommonProps";
import Award from "./Award";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import LoadingLayer from "../../../../UI/LoadingLayer";
import useInput from "../../../../hooks/useInput";
import useApi from "../../../../hooks/useApi";

const initialValue = {
  awardName: "",
  awardDetail: "",
  awardOrganization: "",
  awardDate: "2023-01-01",
};

const Awards = (props) => {
  const [addForm, setAddForm] = useState(false);
  const portfolioOwnerData = useContext(PortfolioOwnerDataContext);
  const [data, onChange, _, reset] = useInput(initialValue);
  const userState = useSelector((state) => state.userLogin);
  const { result, loading, reqIdentifier, trigger } = useApi({
    method: "get",
    path: `user/${portfolioOwnerData?.id}/awards`,
    data: "",
    shouldInitFetch: false,
  });
  const [awards, setAwards] = useState([]);
  const { awardName, awardDetail, awardOrganization, awardDate } = data;

  const { isEditable } = props;

  //form 상세설정 어레이
  const awardState = useMemo(
    () => [
      { value: awardName, changeHandler: (e) => onChange(e) },
      { value: awardDetail, changeHandler: (e) => onChange(e) },
      {
        value: awardOrganization,
        changeHandler: (e) => onChange(e),
      },
      { value: awardDate, changeHandler: (e) => onChange(e) },
    ],
    [awardName, awardDetail, awardOrganization, awardDate, onChange]
  );

  const awardFormList = useMemo(
    () =>
      awardsCommonFormProps.map((awardCommon, index) => {
        return { ...awardCommon, ...awardState[index] };
      }),
    [awardState]
  );

  //portfolioOwnerData를 가져오면 awards목록 가져오기
  useEffect(() => {
    if (portfolioOwnerData.id) {
      trigger({
        method: "get",
        path: `user/${portfolioOwnerData.id}/awards`,
        data: {},
        applyResult: true,
        isShowBoundary: true,
      });
    }
  }, [portfolioOwnerData.id]);

  //제출버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();
    //post 서버와 통신
    const awardData = { awardName, awardDetail, awardOrganization, awardDate };
    trigger({
      method: "post",
      path: `user/${userState.userInfo?.id}/award`,
      data: awardData,
      applyResult: true,
      isShowBoundary: true,
    });
  };

  //result가 변하면(awards가져오면) 트리거됨
  useEffect(() => {
    if (reqIdentifier !== "getData") return;
    setAwards(result.data?.awards || []);
  }, [result, reqIdentifier]);

  //요청성공시 재렌더링
  useEffect(() => {
    if (reqIdentifier !== "postData") return;
    const postedNewId = result.data?.awardId;
    if (result.status === 201) {
      setAwards((prev) => {
        return [
          ...prev,
          {
            _id: postedNewId,
            awardName,
            awardDetail,
            awardOrganization,
            awardDate,
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
        <h3>수상 내역</h3>
        <br />
        {loading && <LoadingLayer message="Loading....." />}
        {!loading &&
          awards &&
          awards.map((award, index) => (
            <Award
              key={`award-${index}`}
              isEditable={isEditable}
              formList={awardFormList}
              setAwards={setAwards}
              award={award}
            />
          ))}
        {isEditable && (
          <Card>
            {addForm && (
              <FormWrapper
                {...props}
                formList={awardFormList}
                onSubmitHandler={handleSubmit}
                setAddForm={setAddForm}
              />
            )}
            <ButtonCommon
              variant="light"
              size="sm"
              onClickHandler={() => {
                reset();
                return setAddForm((prev) => !prev);
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

export default Awards;
