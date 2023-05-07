import { delay } from "./utils";
import { Dispatch, SetStateAction } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps {
  value: string;
  setResult: Dispatcher<number[] | null>;
  setIsLoader: Dispatcher<boolean>;
  setValue: Dispatcher<string>;
}

export const fibonacci = async ({
  value,
  setResult,
  setIsLoader,
  setValue,
}: IProps)  => {
  const valueNum = Number(value)
  if (valueNum >= 1 && valueNum <= 19) {
    let arr: number[] = [0];
    await delay(500);
    setResult(arr)
    await delay(500);
    arr.push(1)
    await delay(500);
    setResult(arr)
    for (let i = 2; i <= valueNum; i++) {
      await delay(500);
      arr[i] = arr[i - 2] + arr[i - 1];
      setResult(arr.slice(0, i + 1));
    }
    setIsLoader(false);
    setValue("");
  } else {
    setIsLoader(false);
    return null;
  }
};
