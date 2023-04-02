import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from "./queue-page.module.css";

const QUEUE_SIZE = 7;
const queue = new Queue<string>(QUEUE_SIZE);

export const QueuePage: React.FC = () => {
  const [inputValues, setInputValues] = useState("");
  const [letters, setLetters] = useState(queue.getQueue());
  const [loading, setLoading] = useState<Record<string, boolean>>({
    addItem: false,
    deleteItem: false,
  });
  const [queueState, setQueueState] = useState<Record<string, null | number>>({
    head: null,
    tail: null,
  });
  const [currentIndex, setCurrentIndex] = useState<null | number>(null);

  const addQueueItem = async () => {
    setLoading({ ...loading, addItem: true });
    setInputValues("");
    queue.enqueue(inputValues);
    setCurrentIndex(queue.getTail() - 1);
    await delay(SHORT_DELAY_IN_MS);
    setQueueState({
      head: queue.getHead(),
      tail: queue.getTail() - 1,
    });
    setCurrentIndex(null);
    setLetters([...queue.getQueue()]);
    setLoading({ ...loading, addItem: false });
  };

  const deleteQueueItem = async () => {
    setLoading({ ...loading, deleteItem: true });
    queue.dequeue();
    setCurrentIndex(queue.getHead() - 1);
    await delay(SHORT_DELAY_IN_MS);
    setLetters([...queue.getQueue()]);
    setQueueState({
      head: queue.getHead(),
      tail: queue.getTail() - 1,
    });
    if (queue.getHead() === queue.getTail()) {
      queue.clear();
      setQueueState({
        head: null,
        tail: null,
      });
    }
    setCurrentIndex(null);
    setLoading({ ...loading, deleteItem: false });
  };

  const allDeleteQueueItems = () => {
    queue.clear();
    setLetters(queue.getQueue());
    setQueueState({
      head: null,
      tail: null,
    });
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <div className={styles.stack}>
          <Input
            placeholder="Введите текст"
            value={inputValues}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValues(e.target.value)
            }
            maxLength={4}
            isLimitText
            disabled={
              loading.addItem ||
              QUEUE_SIZE === queue.getSize() ||
              queueState.tail === QUEUE_SIZE - 1
            }
            extraClass={styles.input}
          />
          <Button
            onClick={addQueueItem}
            text="Добавить"
            isLoader={loading.addItem}
            disabled={!inputValues || loading.deleteItem}
          />
          <Button
            onClick={deleteQueueItem}
            text="Удалить"
            isLoader={loading.deleteItem}
            disabled={queue.isEmpty() || loading.addItem}
          />
        </div>
        <Button
          onClick={allDeleteQueueItems}
          text="Очистить"
          isLoader={loading.allDeleteItems}
          disabled={queue.isEmpty() || loading.addItem || loading.deleteItem}
        />
      </div>

      <ul className={styles.letters}>
        {letters.map((letter, index) => (
          <li key={index}>
            <Circle
              letter={letter}
              index={index}
              head={index === queueState.head ? "head" : ""}
              tail={index === queueState.tail ? "tail" : ""}
              state={
                index === currentIndex
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
