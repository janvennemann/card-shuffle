#!/usr/bin/env node

var shuffleDeck = require('./lib/dealer')
var program = require('commander')

program
  .version('1.0.0')
  .description('A card shuffling algorithm using a doubly linked list.')
  .option('-n, --cards <n>', 'Number of cards in the deck', parseInt)
  .parse(process.argv)

var rounds = shuffleDeck(program.cards)
console.log(rounds)
