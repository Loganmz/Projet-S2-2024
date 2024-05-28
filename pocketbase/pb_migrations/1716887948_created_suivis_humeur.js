/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "yaq4693toboqtmz",
    "created": "2024-05-28 09:19:08.121Z",
    "updated": "2024-05-28 09:19:08.121Z",
    "name": "suivis_humeur",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ginfqgbi",
        "name": "humeur",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "super bien",
            "bien",
            "cela pourrait être mieux",
            "pas bien"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("yaq4693toboqtmz");

  return dao.deleteCollection(collection);
})
