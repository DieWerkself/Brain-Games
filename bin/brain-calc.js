#!/usr/bin/env node
import greeting from '../src/cli.js';
import calc from '../games/calc.js';

const name = greeting();
calc(name);
