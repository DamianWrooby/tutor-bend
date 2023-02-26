import { Client } from 'pg';

var conString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mel.db.elephantsql.com/${process.env.DB_USER}`;
var client = new Client(conString);
client.connect(function (err) {
    if (err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function (err, result) {
        if (err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        client.end();
    });
});
