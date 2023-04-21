import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectionSort } from "./utils";

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
  describe("Сортировка пустого массива", () => {
    it("Сортировка массива выбором по убыванию", async () => {
      expect(await selectionSort([], Direction.Descending)).toEqual([]);
    });
    it("Сортировка массива выбором по возрастанию", async () => {
      expect(await selectionSort([], Direction.Ascending)).toEqual([]);
    });

    it("Сортировка массива пузырьком по убыванию", async () => {
      expect(await bubbleSort([], Direction.Descending)).toEqual([]);
    });
    it("Сортировка массива пузырьком по возрастанию", async () => {
      expect(await bubbleSort([], Direction.Ascending)).toEqual([]);
    });
  });

  describe("Сортировка массивa из одного элемента", () => {
    it("Сортировка массива выбором по убыванию", async () => {
      expect(
        await selectionSort(
          [{ value: 3, color: ElementStates.Default }],
          Direction.Descending
        )
      ).toEqual([{ value: 3, color: ElementStates.Modified }]);
    });
    it("Сортировка массива выбором по возрастанию", async () => {
      expect(
        await selectionSort(
          [{ value: 3, color: ElementStates.Default }],
          Direction.Ascending
        )
      ).toEqual([{ value: 3, color: ElementStates.Modified }]);
    });

    it("Сортировка массива пузырьком по убыванию", async () => {
      expect(
        await bubbleSort(
          [{ value: 3, color: ElementStates.Default }],
          Direction.Descending
        )
      ).toEqual([{ value: 3, color: ElementStates.Modified }]);
    });
    it("Сортировка массива пузырьком по возрастанию", async () => {
      expect(
        await bubbleSort(
          [{ value: 3, color: ElementStates.Default }],
          Direction.Ascending
        )
      ).toEqual([{ value: 3, color: ElementStates.Modified }]);
    });
  });

  describe("Сортировка массивa из нескольких элементов", () => {
    it("Сортировка массива выбором по убыванию", async () => {
      expect(
        await selectionSort(
          [
            { value: 3, color: ElementStates.Default },
            { value: 1, color: ElementStates.Default },
            { value: 10, color: ElementStates.Default },
            { value: 6, color: ElementStates.Default },
          ],
          Direction.Descending
        )
      ).toEqual([
        { value: 10, color: ElementStates.Modified },
        { value: 6, color: ElementStates.Modified },
        { value: 3, color: ElementStates.Modified },
        { value: 1, color: ElementStates.Modified },
      ]);
    });
    it("Сортировка массива выбором по возрастанию", async () => {
      expect(
        await selectionSort(
          [
            { value: 3, color: ElementStates.Default },
            { value: 1, color: ElementStates.Default },
            { value: 10, color: ElementStates.Default },
            { value: 6, color: ElementStates.Default },
          ],
          Direction.Ascending
        )
      ).toEqual([
        { value: 1, color: ElementStates.Modified },
        { value: 3, color: ElementStates.Modified },
        { value: 6, color: ElementStates.Modified },
        { value: 10, color: ElementStates.Modified },
      ]);
    });

    it("Сортировка массива пузырьком по убыванию", async () => {
      expect(
        await bubbleSort(
          [
            { value: 3, color: ElementStates.Default },
            { value: 1, color: ElementStates.Default },
            { value: 10, color: ElementStates.Default },
            { value: 6, color: ElementStates.Default },
          ],
          Direction.Descending
        )
      ).toEqual([
        { value: 10, color: ElementStates.Modified },
        { value: 6, color: ElementStates.Modified },
        { value: 3, color: ElementStates.Modified },
        { value: 1, color: ElementStates.Modified },
      ]);
    });
    it("Сортировка массива пузырьком по возрастанию", async () => {
      expect(
        await bubbleSort(
          [
            { value: 3, color: ElementStates.Default },
            { value: 1, color: ElementStates.Default },
            { value: 10, color: ElementStates.Default },
            { value: 6, color: ElementStates.Default },
          ],
          Direction.Ascending
        )
      ).toEqual([
        { value: 1, color: ElementStates.Modified },
        { value: 3, color: ElementStates.Modified },
        { value: 6, color: ElementStates.Modified },
        { value: 10, color: ElementStates.Modified },
      ]);
    });
  });
});
