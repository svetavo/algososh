import { delay } from "./utils";
import { Dispatch, SetStateAction } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps {
  value: number;
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
  if (value >= 1 && value <= 19) {
    let arr = [0, 1];
    for (let i = 2; i <= value; i++) {
      arr[i] = arr[i - 2] + arr[i - 1];
      await delay(500);
      setResult(arr.slice(0, i + 1));
    }
    setIsLoader(false);
    setValue("");
  } else {
    setIsLoader(false);
    return null;
  }
};
