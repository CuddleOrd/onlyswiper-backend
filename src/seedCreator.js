/* ------------------seedCreator------------------------*/

const fs = require("fs");
const Creator = require("./models/Creator");
const { faker } = require("@faker-js/faker");

const folderPath = "./IMAGE";
const gender = ["F", "M"];

async function seedCreator() {
  try {
    const files = await fs.promises.readdir(folderPath);
    console.log("Files in the folder:", files);
    await Creator.deleteMany({});
    const creators = [];
    for (let i = 0; i < files.length; i++) {
      const data = {
        image: files[i],
        name: faker.internet.userName(),
        tags: ["item1", "item2", "item3"],
        likes: faker.number.int({ min: 200, max: 3000 }),
        location: faker.location.county(),
        gender: gender[faker.number.int({ max: 1 })],
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
