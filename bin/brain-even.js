#!/usr/bin/env node
import greeting from '../src/cli.js';
import even from '../games/even.js';

const name = greeting();
even(name);
