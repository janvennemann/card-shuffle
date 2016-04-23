/**
 * A single node inside the deck (list) wrapping the actual card data
 *
 * @param {*} data The wrapped data
 */
function CardNode(data) {
  this.data = data
  this.next = null
  this.prev = null
}

module.exports = CardNode
