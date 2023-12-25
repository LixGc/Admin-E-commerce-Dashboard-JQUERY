# Restaurant API Documentation

## Endpoints :

List of available endpoints:

- `POST /cuisines`
- `POST /login`
- `GET /cuisines`
- `DELETE /movies/:id`

&nbsp;

## 1. POST /cuisines

Description

> add cuisine to database

### Request

- Headers

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

201 - Created

```json
{
  "message": "Cuisine Felix3 succesfully added!"
}
```
