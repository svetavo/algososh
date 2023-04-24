import { delay } from "./utils";
import { Dispatch, SetStateAction } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps {
  value?: string;
  stack: string[];
  currentIndex?: number;
  setIsLoader: Dispatcher<boolean>;
  setValue?: Dispatcher<string>;
  setStack: Dispatcher<string[]>;
  setCurrentIndex?: Dispatcher<number>;
}

export const pushStack = ({
  value,
  stack,
  setIsLoader,
  setStack,
  setCurrentIndex,
  currentIndex,
  setValue,
}: IProps): void => {
  setIsLoader(true);
  stack.push(value!);
  setStack([...stack]);
  setCurrentIndex!(currentIndex! + 1);
  setValue!("");
  setIsLoader(false);
};

export const popStack = ({
  stack,
  setIsLoader,
  setStack,
  setCurrentIndex,
  currentIndex,
}: IProps): void => {
  setIsLoader(true);
  stack.pop();
  setStack([...stack]);
  setCurrentIndex!(currentIndex! - 1);
  setIsLoader(false);
};

export const clearStack = ({ stack, setIsLoader, setStack }: IProps): void => {
  setIsLoader(true);
  while (stack.length > 0) {
    stack.pop();
  }
  setStack([...stack]);
  setIsLoader(false);
};
