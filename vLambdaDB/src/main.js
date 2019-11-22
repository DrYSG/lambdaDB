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
    host: "apollodb.cxeokcheapqj.us-east-2.rds.amazonaws.com",
    database: "apollodb",
    password: "yechezkal",
    port: 5432
}

let response = {
    "statusCode": 200,
    "headers": {
        "Content-Type": "application/json"
    },
    "body": 'none',
    "isBase64Encoded": false
}

exports.handler = async (event, context, callback) => {
    const c = aws // switch to local for localDB
    console.log(`aws credentials: ${JSON.stringify(c)}`)
    const client = new Client({
        user: c.user,
        host: c.host,
        database: c.database,
        password: c.password,
        port: c.port
    })
    try {
        await client.connect();
        console.log(`DB connected`)
    } catch (err) {
        console.error(`DB Connect Failed: ${JSON.stringify(err)}`)
        response.body = err
        callback(null, response)
    }

    client.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.log('Database ' + err)
            response.body = err
            callback(null, response)
            client.end()
        } else {
            response.body = res
            console.log(`response: ${JSON.stringify(res)}`)
            callback(null, response)
            client.end()
        }
    })
}


if (process.env.USERNAME == 'ysg4206') {
    this.handler(null, null, (_, txt) => {console.log(`callback: ${JSON.stringify(txt)}`)})
} 