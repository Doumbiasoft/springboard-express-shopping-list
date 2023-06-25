const express = require('express');
const app = express();
const ExpressError = require('./ExpressError');
const shopRouters = require('./routes/shop/route');

app.use(express.json());
app.use("/api/v1/shop", shopRouters);



// 404 handler
app.use((req, res, next)=> {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});
// generic error handler
app.use((err, req, res, next)=> {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;

    // set the status and alert the user
    return res.sendStatus(status).json({
        error: {message, status}
    });
});
// end generic handler

module.exports = app;