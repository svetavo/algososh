import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { pushStack, popStack, clearStack } from "../../utils/stack-utils";
import { stack } from "./Stack";
import { IArrEl } from "../../utils/utils";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoaderAdd, setIsLoaderAdd] = useState(false);
  const [isLoaderRemove, setIsLoaderRemove] = useState(false);
  const [isLoaderClear, setIsLoaderClear] = useState(false);
  const [array, setArray] = useState<IArrEl[]>([]);
  const [top, setTop] = useState(0);
  const pushProps = {
    value,
    setIsDisabled,
    setIsLoaderAdd,
    setArray,
    setValue,
    setTop,
  };
  const popProps = {
    setIsDisabled,
    setIsLoaderRemove,
    setArray,
    setTop,
    setValue,
  };
  const clearProps = {
    setIsDisabled,
    setIsLoaderClear,
    setArray,
    setTop,
    setValue,
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
            data-test="input-tag"
          />
          <Button
            text="Добавить"
            isLoader={isLoaderAdd}
            extraClass="mr-5"
            onClick={() => pushStack(pushProps)}
            disabled={!value || stack.isFull() || isDisabled ? true : false}
            data-test="add-button-tag"
          />
          <Button
            text="Удалить"
            isLoader={isLoaderRemove}
            extraClass="mr-20"
            onClick={() => popStack(popProps)}
            disabled={!array.length || isDisabled ? true : false}
            data-test="delete-button-tag"
          />
          <Button
            text="Очистить"
            isLoader={isLoaderClear}
            onClick={() => clearStack(clearProps)}
            disabled={!array.length || isDisabled ? true : false}
            data-test="clear-button-tag"
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
                state={item.state}
                head={index === top ? "top" : null}
              />
            ))}
          </div>
        </div>
      </div>
    </SolutionLayout>
  );
};
