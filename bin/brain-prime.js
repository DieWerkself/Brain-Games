#!/usr/bin/env node
import greeting from '../src/cli.js';
import prime from '../src/games/prime.js';

const name = greeting();
prime(name);
