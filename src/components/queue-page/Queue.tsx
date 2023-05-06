import { IArrEl } from "../../utils/utils";

interface IQueue<T> {
  enqueue: (index: number, item: T, array: T[]) => void;
  dequeue: (index: number, item: T, array: T[]) => void;
  getSize: () => number;
  clear: () => void;
}

class Queue implements IQueue<IArrEl> {
  queue: any[] = [];
  head = -1;
  tail = -1;
  currentIndex = 0;
  private maxSize = 8;

  enqueue = (index: number, item: IArrEl, array: IArrEl[]) => {
    if (this.getSize() < this.maxSize) {
      array.splice(index, 1, item);
      if (this.head === -1) {
        this.head++;
      }
      this.tail++;
      this.currentIndex++;
      this.queue = array;
    } else {
      throw new Error("Слишком много элементов");
    }
  };

  dequeue = (index: number, item: IArrEl, array: IArrEl[]): void => {
    if (this.tail > this.head) {
      array.splice(index, 1, item);
      this.head++;
    } else if (this.tail === this.head) {
      array.splice(index, 1, item);
      this.clear();
    }
    this.queue = array;
  };

  clear = (): void => {
    this.queue = [];
    this.head = -1;
    this.tail = -1;
    this.currentIndex = 0;
  };

  getSize = () => this.queue.length;
}

export const queue = new Queue();
