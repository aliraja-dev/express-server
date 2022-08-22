const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, uri) {
            // Verify we got a good "db" object
            if (uri) {
                _db = uri.db("AngularDB");
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    },
};
