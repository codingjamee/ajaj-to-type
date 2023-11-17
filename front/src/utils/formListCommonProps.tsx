export const educationsCommonFormProps = [
  {
    controlId: "eduSchoolName",
    name: "schoolName",
    customClassName: "mb-3",
    label: "학교이름",
    placeholder: "학교이름",
  },
  {
    controlId: "eduMajor",
    name: "major",
    customClassName: "mb-3",
    label: "전공",
    placeholder: "전공",
  },
  {
    controlId: "degree",
    name: "degree",
    select: "true",
    customClassName: "mb-3",
    label: "학위",
    optionValue: "학위를 선택하세요",
    optionArr: [
      { name: "재학중", text: "재학중" },
      { name: "학사학위", text: "학사학위" },
      { name: "석사학위", text: "석사학위" },
      { name: "박사학위", text: "박사학위" },
    ],
  },
  {
    controlId: "startDate",
    name: "admissionDate",
    customClassName: "mb-3",
    label: "입학연월일",
    type: "date",
  },
  {
    controlId: "endDate",
    name: "graduationDate",
    customClassName: "mb-3",
    label: "졸업연월일",
    type: "date",
  },
];

export const projectsCommonFormProps = [
  {
    controlId: "projectName",
    name: "projectName",
    customClassName: "mb-3",
    label: "프로젝트명",
    placeholder: "프로젝트명",
  },
  {
    controlId: "projectDetail",
    name: "projectDetail",
    customClassName: "mb-3",
    label: "프로젝트설명",
    placeholder: "프로젝트설명",
  },
  {
    controlId: "projectImgFile",
    name: "projectImgFile",
    customClassName: "mb-3",
    label: "프로젝트사진",
    type: "file",
  },
  {
    controlId: "projectStartDate",
    name: "projectStartDate",
    customClassName: "mb-3",
    label: "프로젝트 시작일",
    type: "date",
  },
  {
    controlId: "projectEndDate",
    name: "projectEndDate",
    customClassName: "mb-3",
    label: "프로젝트 완성일",
    type: "date",
  },
];

export const awardsCommonFormProps = [
  {
    controlId: "awardName",
    name: "awardName",
    customClassName: "mb-3",
    label: "상 명",
    placeholder: "상 명",
  },
  {
    controlId: "awardDetail",
    name: "awardDetail",
    customClassName: "mb-3",
    label: "수상내용",
    placeholder: "수상내용",
  },
  {
    controlId: "awardOrganization",
    name: "awardOrganization",
    customClassName: "mb-3",
    label: "수상기관",
    placeholder: "수상기관",
  },
  {
    controlId: "awardDate",
    name: "awardDate",
    customClassName: "mb-3",
    label: "수상날짜",
    type: "date",
  },
];

export const certificatesCommonFormProps = [
  {
    controlId: "certificateName",
    name: "certificateName",
    customClassName: "mb-3",
    label: "자격증 명",
    placeholder: "자격증 명",
  },
  {
    controlId: "certificateDetail",
    name: "certificateDetail",
    customClassName: "mb-3",
    label: "자격증 설명",
    placeholder: "자격증 설명",
  },
  {
    controlId: "certificateOrganization",
    name: "certificateOrganization",
    customClassName: "mb-3",
    label: "자격증 발급 기관",
    placeholder: "자격증 발급 기관",
  },
  {
    controlId: "acquisitionDate",
    name: "acquisitionDate",
    customClassName: "mb-3",
    label: "자격증 발급 일자",
    type: "date",
  },
];
