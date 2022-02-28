const {User} = require('../models/user');
const Crypto = require("../../utils/crypto/crypto")

const seed = {
    data:[
        {
            "firstName":"Arthur Conan",
            "lastName":"Doyle",
            "userName":"Sherlock",
            "password":"User1234",
            "mail":"sherlock@gmail.com",
            "balance":10000.00
        
        },
        {
            "firstName":"Nicola",
            "lastName":"Tesla",
            "userName":"Tesla",
            "password":"User1234",
            "mail":"tesla@gmail.com",
            "balance":10000.00
        
        },
        {
            "firstName":"J.R.R",
            "lastName":"Tolkien",
            "userName":"Hobbit",
            "password":"User1234",
            "mail":"hobbit@gmail.com",
            "balance":10000.00
        
        },
        {
            "firstName":"Charles",
            "lastName":"Dickens",
            "userName":"OliverTwist",
            "password":"User1234",
            "mail":"oliver@gmail.com",
            "balance":10000.00
        
        },
        {
            "firstName":"John",
            "lastName":"Flanagan",
            "userName":"Ranger",
            "password":"User1234",
            "mail":"ranger@gmail.com",
            "balance":10000.00
        
        }
    ]
}

async function userSeeder(){

    for(let u in seed.data){
        seed.data[u].password = await Crypto.hashGenerateAsync(seed.data[u].password);
    }

    if(!await User.findOne({where:{userName:seed.data[0].userName}})){
       return result = await User.bulkCreate(seed.data);
    }
}



module.exports = userSeeder;