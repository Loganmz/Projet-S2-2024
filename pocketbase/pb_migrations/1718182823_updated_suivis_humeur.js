/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yaq4693toboqtmz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tpk4isg3",
    "name": "image_humeur",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iefit8bw",
    "name": "date_humeur",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yaq4693toboqtmz")

  // remove
  collection.schema.removeField("tpk4isg3")

  // remove
  collection.schema.removeField("iefit8bw")

  return dao.saveCollection(collection)
})
