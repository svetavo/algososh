import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { enqueue, dequeue, clearQueue } from "../../utils/queue-utils";
import { IArrEl } from "../../utils/utils";

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isLoaderEnqueue, setIsLoaderEnqueue] = useState(false);
  const [isLoaderDequeue, setIsLoaderDequeue] = useState(false);
  const [isLoaderClear, setIsLoaderClear] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledEnqueue, setIsDisabledEnqueue] = useState(true);
  const [isDisabledDequeue, setIsDisabledDequeue] = useState(true);
  const [isDisabledClear, setIsDisabledClear] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tail, setTail] = useState(-1);
  const [head, setHead] = useState(-1);

  //начальный массив пустых элементов
  const emptyElement: IArrEl = { number: "", state: ElementStates.Default };
  const emptyArray: IArrEl[] = Array.apply(null, Array(7)).map(
    () => emptyElement
  );
  const maxLength = 7;
  const [array, setArray] = useState<IArrEl[]>(emptyArray);

  //пропсы добавление
  const enqueProps = {
    value,
    array,
    tail,
    currentIndex,
    setArray,
    setIsDisabled,
    setIsDisabledDequeue,
    setIsLoaderEnqueue,
    setIsDisabledClear,
    setTail,
    setHead,
    setCurrentIndex,
    setValue,
    maxLength,
  };

  //пропсы удаление
  const dequeueProps = {
    array,
    head,
    setIsDisabled,
    setIsDisabledClear,
    setIsLoaderDequeue,
    setIsDisabledDequeue,
    setArray,
    setTail,
    setHead,
    setCurrentIndex,
    emptyElement,
  };

  //пропсы очистить
  const clearQueueProps = {
    setIsDisabled,
    setIsDisabledClear,
    setIsLoaderClear,
    setIsDisabledDequeue,
    setArray,
    setTail,
    setCurrentIndex,
    setHead,
    emptyArray,
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setIsDisabledEnqueue(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            onChange={onChange}
            value={value}
            maxLength={4}
            isLimitText={true}
            data-test="input-tag"
          />
          <Button
            text="Добавить"
            isLoader={isLoaderEnqueue}
            extraClass="mr-5"
            onClick={() => enqueue(enqueProps)}
            disabled={
              tail === 7 || isDisabledEnqueue || isDisabled || !value
                ? true
                : false
            }
            data-test="add-button-tag"
          />
          <Button
            text="Удалить"
            isLoader={isLoaderDequeue}
            extraClass="mr-20"
            onClick={() => dequeue(dequeueProps)}
            disabled={
              head > tail || isDisabledDequeue || isDisabled ? true : false
            }
            data-test="delete-button-tag"
          />
          <Button
            text="Очистить"
            isLoader={isLoaderClear}
            onClick={() => clearQueue(clearQueueProps)}
            disabled={isDisabledClear || isDisabled}
            data-test="clear-button-tag"
          />
        </div>
        <div>
          <div className={styles.result}>
            {array.map((item: IArrEl, index) => (
              <Circle
                letter={String(item.number)}
                key={index}
                index={index}
                extraClass={styles.item}
                state={item.state}
                head={head === index ? "head" : null}
                tail={tail === index ? "tail" : null}
              />
            ))}
          </div>
        </div>
      </div>
    </SolutionLayout>
  );
};
