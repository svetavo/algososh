import { ElementStates } from "../types/element-states";
import { delay, swap } from "./utils";
import { Dispatch, SetStateAction } from "react";
import { Direction } from "../types/direction";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps {
  arr: string[];
  direction: string;
  setIsLoader: Dispatcher<boolean>;
  setIsDisabled: Dispatcher<boolean>;
  setArray: Dispatcher<string[]>;
}

export const ColumnColor = (
  index: number,
  currentIndex: number,
  arr: Array<string | number>
) => {
  let length = arr.length - 1;
  if (currentIndex > length - index) {
    return ElementStates.Modified;
  }
  if (currentIndex === index || currentIndex === length - index) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
};

// пузырек
export const bubbleSort = async ({
  arr,
  direction,
  setIsLoader,
  setIsDisabled,
  setArray,
}: IProps) => {
  setIsLoader(true);
  setIsDisabled(true);
  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (
        direction === Direction.Ascending
          ? arr[i] > arr[i + 1]
          : arr[i] < arr[i + 1]
      ) {
        swap(arr, i, i + 1);
        await delay(1000);
        setArray([...arr]);
      }
    }
  }
  setIsLoader(false);
  setIsDisabled(false);
};

// выбор
export const selectionSort = async ({
  arr,
  direction,
  setIsLoader,
  setIsDisabled,
  setArray,
}: IProps) => {
  setIsLoader(true);
  setIsDisabled(true);
  for (let i = 0; i < arr.length - 1; i++) {
    if (direction === Direction.Descending) {
      let maxInd = i;
      for (let j = i; j < arr.length; j++) {
        if (arr[maxInd] < arr[j]) {
          maxInd = j;
        }
      }
      if (i !== maxInd) {
        swap(arr, i, maxInd);
        await delay(1000);
        setArray([...arr]);
      }
    } else if (direction === Direction.Ascending) {
      let minInd = i;
      for (let j = i; j < arr.length; j++) {
        if (arr[minInd] > arr[j]) {
          minInd = j;
        }
      }
      if (i !== minInd) {
        swap(arr, i, minInd);
        await delay(1000);
        setArray([...arr]);
      }
    }
  }
  setIsLoader(false);
  setIsDisabled(false);
};
