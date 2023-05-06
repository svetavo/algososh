import React, { useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { IArrEl, randomArr } from "../../utils/utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import {
  addHead,
  addTail,
  removeHead,
  removeTail,
  addIndex,
  removeIndex,
} from "../../utils/list-utils";
import { ElementStates } from "../../types/element-states";

export const ListPage: React.FC = () => {
  const [value, setValue] = useState<number | undefined>(undefined);
  const [index, setIndex] = useState<number | undefined>(undefined);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [array, setArray] = useState<IArrEl[]>([]);
  const [tail, setTail] = useState<number>(array.length - 1);
  const [head, setHead] = useState<number>(0);
  const [isChanging, setIsChanging] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setArray(randomArr({ setArray, numbers: 4 }));
  }, []);

  //props
  const addProps = {
    array,
    value,
    setValue,
    setIsLoader,
    setHead,
    setIsDisabled,
    setTail,
    setArray,
    setIsChanging,
  };

  const removeProps = {
    array,
    setIsLoader,
    setArray,
    setIsDisabled,
    setHead,
    setTail,
    setIsChanging,
    setValue,
    setIndex,
  };

  const indexProps = {
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
  };

  const styleChangerHead = (index: number) => {
    if (isChanging === "headAdd" && index === head) {
      return (
        <Circle
          isSmall={true}
          letter={String(value)}
          state={ElementStates.Changing}
        />
      );
    } else if (isChanging === "tailAdd" && index === tail) {
      return (
        <Circle
          isSmall={true}
          letter={String(value)}
          state={ElementStates.Changing}
        />
      );
    } else if (head === index) {
      return "head";
    } else if (isChanging === "indexAdd" && index === currentIndex) {
      return (
        <Circle
          isSmall={true}
          letter={String(value)}
          state={ElementStates.Changing}
        />
      );
    } else {
      return null;
    }
  };

  const styleChangerTail = (array: IArrEl[], index: number, item: IArrEl) => {
    if (isChanging === "headRemove" && index === 0) {
      return (
        <Circle
          isSmall={true}
          letter={String(item.number)}
          state={ElementStates.Changing}
        />
      );
    } else if (isChanging === "tailRemove" && index === tail) {
      return (
        <Circle
          isSmall={true}
          letter={String(item.number)}
          state={ElementStates.Changing}
        />
      );
    } else if (index === array.length - 1) {
      return "tail";
    } else if (isChanging === "indexRemove" && index === currentIndex) {
      return (
        <Circle
          isSmall={true}
          letter={String(item.number)}
          state={ElementStates.Changing}
        />
      );
    } else {
      return null;
    }
  };

  const letterChanger = (index: number, item: IArrEl) => {
    if (isChanging === "headRemove" && index === head) {
      return "";
    } else if (isChanging === "tailRemove" && index === tail) {
      return "";
    } else if (isChanging === "indexRemove" && index === currentIndex) {
      return "";
    } else {
      return String(item.number);
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <Input
              onChange={(e) => setValue(Number(e.currentTarget.value))}
              value={value}
              type="text"
              placeholder="Введите значение"
              maxLength={4}
              isLimitText={true}  
            />
            <Button
              text="Добавить в head"
              isLoader={isLoader}
              extraClass="mr-5"
              onClick={() => addHead(addProps)}
              disabled={array.length > 6 || isDisabled || !value ? true : false}
            />
            <Button
              text="Добавить в tail"
              isLoader={isLoader}
              extraClass="mr-5"
              onClick={() => addTail(addProps)}
              disabled={array.length > 6 || isDisabled || !value ? true : false}
            />
            <Button
              text="Удалить из head"
              isLoader={isLoader}
              extraClass="mr-5"
              onClick={() => removeHead(removeProps)}
              disabled={!array.length || isDisabled ? true : false}
            />
            <Button
              text="Удалить из tail"
              isLoader={isLoader}
              onClick={() => removeTail(removeProps)}
              disabled={!array.length || isDisabled ? true : false}
            />
          </div>
          <div className={styles.input}>
            <Input
              onChange={(e) => setIndex(Number(e.currentTarget.value))}
              value={index}
              maxLength={4}
              type="number"
              placeholder="Введите индекс"
            />
            <Button
              text="Добавить по индексу"
              isLoader={isLoader}
              extraClass="mr-5"
              onClick={() => addIndex(indexProps)}
              disabled={
                array.length > 6 || isDisabled || !value || !index
                  ? true
                  : false
              }
            />

            <Button
              text="Удалить по индексу"
              isLoader={isLoader}
              extraClass="mr-20"
              onClick={() => removeIndex(indexProps)}
              disabled={
                !array.length || isDisabled || !value || !index ? true : false
              }
            />
          </div>
        </div>
        <div>
          <div className={styles.result}>
            {array.map((item: IArrEl, index) => (
              <div className={styles.resultCell} key={index}>
                <Circle
                  letter={letterChanger(index, item)}
                  key={index}
                  index={index}
                  extraClass={styles.item}
                  state={item.state}
                  head={styleChangerHead(index)}
                  tail={styleChangerTail(array, index, item)}
                />
                {index === array.length - 1 ? null : <ArrowIcon />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SolutionLayout>
  );
};
