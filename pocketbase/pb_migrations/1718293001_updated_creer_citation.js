/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zdci9gykf6o4362")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9f8jd82a",
    "name": "creer",
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
  const collection = dao.findCollectionByNameOrId("zdci9gykf6o4362")

  // remove
  collection.schema.removeField("9f8jd82a")

  return dao.saveCollection(collection)
})
