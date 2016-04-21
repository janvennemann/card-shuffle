var CardDeck = require('./CardDeck')

/**
 * The dealer who manages the deck
 *
 * @param {object} options
 */
function Dealer(options) {
  this.options = options || {};
  this.hand = this.createDeck(options.numberOfCards)
  this.startingHand = this.copyDeck(this.hand)
  this.table = new CardDeck()
  this.rounds = 0
  this.maxTrys = options.numberOfCards * 20
}

/**
 * Starts the card shuffling
 */
Dealer.prototype.shuffle = function() {
  console.log('Starting deck:')
  console.log(this.hand.debug())

  this.shuffleDeck()
  while (!this.hasStartingOrder()) {
    this.shuffleDeck()

    // safeguard to not run into an infinte loop if something goes wrong
    if (this.rounds >= this.maxTrys) {
      throw new Error('Could not ultimately put the deck back in order after ' + this.rounds + ' trys, aborting...')
    }
  }
  console.log('It took ' + this.rounds + ' rounds to put the deck back in its original order.')
}


/**
 * Creates a new deck with the given number if cards
 *
 * @param  {int} numberOfCards
 * @return {CardDeck} The newly created deck
 */
Dealer.prototype.createDeck = function(numberOfCards) {
  var hand = new CardDeck()
  for (var i = 0; i < numberOfCards; i++) {
    var cardValue = Math.floor(Math.random() * (10 - 1) + 1)
    hand.pushHead(cardValue)
  }

  return hand
}

/**
 * Makes a deep copy of a deck
 *
 * @param  {CardDeck} hand Card deck to copy
 * @return {CardDeck} Deep copy of the deck
 */
Dealer.prototype.copyDeck = function(hand) {
  // We could use an ugly json.parse deep copy hack here, but we need this only
  // once so this will do
  var startingHand = new CardDeck()
  var card = hand.tail
  while (card !== null) {
    startingHand.pushHead(card.data)
    card = card.prev
  }

  return startingHand
}

/**
 * Shuffles the deck of cards
 */
Dealer.prototype.shuffleDeck = function() {
  while (this.table.size < this.options.numberOfCards) {
    var topCard = this.hand.popHead()
    this.table.pushHead(topCard)
    if (!this.hand.isEmpty()) {
      topCard = this.hand.popHead()
      this.hand.pushTail(topCard)
    }
  }

  this.hand = this.table
  this.table = new CardDeck()
  this.rounds += 1
}

/**
 * Checks wether current order of the cards is the same as when we startet
 *
 * @return {Boolean} True if the current deck is in starting order, false otherwise
 */
Dealer.prototype.hasStartingOrder = function() {
  var currentHandCard = this.hand.head
  var startingHandCard = this.startingHand.head
  while (currentHandCard !== null) {
    if (currentHandCard.data !== startingHandCard.data) {
      return false
    }

    currentHandCard = currentHandCard.next
    startingHandCard = startingHandCard.next
  }

  return true
}

module.exports = Dealer
