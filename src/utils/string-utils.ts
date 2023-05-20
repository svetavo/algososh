import { ElementStates } from "../types/element-states";

export const circleColor = (
  index: number,
  currentIndex: number,
  arr: Array<string | number>
) => {
  let length = arr.length - 1;
  if (currentIndex < index || currentIndex > length - index) {
    return ElementStates.Modified;
  }
  if (currentIndex === index || currentIndex === length - index) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
};

// разворот для тестирования
export const arrReverseTest = (string: string) => {
  const arr = string.split("");
  const end = arr!.length - 1;
  const mid = Math.floor(arr!.length / 2);
  for (let i = 0; i < mid; i++) {
    [arr![i], arr![end - i]] = [arr![end - i], arr![i]];
  }
  return arr;
};
