#!/usr/bin/env node

import Dealer from './lib/Dealer'
import program from 'commander'

program
  .version('1.0.0')
  .description('A card shuffling algorithm using a doubly linked list.')
  .option('-n, --cards <n>', 'Number of cards in the deck', parseInt)
  .parse(process.argv)

var dealer = new Dealer({numberOfCards: program.cards})
dealer.shuffle()
