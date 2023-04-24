import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { pushStack, popStack, clearStack } from "../../utils/stack-utils";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [stack, setStack] = useState<string[]>([]);
  const pushProps = {
    value,
    stack,
    setIsLoader,
    setStack,
    setCurrentIndex,
    currentIndex,
    setValue,
  };
  const popProps = {
    stack,
    setIsLoader,
    setStack,
    setCurrentIndex,
    currentIndex,
  };
  const clearProps = {
    stack,
    setIsLoader,
    setStack,
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onAdd = () => {
    value ? pushStack(pushProps) : alert("Введите значение в инпут");
  };

  const onDelete = () => {
    stack.length ? popStack(popProps) : alert("стек пуст");
  };

  const onClear = () => {
    stack.length ? clearStack(clearProps) : alert("стек пуст");
  };


  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <div className={styles.input}>
          <Input onChange={onChange} value={value} maxLength={4} />
          <Button
            text="Добавить"
            isLoader={isLoader}
            extraClass="mr-5"
            onClick={onAdd}
          />
          <Button
            text="Удалить"
            isLoader={isLoader}
            extraClass="mr-20"
            onClick={onDelete}
          />
          <Button text="Очистить" isLoader={isLoader} onClick={onClear} />
        </div>
        <div>
          <div className={styles.result}>
            {stack?.map((item, index) => (
              <Circle
                letter={item}
                key={index}
                index={index}
                extraClass={styles.item}
                state={
                  currentIndex === index
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
                head={currentIndex === index ? "top" : null}
              />
            ))}
          </div>
        </div>
      </div>
    </SolutionLayout>
  );
};
