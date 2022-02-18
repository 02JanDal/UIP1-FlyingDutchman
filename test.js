import { User } from "./model"

console.log("Starting tests...");

console.assert(User.find({}).length > 0);

const user = new User();
user.firstName = "Ford";
user.lastName = "Prefect";
user.save();

const id = user.id;

console.assert(id > 0);
console.assert(User.get(id) !== null);
console.assert(User.find({ firstName: "Ford", lastName: "Prefect" }).length === 1)

user.firstName = "Perfect";
user.save();
console.assert(User.get(id).firstName === "Perfect");

user.delete();
console.assert(User.get(id) === null);
