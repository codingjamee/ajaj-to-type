import { ApiMethods } from "@utils/axiosConfig";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { ChangeEvent, FormEvent } from "react";

export type FormCommonProps = {
  controlId: string;
  select?: boolean;
  label: string;
  placeholder?: string;
  type: string;
  changeHandler: ChangeEvent<HTMLInputElement>;
  value?: string;
  name: string;
  customClassName?: string;
  optionValue?: string;
  optionArr?: OptionArrType[];
};

export type OptionArrType = {
  name: string;
  text: string;
};

export type FormListType = {
  controlId: string;
  name: string;
  select?: boolean;
  customClassName: string;
  label?: string;
  optionValue?: string;
  optionArr?: OptionArrType[];
};

export type FormWrapperProps = {
  formList: FormListType[];
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void> | boolean;
  setAddForm: React.Dispatch<React.SetStateAction<boolean>>;
  isEditable: boolean;
};

export type usersReturnType = {
  data: {
    users: userInfoType[];
    totalPage: number;
  };
};

export interface userInfoType {
  _id: string;
  email: string;
  name: string;
  description: string;
  userImgUrl?: string;
  message: string;
}

export interface useApiProps {
  method: ApiMethods;
  path: string;
  data: object;
  shouldInitFetch: boolean;
}

export interface triggerProps {
  method: ApiMethods;
  path: string;
  data: object;
  applyResult: boolean;
  isShowBoundary: boolean;
  shouldSetError?: boolean;
}

export type resultDataType = {};

export type customResponseType = {
  message: string;
  status: number;
  eduId?: number;
  awardId?: number;
  postId?: number;
  certificateId?: number;
  projectId?: number;
  data: dataReturnType[];
} & AxiosPromise<string>;

export interface useApiReturnType {
  result: customResponseType;
  loading: boolean;
  reqIdentifier: string;
  trigger: (props: triggerProps) => void;
  error?: any;
}

export interface LoginState {
  userInfo: userInfoType;
}

export interface fetcherTypes {
  path: string;
  body?: Body;
  params?: string;
}

export type API_FETCHER = {
  get: (...args: any[]) => Promise<customResponseType[]>;
  post: (...args: any[]) => Promise<customResponseType[]>;
  put: (...args: any[]) => Promise<customResponseType[]>;
  patch: (...args: any[]) => Promise<customResponseType[]>;
  delete: (...args: any[]) => Promise<customResponseType[]>;
};

export interface Body extends AxiosRequestConfig {}

export type dataReturnType = {
  awards?: awardType;
  projects?: projectType;
  educations?: educationType;
  certificates?: certificateType;
};

export type mvpType =
  | awardType
  | projectType
  | educationType
  | certificateType
  | undefined;

export type awardType = {
  _id?: number;
  awardId?: number;
  awardName: string;
  awardDetail: string;
  awardOrganization: string;
  awardDate: string;
};

export type projectType = {
  _id?: number;
  projectId?: number;
  projectName: string;
  projectDetail: string;
  projectOrganization: string;
  projectDate: string;
};

export type educationType = {
  _id?: number;
  educationId?: number;
  educationName: string;
  educationDetail: string;
  educationOrganization: string;
  educationDate: string;
};

export type certificateType = {
  _id?: number;
  certificateId?: number;
  certificateName: string;
  certificateDetail: string;
  certificateOrganization: string;
  certificateDate: string;
};

export interface awardPropsType {
  isEditable: boolean;
  award: awardType[];
  setAwards: React.Dispatch<React.SetStateAction<dataReturnType[]>>;
}
export interface projectPropsType {}
export interface educationPropsType {}
export interface certificatePropsType {}
