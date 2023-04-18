import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./list";
import { ElementStates } from "../../types/element-states";
import { delay, randomArr } from "../../utils/utils";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from "./list-page.module.css";
import { useForm } from "../../hooks/use-form";

enum smallCircleAction {
  Add = "add",
  Delete = "delete",
  Default = "default",
}

type TListLetter = {
  value: string;
  color: ElementStates;
  action?: smallCircleAction;
  smallCircle?: { value: string };
};

const initialArr = randomArr(4, 6).map((arr) => arr.value.toString());
const list = new LinkedList(initialArr);
const defaultArr: TListLetter[] = initialArr.map((item) => ({
  value: item,
  color: ElementStates.Default,
}));

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({
    string: "",
    index: "",
  });
  const [letters, setLetters] = useState<TListLetter[]>(defaultArr);
  const [loading, setLoading] = useState({
    addItemHead: false,
    addItemTail: false,
    removeItemHead: false,
    removeItemTail: false,
    addByIndex: false,
    removeByIndex: false,
    allItems: false,
  });

  const addListHead = async () => {
    setLoading({
      ...loading,
      addItemHead: true,
      allItems: true,
    });

    list.prepend(values.string);
    letters[0] = {
      ...letters[0],
      action: smallCircleAction.Add,
      smallCircle: {
        value: values.string,
      },
    };
    setLetters([...letters]);
    await delay(DELAY_IN_MS);

    letters[0] = {
      ...letters[0],
      action: smallCircleAction.Default,
      smallCircle: {
        value: "",
      },
    };
    letters.unshift({ value: values.string, color: ElementStates.Modified });
    setLetters([...letters]);
    await delay(DELAY_IN_MS);

    setValues({ string: "", index: "" });
    letters[0] = {
      ...letters[0],
      color: ElementStates.Default,
    };
    setLetters([...letters]);

    setLoading({
      ...loading,
      addItemHead: false,
      allItems: false,
    });
  };

  const addListTail = async () => {
    setLoading({
      ...loading,
      addItemTail: true,
      allItems: true,
    });

    list.append(values.string);
    letters[letters.length - 1] = {
      ...letters[letters.length - 1],
      action: smallCircleAction.Add,
      smallCircle: {
        value: values.string,
      },
    };
    setLetters([...letters]);
    await delay(DELAY_IN_MS);

    letters[letters.length - 1] = {
      ...letters[letters.length - 1],
      action: smallCircleAction.Default,
      smallCircle: {
        value: "",
      },
    };
    letters.push({ value: values.string, color: ElementStates.Modified });
    setLetters([...letters]);
    await delay(DELAY_IN_MS);

    setValues({ string: "", index: "" });
    letters[letters.length - 1] = {
      ...letters[letters.length - 1],
      color: ElementStates.Default,
    };
    setLetters([...letters]);

    setLoading({
      ...loading,
      addItemTail: false,
      allItems: false,
    });
  };

  const removeListHead = async () => {
    setLoading({
      ...loading,
      removeItemHead: true,
      allItems: true,
    });

    list.deleteHead();
    letters[0] = {
      ...letters[0],
      value: "",
      action: smallCircleAction.Delete,
      smallCircle: {
        value: letters[0].value,
      },
    };
    setLetters([...letters]);
    await delay(DELAY_IN_MS);

    letters.shift();
    setLetters([...letters]);
    await delay(DELAY_IN_MS);

    setLoading({
      ...loading,
      removeItemHead: false,
      allItems: false,
    });
  };

  const removeListTail = async () => {
    setLoading({
      ...loading,
      removeItemTail: true,
      allItems: true,
    });

    list.deleteTail();
    letters[letters.length - 1] = {
      ...letters[letters.length - 1],
      value: "",
      action: smallCircleAction.Delete,
      smallCircle: {
        value: letters[letters.length - 1].value,
      },
    };
    setLetters([...letters]);
    await delay(DELAY_IN_MS);

    letters.pop();
    setLetters([...letters]);
    await delay(DELAY_IN_MS);

    setLoading({
      ...loading,
      removeItemTail: false,
      allItems: false,
    });
  };

  const addByIndex = async () => {
    setLoading({
      ...loading,
      addByIndex: true,
      allItems: true,
    });

    for (let i = 0; i <= Number(values.index); i++) {
      letters[i] = {
        ...letters[i],
        action: smallCircleAction.Add,
        smallCircle: { value: values.string },
      };

      letters[i - 1] = {
        ...letters[i - 1],
        color: ElementStates.Changing,
        action: smallCircleAction.Default,
        smallCircle: { value: "" },
      };
      setLetters([...letters]);
      await delay(SHORT_DELAY_IN_MS);
    }

    letters[Number(values.index)] = {
      ...letters[Number(values.index)],
      action: smallCircleAction.Default,
      smallCircle: { value: "" },
    };
    setLetters([...letters]);

    letters.map((letter) => (letter.color = ElementStates.Default));
    list.insertAt(values.string, Number(values.index));
    letters.splice(Number(values.index), 0, {
      value: values.string,
      color: ElementStates.Modified,
    });
    setLetters([...letters]);
    await delay(SHORT_DELAY_IN_MS);

    letters[Number(values.index)] = {
      ...letters[Number(values.index)],
      color: ElementStates.Default,
    };
    setLetters([...letters]);

    setValues({ string: "", index: "" });
    setLoading({
      ...loading,
      addByIndex: false,
      allItems: false,
    });
  };

  const removeByIndex = async () => {
    setLoading({
      ...loading,
      removeByIndex: true,
      allItems: true,
    });

    for (let i = 0; i <= Number(values.index); i++) {
      letters[i] = {
        ...letters[i],
        color: ElementStates.Changing,
      };
      setLetters([...letters]);
      await delay(SHORT_DELAY_IN_MS);
    }

    letters[Number(values.index)] = {
      ...letters[Number(values.index)],
      color: ElementStates.Default,
      value: "",
      smallCircle: { value: letters[Number(values.index)].value },
    };

    letters[Number(values.index)] = {
      ...letters[Number(values.index)],
      action: smallCircleAction.Delete,
    };
    setLetters([...letters]);
    await delay(SHORT_DELAY_IN_MS);

    letters.map((letter) => (letter.color = ElementStates.Default));
    list.deleteAt(Number(values.index));
    letters.splice(Number(values.index), 1);
    setLetters([...letters]);

    setValues({ string: "", index: "" });
    setLoading({
      ...loading,
      removeByIndex: false,
      allItems: false,
    });
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.interface}>
          <Input
            name={"string"}
            placeholder="Введите значение"
            value={values.string}
            onChange={(e) => handleChange(e)}
            maxLength={4}
            isLimitText
            disabled={loading.allItems}
            extraClass={styles.input}
          />
          <Button
            onClick={addListHead}
            text="Добавить в head"
            isLoader={loading.addItemHead}
            disabled={!values.string || loading.allItems}
            extraClass={styles.button}
          />
          <Button
            onClick={addListTail}
            text="Добавить в tail"
            isLoader={loading.addItemTail}
            disabled={!values.string || loading.allItems}
            extraClass={styles.button}
          />
          <Button
            onClick={removeListHead}
            text="Удалить из head"
            isLoader={loading.removeItemHead}
            disabled={!letters.length || loading.allItems}
            extraClass={styles.button}
          />
          <Button
            onClick={removeListTail}
            text="Удалить из tail"
            isLoader={loading.removeItemTail}
            disabled={!letters.length || loading.allItems}
            extraClass={styles.button}
          />
        </div>
        <div className={styles.interface}>
          <Input
            name={"index"}
            placeholder="Введите индекс"
            value={values.index}
            onChange={(e) => handleChange(e)}
            disabled={loading.allItems}
            extraClass={styles.input}
            type="number"
          />
          <Button
            onClick={addByIndex}
            text="Добавить по индексу"
            linkedList="big"
            isLoader={loading.addByIndex}
            disabled={
              !values.index ||
              !values.string ||
              list.getSize() <= Number(values.index) ||
              Number(values.index) < 0 ||
              loading.allItems
            }
          />
          <Button
            onClick={removeByIndex}
            text="Удалить по индексу"
            linkedList="big"
            isLoader={loading.removeByIndex}
            disabled={
              !values.index ||
              list.getSize() - 1 < Number(values.index) ||
              Number(values.index) < 0 ||
              loading.allItems
            }
          />
        </div>
      </div>

      <ul className={styles.letters}>
        {letters.map((letter, index) => (
          <li className={styles.letter} key={index}>
            {letter.action === smallCircleAction.Add && (
              <Circle
                extraClass={styles.circleSmallAdd}
                isSmall
                letter={letter.smallCircle?.value}
                state={ElementStates.Changing}
              />
            )}
            <div className={styles.circle}>
              <Circle
                letter={letter.value}
                index={index}
                head={
                  index === 0 && letter.action !== smallCircleAction.Add
                    ? "head"
                    : ""
                }
                tail={
                  index === letters.length - 1 &&
                  letter.action !== smallCircleAction.Add &&
                  letter.action !== smallCircleAction.Delete
                    ? "tail"
                    : ""
                }
                state={letter.color}
              />
              {index < letters.length - 1 && <ArrowIcon />}
            </div>
            {letter.action === smallCircleAction.Delete && (
              <Circle
                extraClass={styles.circleSmallDelete}
                isSmall
                letter={letter.smallCircle?.value}
                state={ElementStates.Changing}
              />
            )}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
