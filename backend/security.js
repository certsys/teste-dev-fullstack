//Base-lib
const md5 = require('md5');

module.exports = {
    encryptPassword: (originalPassword) => {
        
        return md5(originalPassword);
    },
    matchPassword: (originalPassword, encryptedPassword) => {
        return md5(originalPassword) == encryptedPassword;
    }
}