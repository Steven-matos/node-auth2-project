const db = require("../data/dbConfig");

module.exports = {
  add,
  get,
  getBy,
  getById
};

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return getById(id);
}

function get() {
  return db("users").select("id", "username");
}

function getBy(filter) {
  return db("users").where(filter);
}

function getById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}
