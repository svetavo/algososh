import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { pushStack, popStack, clearStack } from "../../utils/stack-utils";
import { stack } from "./Stack";
import { IArrEl } from "../../utils/utils";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoaderAdd, setIsLoaderAdd] = useState(false);
  const [isLoaderRemove, setIsLoaderRemove] = useState(false);
  const [isLoaderClear, setIsLoaderClear] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [array, setArray] = useState<IArrEl[]>([]);
  const pushProps = {
    value,
    setIsDisabled,
    setIsLoaderAdd,
    setArray,
    setCurrentIndex,
    currentIndex,
    setValue,
  };
  const popProps = {
    setIsDisabled,
    setIsLoaderRemove,
    setArray,
    setCurrentIndex,
    currentIndex,
  };
  const clearProps = {
    setIsDisabled,
    setIsLoaderClear,
    setArray,
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            onChange={(e) => setValue(e.currentTarget.value)}
            value={value}
            maxLength={4}
            isLimitText={true}
          />
          <Button
            text="Добавить"
            isLoader={isLoaderAdd}
            extraClass="mr-5"
            onClick={() => pushStack(pushProps)}
            disabled={!value || stack.isFull() || isDisabled ? true : false}
          />
          <Button
            text="Удалить"
            isLoader={isLoaderRemove}
            extraClass="mr-20"
            onClick={() => popStack(popProps)}
            disabled={!array.length || isDisabled ?true : false}
          />
          <Button
            text="Очистить"
            isLoader={isLoaderClear}
            onClick={() => clearStack(clearProps)}
            disabled={!array.length || isDisabled ? true : false}
          />
        </div>
        <div>
          <div className={styles.result}>
            {array?.map((item: IArrEl, index) => (
              <Circle
                letter={String(item.number)}
                key={index}
                index={index}
                extraClass={styles.item}
                state={item.state
                  // currentIndex === index
                  //   ? ElementStates.Changing
                  //   : ElementStates.Default
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
