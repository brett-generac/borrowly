# Borrowly

Peer-to-peer app for borrowing/lending things, build with MERN stack. Client side single-page app uses
react-router-dom for rendering views and axios for sending requests. REST API configured with Express, routes respond with JSON data retrieved from MongoDB. Google maps JavaScript API (no intermediary packages) used for interactive map instances and geocoding. Best practices used for component lifecycles, managing state, and graceful error handling.

Models

Standard User Model + "favors" property

Thing Model

```
owner: {
type: mongoose.Schema.Types.ObjectId,
required: true,
ref: "User"
},
category: {
type: String,
required: true
},
name: {
type: String,
required: true
},
description: {
type: String,
required: true,
max: 280
},
photoUrl: {
type: String,
required: true
},
location: {
type: {
type: String,
default: "Point"
},
coordinates: {
type: [],
max: 180,
min: -180,
required: true
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
ref: "User",
required: true
},
borrower: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true
},
thing: {
type: mongoose.Schema.Types.ObjectId,
ref: "Thing",
required: true
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

Routes

Services

Views

Components
