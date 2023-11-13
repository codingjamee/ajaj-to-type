import { useCallback, useState } from "react";

const useInput = (initialValue = null) => {
  const [data, setData] = useState(initialValue);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onChangeSelect = useCallback((e) => {
    if (!e?.target?.id) return;
    const id = e.target?.id;
    const value = e.target?.value;
    setData((prev) => ({ ...prev, [id]: value }));
  }, []);

  const onChangeFile = useCallback((e) => {
    if (!e.target.files) return;
    const { files, name } = e?.target;
    console.log({ [name]: files[0] });
    console.log(e.target);
    setData((prev) => ({ ...prev, [name]: files[0] }));
  }, []);

  const reset = useCallback(() => {
    return setData(initialValue);
  }, [initialValue]);

  return [data, onChange, onChangeSelect, reset, onChangeFile];
};

export default useInput;
