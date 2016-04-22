/**
 * A single node inside the deck (list) wrapping the actual card data
 */
export default class CardNode {
  /**
   * Constructs this node
   *
   * @param  {*} data The data to wrap
   */
  constructor(data) {
    this.data = data
    this.next = null
    this.prev = null
  }
}
