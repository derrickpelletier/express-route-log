# Express route log

`npm install express-route-log`

Use to log your Express.js app routes. Nice in a dev environment, just for sanity check or whatever.

Have had the script kicking around for a while in a few projects so just getting it out there.

Supports standard route structures, nested routers, etc. Just require it in after your routes have been defined.

Optional second param is a function to use in place of `console.log`.

## Usage

```javascript

const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  //...
});

app.get('/pageOne', (req, res, next) => {
  //...
});

app.post('/pageTwo', (req, res, next) => {
  //...
});

require('express-route-log')(app);

// prints out the following:

/*
Routes:
GET /
GET /pageOne
POST /pageTwo
*/
```

## Example output

![](https://d17oy1vhnax1f7.cloudfront.net/items/2u2Q2B1c192F271S0o35/Image%202016-08-27%20at%2012.37.22%20PM.png)
