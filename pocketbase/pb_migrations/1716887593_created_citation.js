/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jtij0pzsoihz6di",
    "created": "2024-05-28 09:13:13.529Z",
    "updated": "2024-05-28 09:13:13.529Z",
    "name": "citation",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "s51abkhf",
        "name": "citation",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "tgskvkbn",
        "name": "date_de_la_citation",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "miretvn2",
        "name": "nom_auteur",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("jtij0pzsoihz6di");

  return dao.deleteCollection(collection);
})
