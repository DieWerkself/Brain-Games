#!/usr/bin/env node
import greeting from '../src/cli.js';
import progression from '../games/progression.js';

const name = greeting();
progression(name);
