/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yaq4693toboqtmz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pskedpek",
    "name": "suit",
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
  const collection = dao.findCollectionByNameOrId("yaq4693toboqtmz")

  // remove
  collection.schema.removeField("pskedpek")

  return dao.saveCollection(collection)
})
