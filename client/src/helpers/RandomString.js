import sortedWords from '../../../data/sortedWords.js';

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

export function randomWords(length) {
  return sortedWords[Math.floor(Math.random() * 177085)];
}