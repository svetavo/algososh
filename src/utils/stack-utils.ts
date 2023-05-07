import { delay } from "./utils";
import { Dispatch, SetStateAction } from "react";
import { stack } from "../components/stack-page/Stack";
import { IArrEl } from "../utils/utils";
import { ElementStates } from "../types/element-states";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps<T> {
  value?: string;
  setIsDisabled: Dispatcher<boolean>;
  setIsLoaderAdd?: Dispatcher<boolean>;
  setIsLoaderRemove?: Dispatcher<boolean>;
  setIsLoaderClear?: Dispatcher<boolean>;
  setValue?: Dispatcher<string>;
  setArray: Dispatcher<T[]>;
  setTop?: Dispatcher<number>
}

export const pushStack = async ({
  value,
  setIsDisabled,
  setIsLoaderAdd,
  setArray,
  setValue,
  setTop
}: IProps<IArrEl>) => {
  setIsLoaderAdd!(true);
  setIsDisabled(true);
  const newEl = { number: Number(value), state: ElementStates.Default };
  stack.push(newEl);
  setArray(stack.printStack());
  setTop!(stack.top)
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
  setTop,
  setValue
}: IProps<IArrEl>) => {
  setIsLoaderRemove!(true);
  setIsDisabled(true);
  await delay(500);
  stack.pop();
  setArray(stack.printStack());
  setTop!(stack.top)
  setIsLoaderRemove!(false);
  setIsDisabled(false);
  setValue!("");
};

export const clearStack = async ({
  setIsDisabled,
  setIsLoaderClear,
  setArray,
  setTop,
  setValue
}: IProps<IArrEl>) => {
  setIsLoaderClear!(true);
  setIsDisabled(true);
  await delay(500);
  stack.clear();
  setArray(stack.printStack());
  setTop!(stack.top)
  setIsLoaderClear!(false);
  setIsDisabled(false);
  setValue!("");
};
