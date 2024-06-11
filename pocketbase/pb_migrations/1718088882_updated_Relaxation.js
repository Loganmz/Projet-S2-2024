/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k0iw35036lqwdma")

  collection.name = "todolist"

  // remove
  collection.schema.removeField("nm1eurmy")

  // remove
  collection.schema.removeField("t9k7a1do")

  // remove
  collection.schema.removeField("hyw2lcvj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uy6ankji",
    "name": "nom_activite",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vsfkdo1f",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ppizzbte",
    "name": "image_activite",
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
    "id": "oysl7jyg",
    "name": "duration",
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
  const collection = dao.findCollectionByNameOrId("k0iw35036lqwdma")

  collection.name = "Relaxation"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nm1eurmy",
    "name": "numero_de_la_seance_de_relaxation",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t9k7a1do",
    "name": "numero_de_la_seance_de_respiration",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

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

  // remove
  collection.schema.removeField("uy6ankji")

  // remove
  collection.schema.removeField("vsfkdo1f")

  // remove
  collection.schema.removeField("ppizzbte")

  // remove
  collection.schema.removeField("oysl7jyg")

  return dao.saveCollection(collection)
})
