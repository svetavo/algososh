import { swap } from "./utils";

// пузырек для тестирования
export const bubbleSortTest = (direction: string, array: number[]) => {
  for (let j = array.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (
        direction === "ascending"
          ? array[i] > array[i + 1]
          : array[i] < array[i + 1]
      ) {
        swap(array, i, i + 1);
      }
    }
  }
  return array;
};

// выбор для тестирования
export const selectionSortTest = (direction: string, array: number[]) => {
  for (let i = 0; i < array.length - 1; i++) {
    if (direction === "descending") {
      let maxInd = i;

      for (let j = i; j < array.length; j++) {
        if (array[maxInd] < array[j]) {
          maxInd = j;
        }
      }
      if (i !== maxInd) {
        swap(array, i, maxInd);
      }
    } else if (direction === "ascending") {
      let minInd = i;
      for (let j = i; j < array.length; j++) {
        if (array[minInd] > array[j]) {
          minInd = j;
        }
      }
      if (i !== minInd) {
        swap(array, i, minInd);
      }
    }
  }
  return array;
};
