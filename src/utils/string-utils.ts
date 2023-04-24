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

