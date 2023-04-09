import { ElementStates } from "../types/element-states";

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const randomArr = (min: number, max: number) => {
  const len = min + Math.floor(Math.random() * (max - min + 1));
  const arr = [];
  for (let i = 0; i < len; i++) {
    const number = Math.floor(Math.random() * 101);
    arr.push({ value: number, color: ElementStates.Default });
  }
  return arr;
};

export const swap = (
  arr: any[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};
