import CardDeck from './card-deck'

module.exports = shuffleDeck

/**
 * Shuffles a deck of cards multiple rounds until it is back in its orignal
 * order and returns the number of rounds it took
 *
 * @param  {number} numberOfCards Number of cards in the deck
 * @return {number} Rounds it took to return the deck to its original order
 */
function shuffleDeck(numberOfCards) {
  var hand = createDeck(numberOfCards)
  var startingHand = Object.assign({}, hand)
  var rounds = 0
  var maxTrys = numberOfCards * 20

  console.log('Starting deck:')
  console.log(hand.debug())

  do {
    var table = doOneShuffleRound(hand)
    hand = table
    rounds += 1

    // safeguard to not run into an infinte loop if something goes wrong
    if (rounds >= maxTrys) {
      throw new Error('Could not ultimately put the deck back in order after ' + rounds + ' trys, aborting...')
    }
  } while(!hasSameOrder(hand, startingHand))

  return rounds
}

/**
 * Creates a new deck with the given number if cards
 *
 * @param  {number} numberOfCards
 * @return {CardDeck} The newly created deck
 */
function createDeck(numberOfCards) {
  var deck = new CardDeck()
  for (var i = 0; i < numberOfCards; i++) {
    var cardValue = Math.floor(Math.random() * (10 - 1) + 1)
    deck.pushHead(cardValue)
  }

  return deck
}

/**
 * Shuffles the deck of cards for one round
 *
 * The three steps of this shuffling algorithm that make a round:
 *   - Take the top card off the deck and set it on the table
 *   - Take the next card off the top and put it on the bottom of
 *     the deck in your hand
 *   - Continue steps 1 and 2 until all cards are on the table
 *
 * @param {CardDeck} hand Deck of cards in the dealers hand
 * @return {CardDeck} table Deck of cards on the table
 */
function doOneShuffleRound(hand) {
  var table = new CardDeck()
  while (!hand.isEmpty()) {
    var topCard = hand.popHead()
    table.pushHead(topCard)
    if (hand.size > 1) {
      topCard = hand.popHead()
      hand.pushTail(topCard)
    }
  }

  return table
}

/**
 * Checks wether the given deck of cards is in the same order
 *
 * @return {Boolean} True if the decks are in the same order, false otherwise
 */
function hasSameOrder(hand, startingHand) {
  var currentHandCard = hand.head
  var startingHandCard = startingHand.head
  while (currentHandCard !== null) {
    if (currentHandCard.data !== startingHandCard.data) {
      return false
    }

    currentHandCard = currentHandCard.next
    startingHandCard = startingHandCard.next
  }

  return true
}
