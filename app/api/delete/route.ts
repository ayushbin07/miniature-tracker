import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
  "info": {
    "_postman_id": "d7e0d4d2-5baf-4d3a-b67f-vimars-habits",
    "name": "Vimars Habits",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "_exporter_id": "vimars"
  },
  "item": [
    {
      "name": "Get All Habits",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/habits",
          "host": ["{{base_url}}"],
          "path": ["api", "habits"]
        }
      },
      "response": []
    },
    {
      "name": "Create Habit",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Drink Water\",\n  \"type\": \"HEALTH\",\n  \"frequency\": \"DAILY\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "{{base_url}}/api/habits",
          "host": ["{{base_url}}"],
          "path": ["api", "habits"]
        }
      },
      "response": []
    },
    {
      "name": "Get Habit",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/habits/{{habit_id}}",
          "host": ["{{base_url}}"],
          "path": ["api", "habits", "{{habit_id}}"]
        }
      },
      "response": []
    },
    {
      "name": "Update Habit",
      "request": {
        "method": "PATCH",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Read Book\",\n  \"type\": \"EDUCATION\",\n  \"frequency\": \"DAILY\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "{{base_url}}/api/habits/{{habit_id}}",
          "host": ["{{base_url}}"],
          "path": ["api", "habits", "{{habit_id}}"]
        }
      },
      "response": []
    },
    {
      "name": "Delete Habit",
      "request": {
        "method": "DELETE",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/habits/{{habit_id}}",
          "host": ["{{base_url}}"],
          "path": ["api", "habits", "{{habit_id}}"]
        }
      },
      "response": []
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000"
    },
    {
      "key": "habit_id",
      "value": "cmrczrj9t0001fnddb7i7unu2"
    }
  ]
}
  );
}