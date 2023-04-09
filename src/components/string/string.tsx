import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay, swap } from "../../utils/utils";

import styles from "./string.module.css";

type TArrState = {
  value: string;
  color: ElementStates;
};

export const StringComponent: React.FC = () => {
  const [inputValues, setInputValues] = useState("");
  const [letters, setLetters] = useState<TArrState[]>([]);
  const [loading, setLoading] = useState(false);

  const reverseString = async (str: string) => {
    const arrString = str.split("").map((value) => ({
      value,
      color: ElementStates.Default,
    }));
    let start = 0;
    let end = arrString.length - 1;
    while (start <= end) {
      if (start !== end) {
        arrString[start].color = ElementStates.Changing;
        arrString[end].color = ElementStates.Changing;
        setLetters([...arrString]);
        await delay(DELAY_IN_MS);
      }
      swap(arrString, start, end);
      arrString[start].color = ElementStates.Modified;
      arrString[end].color = ElementStates.Modified;
      setLetters([...arrString]);
      start++;
      end--;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await reverseString(inputValues);
    setLoading(false);
    setInputValues("");
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          value={inputValues}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValues(e.target.value)
          }
          maxLength={11}
          isLimitText
          disabled={loading}
        />
        <Button
          type="submit"
          text="Развернуть"
          isLoader={loading}
          disabled={!inputValues}
        />
      </form>

      <ul className={styles.letters}>
        {letters.map(({ value, color }, index) => (
          <li key={index}>
            <Circle letter={value} state={color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
