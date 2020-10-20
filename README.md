# Borrowly

Peer-to-peer app for borrowing/lending things, built with MERN stack. Client side single-page app uses
react-router-dom for rendering views and axios for sending requests. REST API configured with Express, routes respond with JSON data retrieved from MongoDB. Google maps JavaScript API (no intermediary packages) used for interactive map instances and geocoding. Best practices used for component lifecycles, managing state, and graceful error handling.

Views (react-router-dom routes)

```
App                     GET user
/                       Home
/auth/sign-in           POST sign-in
/auth/sign-up           POST sign-up
/things/list            GET things
/things/create          POST thing
/things/:id             GET/DELETE thing/POST borrow
/things/:id/edit        PATCH thing
/profile                PATCH user
/profile/borrows        GET/PATCH/DELETE borrows
/profile/things         GET/DELETE things
/profile/history        GET borrows
```

Routes (REST API endpoints)

```
/auth/sign-in           POST sign-in
/auth/sign-up           POST sign-up
/auth/sign-out          POST sign-out
/things/my              GET things
/things/list            GET things
/things/delete          DELETE thing
/things/:id/edit        PACTH thing
/things/:id             GET thing
/things/create          POST thing
/borrows/my             GET users active borrows
/borrows/history        GET users closed borrows
/borrows/create         POST new borrow
/borrows/approve        PATCH borrow
/borrows/end            PATCH borrow
```

Models

Standard User Model + "favors" property (Number, default 1)

Thing Model

```
owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
category: String,
name: String,
description: {
  type: String,
  max: 280
},
photoUrl: String,
location: {
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [],
    max: 180,
    min: -180
  }
},
available: {
  type: Boolean,
  default: true
}
```

Borrow Model

```
lender: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
borrower: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
thing: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Thing"
},
active: {
  type: Boolean,
  default: false
},
closed: {
  type: Boolean,
  default: false
}
```

Bugs:

- mobile not loading data for some reason
- mobile map views display bad
- 404 page not showing with invalid route
- approve route nodemailer crashes app (maybe)
