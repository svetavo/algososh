import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { delay } from "../../utils/utils";
import { circleColor } from "../../utils/string-utils";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [arr, setArr] = useState<null | string[]>(null);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const reverse = (value: string) => {
    setIsLoader(true);
    const newArr = value.split("");
    setArr(newArr);
    arrReverse(newArr);
    setIsOpen(true);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const arrReverse = async (arr: string[]) => {
    const end = arr.length - 1;
    const mid = Math.floor(arr.length / 2);
    setCurrentIndex(0);
    for (let i = 0; i < mid; i++) {
      [arr[i], arr[end - i]] = [arr[end - i], arr[i]];
      setCurrentIndex((i) => i + 1);
      await delay(1000);
      setArr(arr);
    }
    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            onChange={onChange}
            type="text"
            maxLength={11}
            isLimitText={true}
          />
          <Button
            text="Развернуть"
            onClick={() => reverse(value)}
            isLoader={isLoader}
            disabled={value ? false : true}
          />
        </div>
        <div>
          {isOpen ? (
            <div className={styles.result}>
              {arr?.map((item, index) => (
                <Circle
                  letter={item}
                  key={index}
                  extraClass={styles.item}
                  state={circleColor(currentIndex, index, arr)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </SolutionLayout>
  );
};
