#!/usr/bin/env node

import shuffleDeck from './dealer'
import program from 'commander'
import chalk from 'chalk'

program
  .version('1.0.0')
  .description('A card shuffling algorithm using a doubly linked list.')
  .option('-n, --cards <n>', 'Number of cards in the deck', parseInt)
  .parse(process.argv)

if (!program.cards) {
  program.help()
}

console.log('Start shuffling of %s cards...', program.cards)
const rounds = shuffleDeck(program.cards)
console.log('It took ' + chalk.green.bold('%s') + ' rounds to return the cards into original order.', rounds)
