import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay, swap } from "../../utils/utils";
import { TArrState } from "./string.types";

export const reverseString = async (
  str: string,
  setLetters?: React.Dispatch<React.SetStateAction<TArrState[]>>
) => {
  const arrString = str.split("").map((value) => ({
    value: value,
    color: ElementStates.Default,
  }));
  let start = 0;
  let end = arrString.length - 1;
  while (start <= end) {
    if (start !== end) {
      arrString[start].color = ElementStates.Changing;
      arrString[end].color = ElementStates.Changing;
      if (setLetters) {
        setLetters([...arrString]);
      }
      await delay(DELAY_IN_MS);
    }
    swap(arrString, start, end);
    arrString[start].color = ElementStates.Modified;
    arrString[end].color = ElementStates.Modified;
    if (setLetters) {
      setLetters([...arrString]);
    }
    start++;
    end--;
  }
  return arrString.map((item) => item.value).join("");
};
