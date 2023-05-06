import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { fibonacci } from "../../utils/fibonacci-utils";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<null | any[]>(null);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClick = (value: string) => {
    const props = { value, setResult, setIsLoader, setValue };
    setResult(null);
    setIsLoader(true);
    fibonacci(props);
    setIsOpen(true);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <div className={styles.input}>
          <Input
            onChange={onChange}
            type="number"
            value={value}
            placeholder="Введите число"
            max={19}
            isLimitText={true}

          />
          <Button
            text="Рассчитать"
            onClick={() => onClick(value)}
            isLoader={isLoader}
            disabled={value ? false : true}
          />
        </div>
        <div>
          {isOpen ? (
            <div className={styles.result}>
              {result?.length
                ? result.map((item, index) => (
                    <Circle
                      letter={item}
                      key={index}
                      extraClass={styles.item}
                      index={index}
                    />
                  ))
                : null}
            </div>
          ) : null}
        </div>
      </div>
    </SolutionLayout>
  );
};
