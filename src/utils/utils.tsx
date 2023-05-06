import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../types/element-states";

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const swap = (arr: any[], a: number, b: number): void => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps<T> {
  setArray: Dispatcher<T[]>;
  numbers?: number | undefined
}

//random array
export const randomArr = ({ setArray, numbers }: IProps<IArrEl>) => {
  const array = [];
  const max = 100;
  const count = numbers !== undefined ? numbers : getRandomInt(3, 17)
  // const count: number = getRandomInt(3, 17);
  while (array.length < count) {
    array.push({
      number: Math.floor(Math.random() * max),
      state: ElementStates.Default,
    });
  }
  setArray(array);
  return array;
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export interface IArrEl {
  number: number | string;
  state: ElementStates;
}
