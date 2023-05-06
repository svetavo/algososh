import { delay } from "./utils";
import { Dispatch, SetStateAction } from "react";
import { stack } from "../components/stack-page/Stack";
import { IArrEl } from "../utils/utils";
import { ElementStates } from "../types/element-states";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps<T> {
  value?: string;
  currentIndex?: number;
  setIsDisabled: Dispatcher<boolean>;
  setIsLoaderAdd?: Dispatcher<boolean>;
  setIsLoaderRemove?: Dispatcher<boolean>;
  setIsLoaderClear?: Dispatcher<boolean>;
  setValue?: Dispatcher<string>;
  setArray: Dispatcher<T[]>;
  setCurrentIndex?: Dispatcher<number>;
}

export const pushStack = async ({
  value,
  setIsDisabled,
  setIsLoaderAdd,
  setArray,
  setCurrentIndex,
  currentIndex,
  setValue,
}: IProps<IArrEl>) => {
  setIsLoaderAdd!(true);
  setIsDisabled(true);
  const newEl = { number: Number(value), state: ElementStates.Default };
  stack.push(newEl);
  setArray(stack.printStack());
  setCurrentIndex!(currentIndex! + 1);
  newEl.state = ElementStates.Changing;
  await delay(500);
  setValue!("");
  newEl.state = ElementStates.Default;
  setIsLoaderAdd!(false);
  setIsDisabled(false);
};

export const popStack = async ({
  setIsDisabled,
  setIsLoaderRemove,
  setArray,
  setCurrentIndex,
}: IProps<IArrEl>) => {
  setIsLoaderRemove!(true);
  setIsDisabled(true);
  await delay(500);
  stack.pop();
  setArray(stack.printStack());
  setCurrentIndex!(stack.getSize() - 1);
  setIsLoaderRemove!(false);
  setIsDisabled(false);
};

export const clearStack = async ({
  setIsDisabled,
  setIsLoaderClear,
  setArray,
}: IProps<IArrEl>) => {
  setIsLoaderClear!(true);
  setIsDisabled(true);
  await delay(500);
  stack.clear();
  setArray(stack.printStack());
  setIsLoaderClear!(false);
  setIsDisabled(false);
};
