interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  printStack: () => T[];
  clear: () => void;
  isFull: () => boolean;
}
 
class Stack<T> implements IStack<T> {
  stack: any[] = [];
  private maxSize = 7;

  push = (item: T): void => {
    if (this.getSize() < this.maxSize) {
      this.stack.push(item);
    }
  };

  pop = (): void => {
    if (this.getSize()) {
      this.stack.pop();
    }
  };

  peak = (): T | null => {
    if (this.getSize()) {
      return this.stack[this.getSize() - 1];
    }
    return null;
  };

  clear = (): void => {
    this.stack = [];
  };

  getSize = () => this.stack.length;

  printStack = () => this.stack;

  isFull = () => {
    if (this.getSize() < this.maxSize) {
      return false;
    }
    return true;
  };
}

export const stack = new Stack();
