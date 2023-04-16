#!/usr/bin/env node
import greeting from '../src/cli.js';
import gcd from '../games/gcd.js';

const name = greeting();
gcd(name);
