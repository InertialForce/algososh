import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { reverseString } from "./utils";
import { TArrState } from "./string.types";

import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [inputValues, setInputValues] = useState("");
  const [letters, setLetters] = useState<TArrState[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await reverseString(inputValues, setLetters);
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
