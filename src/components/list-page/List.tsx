interface IList<T> {
  list: T[];
  push: (item: T, array: T[]) => void;
  pop: (array: T[]) => void;
  shift: (array: T[]) => void;
  unshift: (item: T, array: T[]) => void;
  addInd: (index: number, item: T, array: T[]) => void;
  removeInd: (index: number, array: T[]) => void;
  getSize: () => number;
}

class List<IArrEl> implements IList<IArrEl> {
  list: any[] = [];
  head = -1;
  tail = -1;
  currentIndex = 0;

  push = (item: IArrEl, array: IArrEl[]): void => {
    array.push(item);
    this.tail = this.getSize() - 1;
    this.list = array;
  };

  pop = (array: IArrEl[]): void => {
    array.pop();
    this.list = array;
    this.head = 0;
    this.tail = this.getSize() - 1;
  };

  shift = (array: IArrEl[]) => {
    array.shift();
    this.list = array;
    this.head = 0;
    this.tail = this.getSize() - 1;
  };

  unshift = (item: IArrEl, array: IArrEl[]) => {
    array.unshift(item);
    this.list = array;
    this.head = 0;
    this.tail = this.getSize() - 1;
  };

  print = () => this.list;

  addInd = (index: number, item: IArrEl, array: IArrEl[]) => {
    array.splice(index, 0, item);
    this.list = array;
    this.head = 0;
    this.tail = this.getSize() - 1;
  };

  removeInd = (index: number, array: IArrEl[]) => {
    array.splice(index, 1);
    this.list = array;
    this.head = 0;
    this.tail = this.getSize() - 1;
  };

  getSize = () => this.list.length;
}
export const list = new List();
