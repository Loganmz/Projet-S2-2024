/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k0iw35036lqwdma")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hyw2lcvj",
    "name": "participe_a",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k0iw35036lqwdma")

  // remove
  collection.schema.removeField("hyw2lcvj")

  return dao.saveCollection(collection)
})
