import React, { useState, useEffect } from "react";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import { swap, delay } from "../../utils/utils";
import { UP, DOWN } from "../../constants/directions";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = (): JSX.Element => {
  const [method, setMethod] = useState("selection");
  const [array, setArray] = useState<number[]>([]);
  const [isCheckedSel, setIsCheckedSel] = useState(false);
  const [isCheckedBub, setIsCheckedBub] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setArray(randomArr());
  }, []);

  //random count
  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  //random array
  const randomArr = () => {
    const array = [];
    const max = 100;
    const count: number = getRandomInt(3, 17);
    while (array.length < count) {
      const r: number = Math.floor(Math.random() * max);
      if (array.indexOf(r) === -1) {
        array.push(r);
      }
    }
    setArray(array);
    return array;
  };

  // пузырек
  const bubbleSort = async (arr: number[], direction: string) => {
    setIsLoader(true);
    setIsDisabled(true);
    for (let j = arr.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (
          direction === Direction.Ascending
            ? arr[i] > arr[i + 1]
            : arr[i] < arr[i + 1]
        ) {
          swap(arr, i, i + 1);
          await delay(1000);
          setArray([...arr]);
        }
      }
    }
    setIsLoader(false);
    setIsDisabled(false);
  };

  // выбор
  const selectionSort = async (arr: number[], direction: string) => {
    setIsLoader(true);
    setIsDisabled(true);
    for (let i = 0; i < arr.length - 1; i++) {
      if (direction === Direction.Descending) {
        let maxInd = i;
        for (let j = i; j < arr.length; j++) {
          if (arr[maxInd] < arr[j]) {
            maxInd = j;
          }
        }
        if (i !== maxInd) {
          swap(arr, i, maxInd);
          await delay(1000);
          setArray([...arr]);
        }
      } else if (direction === Direction.Ascending) {
        let minInd = i;
        for (let j = i; j < arr.length; j++) {
          if (arr[minInd] > arr[j]) {
            minInd = j;
          }
        }
        if (i !== minInd) {
          swap(arr, i, minInd);
          await delay(1000);
          setArray([...arr]);
        }
      }
    }
    setIsLoader(false);
    setIsDisabled(false);
  };

  const radioClickBub = () => {
    setIsCheckedBub(true);
    setMethod("bubble");
    setIsCheckedSel(false);
  };

  const radioClickSel = () => {
    setIsCheckedSel(true);
    setMethod("selection");
    setIsCheckedBub(false);
  };

  const radioClick = (method: string) => {
    method === "bubble" ? radioClickBub() : radioClickSel();
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <div className={styles.navigation}>
          <div className={styles.navigation}>
            <RadioInput
              label="Выбор"
              defaultChecked
              disabled={isDisabled}
              extraClass={styles.navigationItem}
              onClick={() => radioClick("selection")}
              checked={isCheckedSel}
            />
            <RadioInput
              label="Пузырёк"
              disabled={isDisabled}
              extraClass={styles.navigationItem}
              onClick={() => radioClick("bubble")}
              checked={isCheckedBub}
            />
            <Button
              text="По возрастанию"
              isLoader={isLoader}
              extraClass={styles.navigationItem}
              onClick={
                method === "selection"
                  ? () => selectionSort(array, Direction.Ascending)
                  : () => bubbleSort(array, Direction.Ascending)
              }
            />
            <Button
              text="По убыванию"
              extraClass={styles.navigationItem}
              isLoader={isLoader}
              onClick={
                method === "selection"
                  ? () => selectionSort(array, Direction.Descending)
                  : () => bubbleSort(array, Direction.Descending)
              }
            />
          </div>
          <Button
            text="Новый массив"
            isLoader={isLoader}
            onClick={() => randomArr()}
          />
        </div>
        <div className={styles.result}>
          {array.map((el, index) => (
            <div key={index} className={styles.resultItem}>
              <Column index={el} />
            </div>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
