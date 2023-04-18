import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { reverseString } from "./utils";
import { TArrState } from "./string.types";

import styles from "./string.module.css";
import { useForm } from "../../hooks/use-form";

export const StringComponent: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ string: "" });
  const [letters, setLetters] = useState<TArrState[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await reverseString(values.string, setLetters);
    setLoading(false);
    setValues({ string: "" });
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="string"
          value={values.string}
          onChange={(e) => handleChange(e)}
          maxLength={11}
          isLimitText
          disabled={loading}
        />
        <Button
          type="submit"
          text="Развернуть"
          isLoader={loading}
          disabled={!values.string}
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
