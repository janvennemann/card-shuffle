var CardNode = require('./CardNode')

/**
 * A deck of cards implemented as a stack which allows popping cards from
 * its head and tail.
 *
 * Based on a doubly linked list.
 */
function CardDeck() {
  this.head = null
  this.tail = null
  this.size = 0
}

CardDeck.prototype.pushHead = function(data) {
  var newNode = new CardNode(data)
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

CardDeck.prototype.pushTail = function(data) {
  var newNode = new CardNode(data)
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

CardDeck.prototype.popHead = function() {
  if (this.head === null) {
    throw new Error('You can not pop from an empty stack')
  }

  var data = this.head.data
  this.head = this.head.next
  this.size -= 1

  return data
}

CardDeck.prototype.popTail = function() {
  if (this.head === null) {
    throw new Error('You can not pop from an empty stack')
  }

  var data = this.tail.data
  this.tail = this.tail.prev
  this.size -= 1

  return data
}

CardDeck.prototype.isEmpty = function() {
  return this.size === 0
}

CardDeck.prototype.debug = function() {
  if (this.isEmpty()) {
    return '[ ]'
  }

  var debugString = '[ '
  var node = this.head
  while(node !== null) {
    debugString += node.data + ' '
    node = node.next
  }
  debugString += ']'

  return debugString
}

module.exports = CardDeck
