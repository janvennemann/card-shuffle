#!/usr/bin/env node

import shuffleDeck from './dealer'
import program from 'commander'

program
  .version('1.0.0')
  .description('A card shuffling algorithm using a doubly linked list.')
  .option('-n, --cards <n>', 'Number of cards in the deck', parseInt)
  .parse(process.argv)

var rounds = shuffleDeck(program.cards)
console.log(rounds)
