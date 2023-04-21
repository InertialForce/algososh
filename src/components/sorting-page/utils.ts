import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay, swap } from "../../utils/utils";
import { TArrState } from "./sorting-page.types";

export const selectionSort = async (
  arr: TArrState[],
  direction: string,
  setArr?: React.Dispatch<React.SetStateAction<TArrState[]>>
) => {
  for (let i = 0; i < arr.length; i++) {
    let indexMin = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
      if (setArr) {
        setArr([...arr]);
      }
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
      if (setArr) {
        setArr([...arr]);
      }
    }
    swap(arr, i, indexMin);
    arr[i].color = ElementStates.Modified;
  }
  if (setArr) {
    setArr([...arr]);
  }
  return arr;
};

export const bubbleSort = async (
  arr: TArrState[],
  direction: string,
  setArr?: React.Dispatch<React.SetStateAction<TArrState[]>>
) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      if (setArr) {
        setArr([...arr]);
      }
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
  if (setArr) {
    setArr([...arr]);
  }
  return arr;
};
