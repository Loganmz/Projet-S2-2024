/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("79yzypqwu0gf4w6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "58x67dut",
    "name": "description",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("79yzypqwu0gf4w6")

  // remove
  collection.schema.removeField("58x67dut")

  return dao.saveCollection(collection)
})
