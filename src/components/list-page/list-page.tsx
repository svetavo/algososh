import React, { useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { randomArr } from "../../utils/utils";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import {
  addHead,
  addTail,
  removeHead,
  removeTail,
  addIndex,
  removeIndex,
} from "../../utils/list-utils";

export const ListPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [list, setList] = useState<string[]>([]);
  const [tail, setTail] = useState(-1);
  const [head, setHead] = useState<number>(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setList(randomArr());
    setTail(list.length - 1);
  }, [isChanging]);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setIndex(e.target.value);
  };
  

  
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <Input
              onChange={onChangeValue}
              value={value}
              maxLength={4}
              placeholder="Введите значение"
            />
            <Button
              text="Добавить в head"
              isLoader={isLoader}
              extraClass="mr-5"
              onClick={() =>
                addHead({
                  list,
                  value,
                  setIsLoader,
                  setHead,
                  setIsChanging,
                  setTail,
                })
              }
              disabled={list.length > 6 ? true : false}
            />
            <Button
              text="Добавить в tail"
              isLoader={isLoader}
              extraClass="mr-5"
              onClick={() => addTail({ list, value, setIsLoader, setTail })}
              disabled={list.length > 6 ? true : false}
            />
            <Button
              text="Удалить из head"
              isLoader={isLoader}
              extraClass="mr-5"
              onClick={() =>
                removeHead({ list, setIsLoader, setHead, setTail })
              }
            />
            <Button
              text="Удалить из tail"
              isLoader={isLoader}
              onClick={() => removeTail({ list, setIsLoader, setTail })}
            />
          </div>
          <div className={styles.input}>
            <Input
              onChange={onChangeIndex}
              value={index}
              maxLength={4}
              placeholder="Введите индекс"
            />
            <Button
              text="Добавить по индексу"
              isLoader={isLoader}
              extraClass="mr-5"
              onClick={() =>
                addIndex({ list, value, index, setIsLoader, setHead, setTail })
              }
              disabled={list.length > 6 ? true : false}
            />

            <Button
              text="Удалить по индексу"
              isLoader={isLoader}
              extraClass="mr-20"
              onClick={() =>
                removeIndex({ list, index, setIsLoader, setHead, setTail })
              }
            />
          </div>
        </div>
        <div>
          <div className={styles.result}>
            {list.map((item, index) => (
              <div className={styles.resultCell} key={index}>
                <Circle
                  letter={item}
                  key={index}
                  index={index}
                  extraClass={styles.item}
                  state={
                    tail === index
                      ? ElementStates.Changing
                      : ElementStates.Default
                  }
                  head={
                    isChanging ? (
                      <Circle isSmall={true} />
                    ) : head === index ? (
                      "head"
                    ) : null
                  }
                  tail={tail === index ? "tail" : null}
                />
                {index === list.length - 1 ? null : <ArrowIcon />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SolutionLayout>
  );
};
