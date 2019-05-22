const bcrypt = require('bcryptjs');

module.exports = {
    get: plain => {
        return bcrypt.hashSync(plain);
    },

    isValid: (plain, hash) => {
    	console.log(bcrypt.hashSync(plain));
    	console.log(hash);
    	return bcrypt.compare(plain, hash)
    },
};