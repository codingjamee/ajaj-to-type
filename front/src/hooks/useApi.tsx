import { useEffect, useState } from "react";
import { API_FETCHER, ApiMethods } from "../utils/axiosConfig";
import { useErrorBoundary } from "react-error-boundary";
import { AxiosError, AxiosResponse } from "axios";

interface useApiProps {
  method: ApiMethods;
  path: string;
  data: object;
  shouldInitFetch: boolean;
}

interface triggerProps {
  method: ApiMethods;
  path: string;
  data: object;
  applyResult: boolean;
  isShowBoundary: boolean;
  shouldSetError: boolean;
}

export type customResponseType = {
  message: string;
  status: number;
  eduId?: number;
  awardId?: number;
  postId?: number;
  certificateId?: number;
  projectId?: number;
  data: object;
};

interface useApiReturnType {
  result: customResponseType;
  loading: boolean;
  reqIdentifier: string;
  trigger: (props: triggerProps) => void;
  error?: any;
}

const useApi = ({
  method = "get",
  path = "",
  data = {},
  shouldInitFetch = false,
}: useApiProps): useApiReturnType => {
  const [result, setResult] = useState<customResponseType[]>();
  const [loading, setLoading] = useState(false);
  const [reqIdentifier, setReqIdentifier] = useState("");
  const [error, setError] = useState<AxiosError>();
  const { showBoundary } = useErrorBoundary();

  const trigger = async ({
    method: triggerMethod = method,
    path: triggerPath = path,
    data: triggerData = data,
    applyResult = false,
    isShowBoundary = true,
    shouldSetError = true,
  }) => {
    setLoading(true);

    console.log("trigger 호출");
    setReqIdentifier(triggerMethod + "Data");
    try {
      const triggerResult = await API_FETCHER[triggerMethod](
        triggerPath,
        triggerData
      );

      if (applyResult) {
        setResult(triggerResult);
        return;
      }
      return triggerResult;
    } catch (err: any) {
      if (isShowBoundary) {
        //에러 바운더리를 보여줘야 할때만 보여줌
        showBoundary(err);
        return;
      }
      shouldSetError && setError(err);
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    shouldInitFetch && console.log("초기 요청합니다!!", method, path);
    shouldInitFetch && trigger({ method, path, data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { result, loading, reqIdentifier, trigger, error };
};
export default useApi;
