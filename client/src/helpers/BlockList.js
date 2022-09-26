class BlockList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(element) {
    if (!this.head) {
      this.head = element;
      this.tail = this.head;
    } else {
      this.tail.next = element;
      this.tail = element;
    }
    this.length++;
  }

  pop() {
    if (!this.head) {
      return undefined;
    }
    let current = this.head;
    let newTail = current;
    while(current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    if (!this.length) {
      this.head = null;
      this.tail = null;
    }
  }

  shift() {
    if(!this.head) {
      return undefined;
    }
    let currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    if (!this.length) {
      this.tail = null;
    }
  }

  unshift(element) {
    if (!this.head) {
      this.head = element;
      this.tail = this.head;
    }
    element.next = this.head;
    this.head = element;
    this.length++;
  }
}

export default BlockList;