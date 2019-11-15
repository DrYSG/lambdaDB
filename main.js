console.log(`PostgreSQL GET Function`)

const { Client } = require('pg')

const local = {
    user: "postgres",
    host: "localhost",
    database: "m3_db",
    password: "yechezkal",
    port: 5432
}

const rds = {
    user: "postgres",
    host: "ysgdb.cxeokcheapqj.us-east-2.rds.amazonaws.com",
    database: "ysgdb",
    password: "yechezkal",
    port: 5432
}


async function query(q, client) {
    const client = await pool.connect()
    let res
    try {
        await client.query('BEGIN')
        try {
            res = await client.query(q)
            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.release()
    }
    return res
}

exports.handler = async (event, context, cb) => {
    const c = local
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
    }
    client.end();
}

exports.handler2 = async (event, context, callback) => {
    try {
        const { rows } = await query("select * from pg_tables")
        console.log(JSON.stringify(rows[0]))
        var response = {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(rows),
            "isBase64Encoded": false
        };
        callback(null, response);
    } catch (err) {
        console.log('Database ' + err)
        callback(null, 'Database ' + err);
    }
}

if (process.env.USERNAME == 'ysg4206') {
    this.handler(null, null, null)
  } 