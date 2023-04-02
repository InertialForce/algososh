import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValues, setInputValues] = useState("");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const getFibonacciNumbers = async (n: number) => {
    const arr: number[] = [];
    for (let i = 0; i <= n; i++) {
      await delay(SHORT_DELAY_IN_MS);
      if (i < 2) {
        arr[i] = 1;
      } else {
        arr[i] = arr[i - 1] + arr[i - 2];
      }
      setNumbers([...arr]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await getFibonacciNumbers(Number(inputValues));
    setLoading(false);
    setInputValues("");
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Введите число от 1 до 19"
          value={inputValues}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValues(e.target.value)
          }
          min={1}
          max={19}
          isLimitText
          disabled={loading}
          type="number"
        />
        <Button
          type="submit"
          text="Развернуть"
          isLoader={loading}
          disabled={!inputValues || Number(inputValues) >= 20}
        />
      </form>

      <ul className={styles.letters}>
        {numbers.map((number, index) => (
          <li key={index}>
            <Circle letter={number.toString()} index={index} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
