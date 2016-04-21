#!/usr/bin/env node

var Dealer = require('./lib/Dealer')
var program = require('commander')

program
  .version('1.0.0')
  .description('A card shuffling algorithm using a doubly linked list.')
  .option('-n, --cards <n>', 'Number of cards in the deck', parseInt)
  .parse(process.argv)

var dealer = new Dealer({numberOfCards: program.cards})
dealer.shuffle()
