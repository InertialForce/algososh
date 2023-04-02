export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(initialArray: T[]) {
    this.head = null;
    this.size = 0;
    initialArray.forEach((item) => this.append(item));
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = null;

        while (currIndex < index && curr) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }

        if (prev) prev.next = node;
        node.next = curr;
      }

      this.size++;
    }
  }

  deleteAt(index: number) {
    if (index < 0 || index >= this.size) {
      console.log("Enter a valid index");
      return;
    }
    if (index === 0) {
      this.head = this.head!.next;
    } else {
      let prev = this.head;
      let current = prev!.next;
      for (let i = 1; i < index; i++) {
        prev = current;
        current = current!.next;
      }
      prev!.next = current!.next;
    }

    this.size--;
  }

  append(element: T) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);

    if (!(this.getSize() === 0)) {
      node.next = this.head;
      this.head = node;
    }

    this.head = node;
    this.size++;
  }

  deleteHead() {
    if (!this.head) {
      return;
    }

    this.head = this.head.next;
    this.size--;
  }

  deleteTail() {
    let current = this.head;
    let previous;

    while (current?.next) {
      previous = current;
      current = current.next;
    }

    if (previous?.next) {
      previous.next = null;
    }
    this.size--;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
