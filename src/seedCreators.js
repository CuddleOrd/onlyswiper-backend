/* ------------------seedCreator------------------------*/

const { faker } = require("@faker-js/faker");

const User = require("./models/User");
const { ROLES, GENDERS } = require("./util/constants");

async function seedCreators() {
  try {
    await User.deleteMany({role: ROLES.CREATOR});
    
    const creators = [];
    
    for (let i = 1; i <= 40; i++) {
      const name = faker.person.fullName();

      const data = {
        role: ROLES.CREATOR,
        
        name,
        email: faker.internet.email(),
        phone: faker.phone.number(),
        age: faker.number.int({ min: 15, max: 45 }),
        address: [faker.location.country(), faker.location.state(),faker.location.city(), faker.location.streetAddress()].join(" "),

        characteristics: [faker.person.bio()],
        subscriptionId: "",

        password: faker.internet.password(),

        avatar: `image_${i.toString().padStart(2, "0")}.png`,
        gender: GENDERS[faker.number.int({min: 0, max: 2})],
        description: faker.lorem.paragraph(),
        cost: faker.commerce.price({ min: 0, max: 100 }),
        
        items: [faker.internet.emoji()],
        includes: ["onlyfans.com", name.replace(" ", ".")],

        likes: faker.number.int({min: 100000, max: 999999}),
        pictures: faker.number.int({min: 1000, max: 9999}),
        videos: faker.number.int({min: 0, max: 999}),

        shares: {
          twitter: faker.datatype.boolean(),
          instagram: faker.datatype.boolean(),
          tiktok: faker.datatype.boolean(),
        }
      };

      creators.push(data);
    }

    await User.insertMany(creators);
    console.log(`${creators.length} creators inserted successfully`);
  } catch (err) {
    console.error("Error reading folder or processing data:", err);
  }
}

// Call the async function
module.exports = seedCreators();
