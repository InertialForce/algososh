import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from "./fibonacci-page.module.css";
import { useForm } from "../../hooks/use-form";

export const FibonacciPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ number: "" });
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

  console.log(values.number);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await getFibonacciNumbers(Number(values.number));
    setLoading(false);
    setValues({ number: "" });
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name={"number"}
          placeholder="Введите число от 1 до 19"
          value={values.number}
          onChange={(e) => handleChange(e)}
          min={1}
          max={19}
          isLimitText
          disabled={loading}
          type="number"
        />
        <Button
          type="submit"
          text="Рассчитать"
          isLoader={loading}
          disabled={!values.number || Number(values.number) >= 20}
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
