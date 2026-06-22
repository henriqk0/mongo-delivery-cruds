# Prompt 3 — Debugging HTTP 500 Errors (MongoDB DNS Resolution)

## Prompt

Why do POST and GET requests to `/entregador/` return `500 Internal Server Error` with the error `dns.resolver.NXDOMAIN: The DNS query name does not exist: _mongodb._tcp.cluster.mongodb.net`, even though the request appears to have been created in Swagger?

**Requirements:**

- Understand why requests are failing.
- Identify the root cause.

## Response

The MongoDB URI in `db/mongodb.py` was a placeholder (`mongodb+srv://user:password@cluster.mongodb.net`). The DNS query for `_mongodb._tcp.cluster.mongodb.net` fails because `cluster.mongodb.net` is not a real MongoDB Atlas host. The requests in Swagger did not succeed — they returned HTTP 500 with the error in the response body.

**Key decisions:**

- The placeholder URI must be replaced with a real MongoDB Atlas connection string or a local MongoDB instance (`mongodb://localhost:27017`).

**Files affected:**

- `db/mongodb.py` (contains the hardcoded placeholder URI)
