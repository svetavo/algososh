import { Dispatch, SetStateAction } from "react";
import { delay } from "../utils/utils";
import { list } from "../components/list-page/List";
import { IArrEl } from "../utils/utils";
import { ElementStates } from "../types/element-states";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps<T> {
  array?: T[];
  value?: string;
  index?: string;
  setArray: Dispatcher<T[]>;
  setValue?: Dispatcher<string>;
  setIndex?: Dispatcher<string>;
  setHead: Dispatcher<number>;
  setIsDisabled: Dispatcher<boolean>;
  setIsChanging?: Dispatcher<string>;
  setTail: Dispatcher<number>;
  setCurrentIndex?: Dispatcher<number>;
  setIsLoaderAddInd?: Dispatcher<boolean>;
  setIsLoaderRemoveInd?: Dispatcher<boolean>;
  setIsLoaderRemoveHead?: Dispatcher<boolean>;
  setIsLoaderRemoveTail?: Dispatcher<boolean>;
  setIsLoaderAddHead?: Dispatcher<boolean>;
  setIsLoaderAddTail?: Dispatcher<boolean>;
}

interface ISel<T> {
  array: T[] | undefined;
  index: string | undefined;
}

// добавить в head
export const addHead = async ({
  array,
  value,
  setValue,
  setIsDisabled,
  setHead,
  setTail,
  setArray,
  setIsChanging,
  setIsLoaderAddHead,
}: IProps<IArrEl>) => {
  setIsLoaderAddHead!(true);
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
  setValue!("");
  setIsLoaderAddHead!(false);
  setIsDisabled(false);
};

// добавить в tail
export const addTail = async ({
  array,
  value,
  setValue,
  setArray,
  setHead,
  setTail,
  setIsDisabled,
  setIsChanging,
  setIsLoaderAddTail,
}: IProps<IArrEl>) => {
  setIsLoaderAddTail!(true);
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
  setValue!("");
  setIsLoaderAddTail!(false);
  setIsDisabled(false);
};

// удалить из head
export const removeHead = async ({
  array,
  setArray,
  setIsDisabled,
  setHead,
  setTail,
  setIsChanging,
  setIsLoaderRemoveHead,
}: IProps<IArrEl>) => {
  setIsLoaderRemoveHead!(true);
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
  setIsLoaderRemoveHead!(false);
};

// удалить из tail
export const removeTail = async ({
  array,
  setArray,
  setIsDisabled,
  setHead,
  setTail,
  setIsChanging,
  setIsLoaderRemoveTail,
}: IProps<IArrEl>) => {
  setIsLoaderRemoveTail!(true);
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
  setIsLoaderRemoveTail!(false);
};

//добавить по индексу
export const addIndex = async ({
  array,
  value,
  setValue,
  setIndex,
  index,
  setIsDisabled,
  setHead,
  setTail,
  setArray,
  setIsChanging,
  setCurrentIndex,
  setIsLoaderAddInd,
}: IProps<IArrEl>) => {
  setIsLoaderAddInd!(true);
  setIsDisabled(true);
  const indexNum = Number(index);
  setIsChanging!("indexAdd");
  setCurrentIndex!(indexNum);
  const newEl = { number: value, state: ElementStates.Default };
  newEl.state = ElementStates.Changing;
  await delay(500);
  list.addInd(indexNum, newEl!, array!);
  await delay(500);
  setArray(list.print());
  newEl.state = ElementStates.Modified;
  setHead(list.head);
  setTail(list.tail);
  setIsChanging!("");
  await delay(500);
  newEl.state = ElementStates.Default;
  setValue!("");
  setIndex!("");
  setIsDisabled(false);
  setIsLoaderAddInd!(false);
};

//удалить по индексу
export const removeIndex = async ({
  array,
  index,
  setIsDisabled,
  setHead,
  setTail,
  setArray,
  setCurrentIndex,
  setIsChanging,
  setValue,
  setIndex,
  setIsLoaderRemoveInd,
}: IProps<IArrEl>) => {
  setIsLoaderRemoveInd!(true);
  setIsDisabled(true);
  const indexNum = Number(index);
  colorSelection({ array, index });
  await delay(1000);
  setCurrentIndex!(indexNum);
  await delay(1000);
  setIsChanging!("indexRemove");
  await delay(500);
  list.removeInd(indexNum, array!);
  await delay(500);
  setArray(list.print());
  setHead(list.head);
  setTail(list.tail);
  setIsChanging!("");
  array?.forEach((el) => (el.state = ElementStates.Default));
  await delay(500);
  setIsDisabled(false);
  setIsLoaderRemoveInd!(false);
  setValue!("");
  setIndex!("");
};

const colorSelection = async ({ array, index }: ISel<IArrEl>) => {
  const indexNum = Number(index);
  for (let i = 0; i <= indexNum; i++) {
    array![i].state = ElementStates.Changing;
    await delay(1000);
  }
};

interface ILetterChanger {
  index: number;
  item: IArrEl;
  isChanging: string;
  head: number;
  tail: number;
  array: IArrEl[];
  currentIndex: number;
}

export const letterChanger = ({
  index,
  item,
  isChanging,
  head,
  tail,
  array,
  currentIndex,
}: ILetterChanger) => {
  if (isChanging === "headRemove" && index === head) {
    return "";
  } else if (isChanging === "tailRemove" && index === array.length - 1) {
    return "";
  } else if (isChanging === "indexRemove" && index === currentIndex) {
    return "";
  } else {
    return String(item.number);
  }
};
