// Asynchronous crypto from 
// https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
const crypto = require('crypto').randomBytes(256).toString('hex');
module.exports = {
    uri:'mongodb://localhost:27017/mean-angular-2',
    secret: crypto,
    db:'mean-angular-2'
}
