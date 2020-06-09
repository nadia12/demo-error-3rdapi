# API DOCUMENTATION SAMPLE

# Method 2 (POST, GET)
# Semua endpoint yang ada di server

List Endpoints :
- `POST /todos`
- `GET /todos`

### POST /todos : routingnya
Request:
body : 

```json
{
    "title" : "membuat todo",
    "description" : "Membuat sebuah todo sederhana"
}
```

Response:

```json
{
    "id": 1,
    "title": "Belajar express",
    "description": "Mencoba membuat API menggunakan express",
    "createdAt": "2020-06-08T03:33:04.404Z",
    "updatedAt": "2020-06-08T03:33:04.404Z"
},
```

### GET /todos
Request:
body : 

Response:

```json
[
    {
        "id": 1,
        "title": "Belajar express",
        "description": "Mencoba membuat API menggunakan express",
        "createdAt": "2020-06-08T03:33:04.404Z",
        "updatedAt": "2020-06-08T03:33:04.404Z"
    },
    {
        "id": 2,
        "title": "Belajar express 2",
        "description": "Mencoba membuat API menggunakan express 2",
        "createdAt": "2020-06-08T03:34:16.913Z",
        "updatedAt": "2020-06-08T03:34:16.913Z"
    },
]
```