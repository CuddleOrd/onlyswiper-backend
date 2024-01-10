/* ------------------seedCreator------------------------*/

const Creator = require("./models/Creator");
const { faker } = require("@faker-js/faker");

const gender = ["F", "M", "U"];

async function seedCreator() {
  try {
    await Creator.deleteMany({});
    const creators = [];
    for (let i = 0; i < 39; i++) {
      const data = {
        image: `image (${i + 1}).png`,
        name: faker.internet.userName(),
        cost: faker.number.int({ min: 1, max: 30 }),
        tags: ["item1", "item2", "item3"],
        likes: faker.number.int({ min: 1, max: 10000 }),
        location: faker.location.county(),
        gender: gender[faker.number.int({ max: 2 })],
        description: faker.lorem.sentence(),
      };
      creators.push(data);
    }

    await Creator.insertMany(creators);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error reading folder or processing data:", err);
  }
}

// Call the async function

module.exports = seedCreator();
