#!/usr/bin/env node
import greeting from '../src/cli.js';
import progression from '../src/games/progression.js';

const name = greeting();
progression(name);
