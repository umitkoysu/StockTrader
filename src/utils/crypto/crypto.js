const bcrypt = require("bcrypt");

class Crypto {

    async hashGenerateAsync(data){
        const salt = await bcrypt.genSalt(Number(global.SALT));
        return await bcrypt.hash(data, salt);
    }

    async hashCompareAsync(hash_left , hash_right){
        return await bcrypt.compareSync(hash_left,hash_right);
    }

}


module.exports = new Crypto();