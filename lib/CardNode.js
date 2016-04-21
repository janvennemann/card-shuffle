/**
 * A single node inside the deck (list) wrapping the actual card data
 *
 * @param {mixed} data The wrapped data
 */
function CardNode(data) {
  this.data = data
  this.next = null
  this.prev = null
}

module.exports = CardNode
