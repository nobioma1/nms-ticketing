# nms-Ticketing - Tickets Service

- Create Ticket
- View Ticket
- Get Tickets
- Update Ticket
- Publish event on ticket creation/update
- Listen to event on order creation/cancel

### API Endpoints

| ENDPOINT                                 | DESCRIPTION       |
| ---------------------------------------- | ----------------- |
| [GET /api/tickets](#get-apitickets)      | Get all tickets   |
| [GET /api/tickets/id](#get-apiticketsid) | Get Ticket by id  |
| [PUT /api/tickets/id](#put-apiticketsid) | update ticket     |
| [POST /api/tickets](#post-apitickets)    | Create new ticket |

#### GET /api/tickets

_**Description**: Gets all tickets_.

Response body:

```json
[
  {
    "title": "Parte after Parte",
    "price": 1,
    "userId": "5ebe813b1537b700233d2896",
    "version": 1,
    "id": "5ebe82043fbbbc0018dcd1c8"
  },
  {
    "title": "Some ticket",
    "price": 20,
    "userId": "5ebe813b1537b700233d2896",
    "version": 1,
    "id": "5ebe82043fbbbc0018dcd1c8"
  }
]
```

#### GET /api/tickets/id

_**Description**: Get ticket by id_.

Response body:

```json
{
  "title": "Parte after Parte",
  "price": 1,
  "userId": "5ebe813b1537b700233d2896",
  "version": 1,
  "id": "5ebe82043fbbbc0018dcd1c8"
}
```

#### PUT /api/tickets/id

_**Description**: Update ticket, publish an event of ticket updated_.

Request body:

```json
{
  "title": "Parte after Parte",
  "price": 20
}
```

Response body:

```json
{
  "title": "Parte after Parte",
  "price": 1,
  "userId": "5ebe813b1537b700233d2896",
  "version": 1,
  "id": "5ebe82043fbbbc0018dcd1c8"
}
```

#### POST /api/tickets

_**Description**: Create new ticket, publish an event of ticket Created_.

Request body:

```json
{
  "title": "Parte after Parte",
  "price": 20
}
```

Response body:

```json
{
  "title": "Parte after Parte",
  "price": 20,
  "userId": "5ebe813b1537b700233d2896",
  "version": 0,
  "id": "5ebe82043fbbbc0018dcd1c8"
}
```
