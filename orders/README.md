# nms-Ticketing - Orders Service

- Create order for a ticket
- Get an order by id
- Get all orders
- Cancel an order
- Publish event on order creation/cancel and ticket update to lock the ticket from edits
- Listen to event on ticket creation/update and order expiration

### API Endpoints

| ENDPOINT                                  | DESCRIPTION                       |
| ----------------------------------------- | --------------------------------- |
| [GET /api/orders](#get-apiorders)         | Get all orders for current user   |
| [GET /api/orders/id](#get-apiordersid)    | Get orders by id fro current user |
| [DELETE /api/orders/id](#put-apiordersid) | update order status to cancelled  |
| [POST /api/orders](#post-apiorders)       | Create new order for a ticket     |

#### GET /api/orders

_**Description**: Gets all orders_.

Response body:

```json
[
  {
    "status": "created",
    "userId": "5ebe813b1537b700233d2896",
    "expiresAt": "2020-05-15T12:12:29.701Z",
    "ticket": {
      "title": "Parte after Parte",
      "price": 1,
      "version": 1,
      "id": "5ebe82043fbbbc0018dcd1c8"
    },
    "version": 0,
    "id": "5ebe83a96da838001974592a"
  }
]
```

#### GET /api/orders/id

_**Description**: Get order by id_.

Response body:

```json
{
  "status": "created",
  "userId": "5ebe813b1537b700233d2896",
  "expiresAt": "2020-05-15T12:12:29.701Z",
  "ticket": {
    "title": "Parte after Parte",
    "price": 1,
    "version": 2,
    "id": "5ebe82043fbbbc0018dcd1c8"
  },
  "version": 0,
  "id": "5ebe83a96da838001974592a"
}
```

#### DELETE /api/orders/id

_**Description**: Cancel and order, publish event of order cancelled and ticket updated to unlock ticket_.

Response body:

```json
{
  "status": "cancelled",
  "userId": "5ebe813b1537b700233d2896",
  "expiresAt": "2020-05-15T12:12:29.701Z",
  "ticket": {
    "title": "Parte after Parte",
    "price": 1,
    "version": 2,
    "id": "5ebe82043fbbbc0018dcd1c8"
  },
  "version": 1,
  "id": "5ebe83a96da838001974592a"
}
```

#### POST /api/orders

_**Description**: Create new order for a ticket and publishes an event of order created and ticket updated_.

Request body:

```json
{
  "ticketId": "5ebe82043fbbbc0018dcd1c8"
}
```

Response body:

```json
{
  "status": "created",
  "userId": "5ebe813b1537b700233d2896",
  "expiresAt": "2020-05-15T12:12:29.701Z",
  "ticket": {
    "title": "Parte after Parte",
    "price": 1,
    "version": 1,
    "id": "5ebe82043fbbbc0018dcd1c8"
  },
  "version": 0,
  "id": "5ebe83a96da838001974592a"
}
```
