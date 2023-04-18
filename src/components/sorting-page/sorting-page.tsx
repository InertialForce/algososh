import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { randomArr } from "../../utils/utils";
import { bubbleSort, selectionSort } from "./utils";
import { TArrState } from "./sorting-page.types";

import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<TArrState[]>([]);
  const [checked, setChecked] = useState<"selection" | "bubble">("selection");
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState<string>();

  const newRandomArr = () => {
    setArr(randomArr(3, 17));
  };

  const sort = async (direction: string) => {
    setLoading(true);
    setDirection(direction);

    if (direction === Direction.Ascending) {
      checked === "selection"
        ? await selectionSort(arr, Direction.Ascending, setArr)
        : await bubbleSort(arr, Direction.Ascending, setArr);
    } else {
      checked === "selection"
        ? await selectionSort(arr, Direction.Descending, setArr)
        : await bubbleSort(arr, Direction.Descending, setArr);
    }

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
                sort(Direction.Ascending);
              }}
              isLoader={direction === Direction.Ascending}
              disabled={loading}
            />
            <Button
              sorting={Direction.Descending}
              text={"По убыванию"}
              extraClass={styles.button}
              onClick={() => {
                sort(Direction.Descending);
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
