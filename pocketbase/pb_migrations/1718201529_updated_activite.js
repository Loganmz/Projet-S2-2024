/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("79yzypqwu0gf4w6")

  // remove
  collection.schema.removeField("mglhclcy")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("79yzypqwu0gf4w6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mglhclcy",
    "name": "lien_page",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
})
