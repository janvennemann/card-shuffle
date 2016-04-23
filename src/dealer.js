import CardDeck from './card-deck'

/**
 * Shuffles a deck of cards multiple rounds until it is back in its orignal
 * order and returns the number of rounds it took
 *
 * @param  {number} numberOfCards Number of cards in the deck
 * @return {number} Rounds it took to return the deck to its original order
 */
export default function shuffleDeck(numberOfCards) {
  let hand = createDeck(numberOfCards)
  const startingHand = Object.assign({}, hand)
  let rounds = 0
  const maxTrys = numberOfCards * 200

  do {
    let table = doOneShuffleRound(hand)
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
  let deck = new CardDeck()
  for (let i = 0; i < numberOfCards; i++) {
    let cardValue = Math.floor(Math.random() * (10 - 1) + 1)
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
  let table = new CardDeck()
  while (!hand.isEmpty()) {
    let topCard = hand.popHead()
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
  let currentHandCard = hand.head
  let startingHandCard = startingHand.head
  while (currentHandCard !== null) {
    if (currentHandCard.data !== startingHandCard.data) {
      return false
    }

    currentHandCard = currentHandCard.next
    startingHandCard = startingHandCard.next
  }

  return true
}
