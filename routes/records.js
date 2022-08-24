const express = require('express');

const router = express.Router();
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

//TEST ROUTE HOMEPAGE
router.route('/').get((req, res) => {
    res.send('Hello World');
});

// This section will help you get a list of all the posts.
router.route("/records").get(function (req, res) {
    let db_connect = dbo.getDb("AngularDB");
    db_connect
        .collection("posts")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a single record by id
router.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("posts")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
router.route("/record/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        // user: req.body.user,
        post: req.body.post,
        modified: new Date()
    };
    console.log(myobj);
    db_connect.collection("posts").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});
// This section will help you update a record by id.
router.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            user: req.body.user,
            post: req.body.post,
            modified: new Date(),
        },
    };
    db_connect
        .collection("posts")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// This section will help you delete a record
router.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("posts").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted", response.status);

        response.json(obj);
    });
});
module.exports = router;