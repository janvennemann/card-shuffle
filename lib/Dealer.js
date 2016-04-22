import CardDeck from './card-deck'

/**
 * The dealer who manages the deck
 */
export default class Dealer {
  constructor(options) {
    this.options = options || {};
    this.hand = this.createDeck(options.numberOfCards)
    this.startingHand = Object.assign({}, this.hand)
    this.table = new CardDeck()
    this.rounds = 0
    this.maxTrys = options.numberOfCards * 20
  }

  /**
   * Starts the card shuffling
   */
  shuffle() {
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
  createDeck(numberOfCards) {
    const hand = new CardDeck()
    for (let i = 0; i < numberOfCards; i++) {
      let cardValue = Math.floor(Math.random() * (10 - 1) + 1)
      hand.pushHead(cardValue)
    }

    return hand
  }

  /**
   * Shuffles the deck of cards
   */
  shuffleDeck() {
    while (this.table.size < this.options.numberOfCards) {
      let topCard = this.hand.popHead()
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
  hasStartingOrder() {
    let currentHandCard = this.hand.head
    let startingHandCard = this.startingHand.head
    while (currentHandCard !== null) {
      if (currentHandCard.data !== startingHandCard.data) {
        return false
      }

      currentHandCard = currentHandCard.next
      startingHandCard = startingHandCard.next
    }

    return true
  }
}
