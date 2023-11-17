import { ChangeEvent, useCallback, useState } from "react";
import { mvpType } from "../../typings/types";

type initialValueType = {
  [name: string]: string | File;
};

const useInput = (inputValue: initialValueType | mvpType) => {
  const [data, setData] = useState(inputValue);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onChangeSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.id) return;
    const id = e.target?.id;
    const value = e.target?.value;
    setData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const onChangeFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const { files, name } = e?.target;
    console.log({ [name]: files[0] });
    console.log(e.target);
    setData((prev) => ({ ...prev, [name]: files[0] }));
  }, []);

  const reset = useCallback(() => {
    return setData(inputValue);
  }, [inputValue]);

  return [data, onChange, onChangeSelect, reset, onChangeFile] as const;
};

export default useInput;
