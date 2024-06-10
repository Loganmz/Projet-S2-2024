/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("79yzypqwu0gf4w6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "olvgx04k",
    "name": "recommandation",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("79yzypqwu0gf4w6")

  // remove
  collection.schema.removeField("olvgx04k")

  return dao.saveCollection(collection)
})
