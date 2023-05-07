import { ElementStates } from "../types/element-states";
import { delay, swap } from "./utils";
import { Dispatch, SetStateAction } from "react";


type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IProps {
  arr: string[];
  direction: string;
  setIsLoader: Dispatcher<boolean>;
  setIsDisabled: Dispatcher<boolean>;
  setArray: Dispatcher<string[]>;
}



