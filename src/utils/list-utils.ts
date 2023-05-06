import { Dispatch, SetStateAction } from "react";
import { delay } from "../utils/utils";
import { list } from "../components/list-page/List";
import { IArrEl } from "../utils/utils";
import { ElementStates } from "../types/element-states";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps<T> {
  array?: T[];
  value?: number;
  index?: number;
  setArray: Dispatcher<T[]>;
  setValue?: Dispatcher<number | undefined>;
  setIndex?: Dispatcher<number | undefined>;
  setHead: Dispatcher<number>;
  setIsLoader: Dispatcher<boolean>;
  setIsDisabled: Dispatcher<boolean>;
  setIsChanging?: Dispatcher<string>;
  setTail: Dispatcher<number>;
  setCurrentIndex?: Dispatcher<number>;
}

interface ISel<T> {
  array: T[] | undefined;
  index: number | undefined;
}

// добавить в head
export const addHead = async ({
  array,
  value,
  setValue,
  setIsLoader,
  setIsDisabled,
  setHead,
  setTail,
  setArray,
  setIsChanging,
}: IProps<IArrEl>) => {
  setIsLoader(true);
  setIsDisabled(true);
  setIsChanging!("headAdd");
  const newEl = { number: value, state: ElementStates.Default };
  newEl.state = ElementStates.Changing;
  await delay(500);
  list.unshift(newEl, array!);
  await delay(500);
  setArray(list.print());
  newEl.state = ElementStates.Modified;
  setHead(list.head);
  setTail(list.tail);
  setIsChanging!("");
  await delay(500);
  newEl.state = ElementStates.Default;
  setValue!(undefined);
  setIsLoader(false);
  setIsDisabled(false);
};

// добавить в tail
export const addTail = async ({
  array,
  value,
  setValue,
  setIsLoader,
  setArray,
  setHead,
  setTail,
  setIsDisabled,
  setIsChanging,
}: IProps<IArrEl>) => {
  setIsLoader(true);
  setIsDisabled(true);
  setIsChanging!("tailAdd");
  const newEl = { number: value, state: ElementStates.Default };
  newEl.state = ElementStates.Changing;
  await delay(500);
  list.push(newEl, array!);
  await delay(500);
  setArray(list.print());
  newEl.state = ElementStates.Modified;
  setHead(list.head);
  setTail(list.tail);
  setIsChanging!("");
  await delay(500);
  newEl.state = ElementStates.Default;
  setValue!(undefined);
  setIsLoader(false);
  setIsDisabled(false);
};

// удалить из head
export const removeHead = async ({
  array,
  setIsLoader,
  setArray,
  setIsDisabled,
  setHead,
  setTail,
  setIsChanging,
}: IProps<IArrEl>) => {
  setIsLoader(true);
  setIsDisabled(true);
  setIsChanging!("headRemove");
  await delay(500);
  list.shift(array!);
  await delay(500);
  setArray(list.print());
  setHead(list.head);
  setTail(list.tail);
  setIsChanging!("");
  await delay(500);
  setIsDisabled!(false);
  setIsLoader!(false);
};

// удалить из tail
export const removeTail = async ({
  array,
  setIsLoader,
  setArray,
  setIsDisabled,
  setHead,
  setTail,
  setIsChanging,
}: IProps<IArrEl>) => {
  setIsLoader(true);
  setIsDisabled(true);
  setIsChanging!("tailRemove");
  await delay(500);
  list.pop(array!);
  await delay(500);
  setArray(list.print());
  setHead(list.head);
  setTail(list.tail);
  setIsChanging!("");
  await delay(500);
  setIsDisabled(false);
  setIsLoader(false);
};

//добавить по индексу
export const addIndex = async ({
  array,
  value,
  setValue,
  setIndex,
  index,
  setIsLoader,
  setIsDisabled,
  setHead,
  setTail,
  setArray,
  setIsChanging,
  setCurrentIndex,
}: IProps<IArrEl>) => {
  setIsLoader(true);
  setIsDisabled(true);
  setIsChanging!("indexAdd");
  setCurrentIndex!(index!);
  const newEl = { number: value, state: ElementStates.Default };
  newEl.state = ElementStates.Changing;
  await delay(500);
  list.addInd(index!, newEl!, array!);
  await delay(500);
  setArray(list.print());
  newEl.state = ElementStates.Modified;
  setHead(list.head);
  setTail(list.tail);
  setIsChanging!("");
  await delay(500);
  newEl.state = ElementStates.Default;
  setValue!(undefined);
  setIndex!(undefined)
  setIsDisabled(false);
  setIsLoader(false);
};

//удалить по индексу
export const removeIndex = async ({
  array,
  index,
  setIsLoader,
  setIsDisabled,
  setHead,
  setTail,
  setArray,
  setCurrentIndex,
  setIsChanging,
  setValue,
  setIndex
}: IProps<IArrEl>) => {
  setIsLoader(true);
  setIsDisabled(true);
  colorSelection({ array, index });
  await delay(1000);
  setCurrentIndex!(index!);
  await delay(1000);
  setIsChanging!("indexRemove");
  list.removeInd(index!, array!);
  await delay(500);
  setArray(list.print());
  setHead(list.head);
  setTail(list.tail);
  setIsChanging!("");
  array?.forEach((el) => (el.state = ElementStates.Default));
  await delay(500);
  setIsDisabled(false);
  setIsLoader(false);
  setValue!(undefined);
  setIndex!(undefined)
};

const colorSelection = async ({ array, index }: ISel<IArrEl>) => {
  for (let i = 0; i < index!; i++) {
    array![i].state = ElementStates.Changing;
    await delay(1000);
  }
};
