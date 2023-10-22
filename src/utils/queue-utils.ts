import { delay } from "./utils";
import { Dispatch, SetStateAction } from "react";
import { queue } from "../components/queue-page/Queue";
import { ElementStates } from "../types/element-states";
import { IArrEl } from "../utils/utils";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps<T> {
  value?: string;
  array?: T[];
  tail?: number;
  head?: number;
  currentIndex?: number;
  emptyElement?: T;
  emptyArray?: T[];
  setIsLoaderEnqueue?: Dispatcher<boolean>;
  setIsLoaderDequeue?: Dispatcher<boolean>;
  setIsLoaderClear?: Dispatcher<boolean>;
  setIsDisabled?: Dispatcher<boolean>;
  setIsDisabledDequeue?: Dispatcher<boolean>;
  setIsDisabledClear?: Dispatcher<boolean>;
  setValue?: Dispatcher<string>;
  setArray?: Dispatcher<T[]>;
  setTail?: Dispatcher<number>;
  setHead?: Dispatch<number>;
  setCurrentIndex?: Dispatcher<number>;
}

export const enqueue = async ({
  value,
  array,
  currentIndex,
  setArray,
  setIsDisabled,
  setIsDisabledDequeue,
  setIsDisabledClear,
  setIsLoaderEnqueue,
  setTail,
  setHead,
  setCurrentIndex,
  setValue,
}: IProps<IArrEl>) => {
  setIsLoaderEnqueue!(true);
  setIsDisabled!(true);
  const newEl = { number: Number(value), state: ElementStates.Default };
  queue.enqueue(currentIndex!, newEl!, array!);
  newEl.state = ElementStates.Changing;
  setArray!(queue.queue);
  await delay(500);
  newEl.state = ElementStates.Default;
  setHead!(queue.head);
  setTail!(queue.tail);
  setCurrentIndex!(queue.currentIndex);
  setValue!("");
  setIsDisabled!(false);
  setIsDisabledDequeue!(false);
  setIsDisabledClear!(false);
  setIsLoaderEnqueue!(false);
};

export const dequeue = async ({
  array,
  head,
  setIsDisabled,
  setIsDisabledClear,
  setIsLoaderDequeue,
  setIsDisabledDequeue,
  setHead,
  setTail,
  setCurrentIndex,
  setArray,
  emptyElement,
}: IProps<IArrEl>) => {
  setIsLoaderDequeue!(true);
  setIsDisabled!(true);
  queue.dequeue(head!, emptyElement!, array!);
  setArray!(queue.queue);
  await delay(500);
  setHead!(queue.head);
  setTail!(queue.tail);
  setCurrentIndex!(queue.currentIndex);
  setIsDisabled!(false);
  setIsLoaderDequeue!(false);
  if (queue.tail === -1 && queue.head === -1) {
    setIsDisabledClear!(true);
    setIsDisabledDequeue!(true);
  }
};

export const clearQueue = async ({
  setIsDisabled,
  setIsDisabledClear,
  setIsLoaderClear,
  setIsDisabledDequeue,
  setArray,
  setTail,
  setCurrentIndex,
  setHead,
  emptyArray,
}: IProps<IArrEl>) => {
  setIsLoaderClear!(true);
  setIsDisabled!(true);
  queue.clear();
  await delay(500);
  setArray!(emptyArray!);
  setTail!(queue.tail);
  setCurrentIndex!(queue.currentIndex);
  setHead!(queue.head);
  setIsDisabled!(false);
  setIsLoaderClear!(false);
  setIsDisabledClear!(true);
  setIsDisabledDequeue!(true);
};
