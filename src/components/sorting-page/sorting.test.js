import { bubbleSortTest, selectionSortTest } from "../../utils/sort-utils";

const emptyArr = [];
const single = [1];
const array = [3, 1, 12];

describe("bubble sorting algorithm works correctly", () => {
  test("empty array", () => {
    expect(bubbleSortTest("ascending", emptyArr)).toEqual([]);
  });

  test("one element array", () => {
    expect(bubbleSortTest("ascending", single)).toEqual([1]);
  });

  test("regular array, ascending", () => {
    expect(bubbleSortTest("ascending", array)).toEqual([1, 3, 12]);
  });

  test("regular array, descending", () => {
    expect(bubbleSortTest("descending", array)).toEqual([12, 3, 1]);
  });
});

describe("selection sorting algorithm works correctly", () => {
  test("empty array", () => {
    expect(selectionSortTest("ascending", emptyArr)).toEqual([]);
  });

  test("one element array", () => {
    expect(selectionSortTest("ascending", single)).toEqual([1]);
  });

  test("regular array, ascending", () => {
    expect(selectionSortTest("ascending", array)).toEqual([1, 3, 12]);
  });

  test("regular array, descending", () => {
    expect(selectionSortTest("descending", array)).toEqual([12, 3, 1]);
  });
});
