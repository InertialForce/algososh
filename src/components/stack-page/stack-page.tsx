import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { Stack } from "./stack";
import { delay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

import styles from "./stack-page.module.css";
import { useForm } from "../../hooks/use-form";

type TArrState = {
  value?: string;
  color?: ElementStates;
  head?: string;
};

const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ string: "" });
  const [letters, setLetters] = useState<TArrState[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({
    addItem: false,
    deleteItem: false,
  });

  const addStackItem = async () => {
    setLoading({ ...loading, addItem: true });
    stack.push(values.string);
    letters.forEach((letter) => {
      letter.color = ElementStates.Default;
      letter.head = "";
    });
    setLetters([
      ...letters,
      { value: stack.peak()!, color: ElementStates.Changing, head: "top" },
    ]);
    await delay(DELAY_IN_MS);
    setLetters([
      ...letters,
      { value: stack.peak()!, color: ElementStates.Default, head: "top" },
    ]);
    setValues({ string: "" });
    setLoading({ ...loading, addItem: false });
  };

  const deleteStackItem = async () => {
    setLoading({ ...loading, deleteItem: true });
    stack.pop();
    if (stack.getSize()) {
      letters[letters.length - 1].color = ElementStates.Changing;
      await delay(DELAY_IN_MS);
      letters.pop();
      letters[letters.length - 1].head = "top";
      setLetters([...letters]);
    } else {
      setLetters([]);
    }
    setLoading({ ...loading, deleteItem: false });
  };

  const allDeleteStackItems = () => {
    stack.clear();
    setLetters([]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <div className={styles.stack}>
          <Input
            name={"string"}
            placeholder="Введите текст"
            value={values.string}
            onChange={(e) => handleChange(e)}
            maxLength={4}
            isLimitText
            disabled={loading.addItem}
            extraClass={styles.input}
          />
          <Button
            onClick={addStackItem}
            text="Добавить"
            isLoader={loading.addItem}
            disabled={!values.string || loading.deleteItem}
          />
          <Button
            onClick={deleteStackItem}
            text="Удалить"
            isLoader={loading.deleteItem}
            disabled={letters.length === 0 || loading.addItem}
          />
        </div>
        <Button
          onClick={allDeleteStackItems}
          text="Очистить"
          isLoader={loading.allDeleteItems}
          disabled={
            letters.length === 0 || loading.addItem || loading.deleteItem
          }
        />
      </div>

      <ul className={styles.letters}>
        {letters.map((letter, index) => (
          <li key={index}>
            <Circle
              letter={letter.value}
              index={index}
              head={letter.head}
              state={letter.color}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
