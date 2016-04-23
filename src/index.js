#!/usr/bin/env node

var shuffleDeck = require('./lib/dealer')
var program = require('commander')
var chalk = require('chalk')

program
  .version('1.0.0')
  .description('A card shuffling algorithm using a doubly linked list.')
  .option('-n, --cards <n>', 'Number of cards in the deck', parseInt)
  .parse(process.argv)

if (!program.cards) {
  program.help()
}

console.log('Start shuffling of %s cards...', program.cards)
var rounds = shuffleDeck(program.cards)
console.log('It took ' + chalk.green.bold('%s') + ' rounds to return the cards into original order.', rounds)
