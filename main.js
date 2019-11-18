console.log(`PostgreSQL GET Function`)

const { Client } = require('pg')

const local = {
    user: "postgres",
    host: "localhost",
    database: "m3_db",
    password: "yechezkal",
    port: 5432
}

const aws = {
    user: "postgres",
    host: "ysgdb.cxeokcheapqj.us-east-2.rds.amazonaws.com",
    database: "ysgdb",
    password: "yechezkal",
    port: 5432
}

exports.handler = async (event, context, callback) => {
    const c = aws
    let respose = {}
    console.log(`aws credentials: ${JSON.stringify(c)}`)
    const client = new Client({
        user: c.user,
        host: c.host,
        database: c.database,
        password: c.password,
        port: c.port
    });
    try {
        await client.connect();
        console.log(`DB connected`)
    } catch (err) {
        console.error(`DB Connect Failed: ${JSON.stringify(err)}`)
       response = {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(err),
            "isBase64Encoded": false
        }
        callback(null, JSON.stringify(response))
    }

    client.query('SELECT NOW()', (err, res) => {
        response = {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(res),
            "isBase64Encoded": false
        }
        if (err) {
            console.log('Database ' + err)
            callback(null, 'Database ' + err)
            response = {
                "statusCode": 500,
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            }
        } else {
            callback(null, JSON.stringify(response))
        }
        client.end()
    })
}


if (process.env.USERNAME == 'ysg4206') {
    this.handler(null, null, (_, txt) => {console.log(`callback: ${txt}`)})
} 