/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m54u9zo33xgvuce")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7leglohn",
    "name": "possede",
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
  const collection = dao.findCollectionByNameOrId("m54u9zo33xgvuce")

  // remove
  collection.schema.removeField("7leglohn")

  return dao.saveCollection(collection)
})
