import { Dispatch, SetStateAction } from "react";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps {
  list?: string[];
  value?: string;
  index?: string;
  setHead?: Dispatcher<number>;
  setIsLoader?: Dispatcher<boolean>;
  setIsChanging?: Dispatcher<boolean>;
  setTail?: Dispatcher<number>;
}

export const addHead = ({
  list,
  value,
  setIsLoader,
  setHead,
  setIsChanging,
  setTail,
}: IProps) => {
  if (value) {
    setIsLoader!(true);
    setHead!(-1);
    setIsChanging!(true);
    list!.unshift(value);
    setIsChanging!(false);
    setHead!(0);
    setTail!(list!.length - 1);
  } else {
    alert("введите значение в инпут");
  }
  setIsLoader!(false);
};

export const addTail = ({ list, value, setIsLoader, setTail }: IProps) => {
  if (value) {
    setIsLoader!(true);
    list!.push(value);
    setTail!(list!.length - 1);
  } else {
    alert("введите значение в инпут");
  }
  setIsLoader!(false);
};

export const removeHead = ({ list, setIsLoader, setHead, setTail }: IProps) => {
  setIsLoader!(true);
  list!.shift();
  setHead!(0);
  setTail!(list!.length -1)
  setIsLoader!(false);
};

export const removeTail = ({ list, setIsLoader, setTail }: IProps) => {
  setIsLoader!(true);
  list!.pop();
  setTail!(list!.length - 1);
  setIsLoader!(false);
};

export const addIndex = ({ list, value, index, setIsLoader, setHead, setTail }: IProps) => {
  if (value && index) {
    list!.splice(Number(index), 0, value);
    setIsLoader!(false);
    setHead!(0)
    setTail!(list!.length-1)
  } else {
    alert("Введите индекс и число");
  }
};

export const removeIndex = ({ list, index, setIsLoader, setHead, setTail }: IProps) => {
  if (index) {
    setIsLoader!(true);
    list!.splice(Number(index), 1);
    setIsLoader!(false);
    setHead!(0)
    setTail!(list!.length-1)
  } else {
    alert("Введите индекс");
  }
};
