const database = require("../src/db/database");
const { ObjectId } = require("mongodb");

module.exports = class PropertyRepository {
  static async getProperties(filter) {
    const db = await database.connect();
    let limit = 10;
    let properties = [];
    let totalItems = 0;

    let query = {};

    if (filter.uf) {
      query.uf = filter.uf;
    }

    if (filter.area) {
      query.area = filter.area
    }

    if (filter.price) {
      query.price = filter.price
    }

    properties = await db.collection("Property")
      .find(query)
      .limit(limit)
      .skip(filter.currentPage > 0 ? (filter.currentPage - 1) * limit : 0)
      .sort({ publicationDate: -1 })
      .toArray();

    totalItems = await db.collection("Property").find().count();

    return {
      properties: properties,
      totalItems: totalItems
    }
  }

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