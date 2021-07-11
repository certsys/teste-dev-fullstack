const database = require("../src/db/database");
const { ObjectId } = require("mongodb");

module.exports = class PropertyRepository {
  static async getAll() {
    const db = await database.connect();
    return db.collection("Property").find().toArray();
  }
  
  static async getById(id) {
    const db = await database.connect();
    return db.collection("Property").findOne({ _id: ObjectId(id) });
  }

  static async getByTitle(title) {
    const db = await database.connect();
    return db.collection("Property").findOne({ title: title });
  }

  static async insert(json) {
    const db = await database.connect();
    return db.collection("Property").insertOne(json);
  }

  static async updateOne(newValue) {
    const db = await database.connect();
    var o_id = new ObjectId(newValue._id.toString());
    return db.collection("Property").replaceOne({"_id": o_id}, newValue);
  }

  static async removeById(id) {
    const db = await database.connect();
    var o_id = new ObjectId(id.toString());
    return db.collection("Property").deleteOne({"_id": o_id});
  }
}