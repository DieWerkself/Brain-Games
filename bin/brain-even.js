#!/usr/bin/env node
import greeting from '../src/cli.js';
import even from '../src/games/even.js';

const name = greeting();
even(name);
