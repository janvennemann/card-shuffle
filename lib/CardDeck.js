import CardNode from './CardNode'

/**
 * A deck of cards implemented as a stack which allows pushing and popping
 * cards from its head and tail.
 *
 * Based on a doubly linked list.
 */
export default class CardDeck {
  /**
   * Constructs this card deck
   */
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  /**
   * Push a new elment to the head of the stack
   *
   * @param  {*} data The data to be stored
   */
  pushHead(data) {
    const newNode = new CardNode(data)
    newNode.next = this.head
    if (this.head !== null) {
      this.head.prev = newNode
    }
    this.head = newNode
    if (this.tail === null) {
      this.tail = this.head
    }

    this.size += 1
  }

  /**
   * Push a new elment to the tail of the stack
   *
   * @param  {*} data The data to be stored
   */
  pushTail(data) {
    const newNode = new CardNode(data)
    newNode.prev = this.tail
    if (this.tail !== null) {
      this.tail.next = newNode
    }
    this.tail = newNode
    if (this.head === null) {
      this.head = this.tail
    }

    this.size += 1
  }

  /**
   * Pop element from the head of the stack
   *
   * @return {*} The data contained in the pushed element
   */
  popHead() {
    if (this.head === null) {
      throw new Error('You can not pop from an empty stack')
    }

    const data = this.head.data
    this.head = this.head.next
    this.size -= 1

    return data
  }

  /**
   * Pop element from the head of the stack
   *
   * @return {*} The data contained in the pushed element
   */
  popTail() {
    if (this.head === null) {
      throw new Error('You can not pop from an empty stack')
    }

    const data = this.tail.data
    this.tail = this.tail.prev
    this.size -= 1

    return data
  }

  /**
   * Returns wether the stack is empty or not
   *
   * @return {boolean} True if the stack is empty, false if not
   */
  isEmpty() {
    return this.size === 0
  }

  /**
   * Returns a debugging representation of the stack
   *
   * @return {string}
   */
  debug() {
    if (this.isEmpty()) {
      return '[ ]'
    }

    let debugString = '[ '
    let node = this.head
    while(node !== null) {
      debugString += node.data + ' '
      node = node.next
    }
    debugString += ']'

    return debugString
  }
}
