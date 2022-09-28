import sortedWords from '../../../data/sortedWords.js';
import methods from '../../../data/methods.js';

export function easyString(length) {
  let result = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++ ) {
    result += alphabet.charAt(Math.random() * alphabet.length);
 }
 return result;
}

export function hardString(length) {
  let result = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const alphaSymbols = alphabet + '01234567899!@#$%&*(){}?';
  for (let i = 0; i < length; i++) {
    result += alphaSymbols.charAt(Math.random() * alphaSymbols.length);
 }
 return result;
}

export function randomWords(indexes) {
  return sortedWords[Math.floor(Math.random() * (indexes[1] - indexes[0]) + indexes[0])];
}

export function randomMethods() {
  const methodString = methods[Math.floor(Math.random() * 31)];
  const combinedString = methodString + '(' + randomWords([0, 20000]) + ')';
  return combinedString;
}