/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zdci9gykf6o4362",
    "created": "2024-06-13 09:04:17.920Z",
    "updated": "2024-06-13 09:04:17.920Z",
    "name": "creer_citation",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0yphl9ge",
        "name": "quote_creer",
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
        "id": "6ley9j9n",
        "name": "author_creer",
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
        "id": "dokfyzi4",
        "name": "date_citation_creer",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zdci9gykf6o4362");

  return dao.deleteCollection(collection);
})
