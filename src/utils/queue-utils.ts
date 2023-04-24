import { delay } from "./utils";
import { Dispatch, SetStateAction } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps {
  value?: string;
  queue?: string[];
  tail?: number;
  head?: number;
  currentIndex?: number;
  emptyElement?: string;
  emptyArray?: string[];
  maxLength?: number;
  setIsLoader: Dispatcher<boolean>;
  setValue?: Dispatcher<string>;
  setQueue?: Dispatcher<string[]>;
  setTail?: Dispatcher<number>;
  setHead?: Dispatch<number>;
  setCurrentIndex?: Dispatcher<number>;
}

export const enqueue = ({
  value,
  queue,
  tail,
  currentIndex,
  setIsLoader,
  setTail,
  setCurrentIndex,
  setValue,
  maxLength,
}: IProps): void => {
  if (value) {
    setIsLoader!(true);
    queue!.splice(currentIndex!, 1, value);
    if (queue!.length <= maxLength!) {
      setTail!(tail! + 1);
      setCurrentIndex!(currentIndex! + 1);
    } else {
      setTail!(0);
      setCurrentIndex!(0);
    }
    setValue!("");
    setIsLoader!(false);
  } else {
    alert("введите значение в инпут");
  }
};

export const dequeue = ({
  queue,
  head,
  setIsLoader,
  setHead,
  emptyElement,
  maxLength,
}: IProps): void => {
  setIsLoader!(true);
  queue!.splice(head!, 1, emptyElement!);
  if (queue!.length <= maxLength!) {
    setHead!(head! + 1);
  } else {
    setHead!(0);
  }
  setIsLoader!(false);
};

export const clearQueue = ({
  setIsLoader,
  setQueue,
  setTail,
  setCurrentIndex,
  setHead,
  emptyArray,
}: IProps): void => {
  setIsLoader!(true);
  setQueue!(emptyArray!);
  setTail!(0);
  setCurrentIndex!(0);
  setHead!(0);
  setIsLoader!(false);
};
