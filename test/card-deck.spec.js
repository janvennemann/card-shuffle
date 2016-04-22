var chai = require('chai')
var CardDeck = require('../lib/card-deck')

var should = chai.should()

describe('Card Deck', function() {
  var deck = null

  var fillDeck = function (deck, numberOfCards) {
      for (var i = 0; i < numberOfCards; i++) {
          deck.pushHead(i + 1);
      }
  }

  beforeEach(function() {
    deck = new CardDeck()
  })

  afterEach(function() {
    deck = null
  })

  it('should initiately contain zero items', function() {
    should.equal(0, deck.size)
    deck.isEmpty().should.equal(true)
  })

  it('should return correct deck size', function() {
    should.equal(0, deck.size)
    fillDeck(deck, 3)
    should.equal(3, deck.size)
  })

  it('should detect if empty or not', function() {
    deck.isEmpty().should.equal(true)
    deck.pushHead(1)
    deck.isEmpty().should.equal(false)
  })

  describe('adding cards', function() {
    it('head and tail should be the same for first card', function() {
      deck.pushHead(1)
      deck.head.should.equal(deck.tail)
    })

    it('should add card to the head of the deck', function() {
      fillDeck(deck, 3)
      should.equal(3, deck.head.data)
    })

    it('should add card to the tail of the deck', function() {
      fillDeck(deck, 3)
      deck.pushTail(0)
      should.equal(0, deck.tail.data)
    })
  })

  describe('removing cards', function() {
    it('should throw error if remove from empty deck', function() {
      (function() {
        deck.popHead()
      }).should.Throw(Error, 'You can not pop from an empty stack')
    })

    it('should remove card from the head of the deck', function() {
      fillDeck(deck, 6)
      deck.popHead().should.equal(6)
    })

    it('should remove card from the tail of the deck', function() {
      fillDeck(deck, 4)
      deck.popTail().should.equal(1)
    })

    it('head and tail should be the same after removing all but one card', function() {
      fillDeck(deck, 3)
      deck.popHead()
      deck.popHead()
      deck.head.should.equal(deck.tail)
    })
  })
})
