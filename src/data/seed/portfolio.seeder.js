const { Portfolio } = require('../models/portfolio');

const seed = {
    data: [
        {
            "name": "Sherlock Portfolio",
        },
        {
            "name": "Tesla Portfolio",
        },
        {
            "name": "Hobbit Portfolio",
        },
        {
            "name": "Oliver Twist Portfolio",
        },
        {
            "name": "Ranger Portfolio",
        }
    ]
}

async function portfolioSeeder(users) {

    if (!await Portfolio.findOne({ where: { name: seed.data[0].name } })) {

        users.forEach((value, i) => {
            seed.data[i].userId = value.id;
        })

        return result = await Portfolio.bulkCreate(seed.data);
    }

}



module.exports = portfolioSeeder;