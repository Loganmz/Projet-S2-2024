/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "k0iw35036lqwdma",
    "created": "2024-05-28 09:12:16.500Z",
    "updated": "2024-05-28 09:12:16.500Z",
    "name": "Relaxation",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
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
  const collection = dao.findCollectionByNameOrId("k0iw35036lqwdma");

  return dao.deleteCollection(collection);
})
