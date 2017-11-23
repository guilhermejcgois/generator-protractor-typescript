'use strict';

const firstLetter = s => fn => s.replace(/\b\w/g, l => l[fn]());

module.exports = {
  capitalize: s => firstLetter(s)('toUpperCase'),
  firstToLower: s => firstLetter(s)('toLowerCase')
};
