const database = require("../src/db/database");
const { ObjectId } = require("mongodb");

module.exports = class UserRepository {
  static async getUsers(filter) {
    const db = await database.connect();
    let limit = 10;
    let users = [];
    let totalItems = 0;

    users = await db.collection("User")
      .find()
      .limit(limit)
      .skip(filter.currentPage > 0 ? (filter.currentPage - 1) * limit : 0)
      .toArray();

    totalItems = await db.collection("User").find().count(); 

    return {
      users:users,
      totalItems: totalItems
    }
  }

  static async getAll() {
    const db = await database.connect();
    return db.collection("User").find().toArray();
  }
  
  static async getById(id) {
    const db = await database.connect();
    return db.collection("User").findOne({ _id: ObjectId(id) });
  }

  static async getByEmail(email) {
    const db = await database.connect();
    return db.collection("User").findOne({ email: email });
  }

  static async insert(json) {
    const db = await database.connect();
    return db.collection("User").insertOne(json);
  }

  static async updateOne(newValue) {
    const db = await database.connect();
    var o_id = new ObjectId(newValue._id.toString());
    return db.collection("User").replaceOne({"_id": o_id}, newValue);
  }

  static async removeById(id) {
    const db = await database.connect();
    var o_id = new ObjectId(id.toString());
    return db.collection("User").deleteOne({"_id": o_id});
  }
}