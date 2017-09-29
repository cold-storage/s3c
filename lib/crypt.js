#!/usr/bin/env node

'use strict';

const crypto = require('crypto');
const IV_LENGTH = 16; // For AES, this is always 16

// password is really encryption key Must be 256 bytes (32 characters)

function encrypt(string, password) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(password), iv);
  let encrypted = cipher.update(string);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(string, password) {
  let textParts = string.split(':');
  let iv = new Buffer(textParts.shift(), 'hex');
  let encryptedText = new Buffer(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(password), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

exports = module.exports = {
  encrypt,
  decrypt
};

if (require.main === module) {
  const fs = require('fs');
  const text = fs.readFileSync(__filename);
  const pw = 'kasoinelknsvohdakjbfewiutyskjnv9';
  const encrypted = encrypt(text, pw);
  console.log(encrypted);
  console.log(decrypt(encrypted, pw));
}


