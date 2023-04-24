import React, { useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { enqueue, dequeue, clearQueue } from "../../utils/queue-utils";

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [queue, setQueue] = useState<string[]>([]);
  const [tail, setTail] = useState(-1);
  const [head, setHead] = useState(0);
  const emptyElement = "";
  const emptyArray: string[] = Array.apply(null, Array(7)).map(
    () => emptyElement
  );
  const maxLength = 7;

  const enqueProps = {
    value,
    queue,
    tail,
    currentIndex,
    setIsLoader,
    setTail,
    setCurrentIndex,
    setValue,
    maxLength,
  };

  const dequeueProps = {
    queue,
    head,
    setIsLoader,
    setHead,
    emptyElement,
    maxLength,
  };

  const clearQueueProps = {
    setIsLoader,
    setQueue,
    setTail,
    setCurrentIndex,
    setHead,
    emptyArray,
  };

  useEffect(() => {
    setQueue(emptyArray);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <div className={styles.input}>
          <Input onChange={onChange} value={value} maxLength={4} />
          <Button
            text="Добавить"
            isLoader={isLoader}
            extraClass="mr-5"
            onClick={() => enqueue(enqueProps)}
            disabled={queue.length > maxLength ? true : false}
          />
          <Button
            text="Удалить"
            isLoader={isLoader}
            extraClass="mr-20"
            onClick={() => dequeue(dequeueProps)}
          />
          <Button
            text="Очистить"
            isLoader={isLoader}
            onClick={() => clearQueue(clearQueueProps)}
          />
        </div>
        <div>
          <div className={styles.result}>
            {queue.map((item, index) => (
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
