export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const swap = (arr: any[], a: number, b: number): void => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};


  //random array
export const randomArr = () => {
    const array = [];
    const max = 100;
    while (array.length < 4) {
      const r: number = Math.floor(Math.random() * max);
      if (array.indexOf(r) === -1) {
        array.push(r);
      }
    }
    const newArr: string[] = array.join().split(",");
    // setList(newArr);
    return newArr;
  };
