import { arrReverseTest } from "src/utils/string-utils";

describe("string algorithm works correctly", () => {
  test("string of even number of symbols", () => {
    expect(arrReverseTest("qwerty")).toEqual(["y", "t", "r", "e", "w", "q"]);
  });
  test("string of uneven number of symbols", () => {
    expect(arrReverseTest("qwert")).toEqual(["t", "r", "e", "w", "q"]);
  });

  test("string of single symbol", () => {
    expect(arrReverseTest("q")).toEqual(["q"]);
  });

  test("empty string", () => {
    expect(arrReverseTest("")).toEqual([]);
  });
});
