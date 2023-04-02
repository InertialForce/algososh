import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { delay, randomArr, swap } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from "./sorting-page.module.css";

type TArrState = {
  value: number;
  color: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<TArrState[]>([]);
  const [checked, setChecked] = useState<"selection" | "bubble">("selection");
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState<string>();

  const newRandomArr = () => {
    setArr(randomArr(3, 17));
  };

  const selectionSort = async (arr: TArrState[], direction: string) => {
    setLoading(true);
    setDirection(direction);

    for (let i = 0; i < arr.length; i++) {
      let indexMin = i;
      for (let j = i + 1; j < arr.length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (
          direction === "ascending"
            ? arr[j].value < arr[indexMin].value
            : arr[j].value > arr[indexMin].value
        ) {
          indexMin = j;
        }
        arr[i].color = ElementStates.Default;
        arr[j].color = ElementStates.Default;
        setArr([...arr]);
      }
      swap(arr, i, indexMin);
      arr[i].color = ElementStates.Modified;
    }
    setArr([...arr]);

    setDirection("");
    setLoading(false);
  };

  const bubbleSort = async (arr: TArrState[], direction: string) => {
    setLoading(true);
    setDirection(direction);

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);
        if (
          direction === "ascending"
            ? arr[j + 1].value < arr[j].value
            : arr[j + 1].value > arr[j].value
        ) {
          swap(arr, j, j + 1);
        }
        arr[j].color = ElementStates.Default;
        arr[j + 1].color = ElementStates.Default;
      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
    }
    setArr([...arr]);

    setDirection("");
    setLoading(false);
  };

  useEffect(() => {
    setArr(randomArr(3, 17));
    return () => {
      setArr([]);
    };
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.sorting}>
        <div className={styles.container}>
          <div className={styles.option}>
            <RadioInput
              value={"selection"}
              name={"option"}
              label={"Выбор"}
              checked={checked === "selection"}
              onChange={() => setChecked("selection")}
              disabled={loading}
            />
            <RadioInput
              value={"bubble"}
              name={"option"}
              label={"Пузырёк"}
              checked={checked === "bubble"}
              onChange={() => setChecked("bubble")}
              disabled={loading}
            />
          </div>
          <div className={styles.buttons}>
            <Button
              sorting={Direction.Ascending}
              text={"По возрастанию"}
              extraClass={styles.button}
              onClick={() => {
                checked === "selection"
                  ? selectionSort(arr, Direction.Ascending)
                  : bubbleSort(arr, Direction.Ascending);
              }}
              isLoader={direction === Direction.Ascending}
              disabled={loading}
            />
            <Button
              sorting={Direction.Descending}
              text={"По убыванию"}
              extraClass={styles.button}
              onClick={() => {
                checked === "selection"
                  ? selectionSort(arr, Direction.Descending)
                  : bubbleSort(arr, Direction.Descending);
              }}
              isLoader={direction === Direction.Descending}
              disabled={loading}
            />
          </div>
          <Button
            text={"Новый массив"}
            extraClass={styles.button}
            onClick={newRandomArr}
            disabled={loading}
          />
        </div>
        <ul className={styles.columns}>
          {arr.map(({ value, color }, index) => (
            <li key={index}>
              <Column index={value} state={color} />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
