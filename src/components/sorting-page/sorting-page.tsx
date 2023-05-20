import React, { useState, useEffect } from "react";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import { swap, delay } from "../../utils/utils";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { randomArr } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { IArrEl } from "../../utils/utils";

export const SortingPage: React.FC = (): JSX.Element => {
  const [method, setMethod] = useState("selection");
  const [array, setArray] = useState<IArrEl[]>([]);
  const [ascendingLoader, setAscendingLoader] = useState(false);
  const [descendingLoader, setDescendingLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setArray(randomArr({ setArray, numbers: undefined }));
  }, []);

  const loaderSet = (direction: string) => {
    direction === Direction.Ascending
      ? setAscendingLoader(true)
      : setDescendingLoader(true);
  };

  const loaderOff = (direction: string) => {
    direction === Direction.Ascending
      ? setAscendingLoader(false)
      : setDescendingLoader(false);
  };

  // пузырек
  const bubbleSort = async (direction: string) => {
    loaderSet(direction);
    setIsDisabled(true);
    for (let j = array.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (
          direction === Direction.Ascending
            ? array[i].number > array[i + 1].number
            : array[i].number < array[i + 1].number
        ) {
          array[i].state = ElementStates.Changing;
          array[i + 1].state = ElementStates.Changing;
          swap(array, i, i + 1);
          await delay(1000);
          setArray([...array]);
          array[i].state = ElementStates.Default;
          array[i + 1].state = ElementStates.Default;
        }
      }
    }
    loaderOff(direction);
    setIsDisabled(false);
  };

  // выбор
  const selectionSort = async (direction: string) => {
    loaderSet(direction);
    setIsDisabled(true);
    for (let i = 0; i < array.length - 1; i++) {
      if (direction === Direction.Descending) {
        let maxInd = i;

        for (let j = i; j < array.length; j++) {
          if (array[maxInd].number < array[j].number) {
            maxInd = j;
          }
        }
        if (i !== maxInd) {
          array[i].state = ElementStates.Changing;
          array[maxInd].state = ElementStates.Changing;

          swap(array, i, maxInd);
          await delay(1000);
          setArray([...array]);
          array[i].state = ElementStates.Default;
          array[maxInd].state = ElementStates.Default;
        }
      } else if (direction === Direction.Ascending) {
        let minInd = i;
        for (let j = i; j < array.length; j++) {
          if (array[minInd].number > array[j].number) {
            minInd = j;
          }
        }
        if (i !== minInd) {
          array[i].state = ElementStates.Changing;
          array[minInd].state = ElementStates.Changing;
          swap(array, i, minInd);
          await delay(1000);
          setArray([...array]);
          array[i].state = ElementStates.Default;
          array[minInd].state = ElementStates.Default;
        }
      }
    }
    loaderOff(direction);
    setIsDisabled(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <div className={styles.navigation}>
          <div className={styles.navigation}>
            <RadioInput
              label="Выбор"
              defaultChecked={true}
              disabled={isDisabled}
              extraClass={styles.navigationItem}
              onClick={() => setMethod("selection")}
              checked={method === "selection" ? true : false}
            />
            <RadioInput
              label="Пузырёк"
              disabled={isDisabled}
              extraClass={styles.navigationItem}
              onClick={() => setMethod("bubble")}
              checked={method === "bubble" ? true : false}
            />
            <Button
              text="По возрастанию"
              disabled={isDisabled}
              isLoader={ascendingLoader}
              extraClass={styles.navigationItem}
              onClick={
                method === "selection"
                  ? () => selectionSort(Direction.Ascending)
                  : () => bubbleSort(Direction.Ascending)
              }
            />
            <Button
              text="По убыванию"
              extraClass={styles.navigationItem}
              isLoader={descendingLoader}
              disabled={isDisabled}
              onClick={
                method === "selection"
                  ? () => selectionSort(Direction.Descending)
                  : () => bubbleSort(Direction.Descending)
              }
            />
          </div>
          <Button
            text="Новый массив"
            disabled={isDisabled}
            onClick={() => randomArr({ setArray })}
          />
        </div>
        <div className={styles.result}>
          {array.map((el: IArrEl, index) => (
            <div key={index} className={styles.resultItem}>
              <Column index={Number(el.number)} state={el.state} />
            </div>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
