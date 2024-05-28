/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jtij0pzsoihz6di")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uwhosg3d",
    "name": "lit",
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
  const collection = dao.findCollectionByNameOrId("jtij0pzsoihz6di")

  // remove
  collection.schema.removeField("uwhosg3d")

  return dao.saveCollection(collection)
})
