console.log(`PostgreSQL GET Function`)

const { Client } = require('pg')

const azure = {
    user: "postgres@postdb",
    host: "postdb.postgres.database.azure.com",
    database: "postgres",
    password: "Yechezkal1",
    port: 5432,
    ssl: true
}

const handler = async (context, req) => {
    const c = azure // switch to local for localDB
    console.log(`azure credentials: ${JSON.stringify(c)}`)
    const client = new Client({
        user: c.user,
        host: c.host,
        database: c.database,
        password: c.password,
        port: c.port
    })
    try {
        console.log("Awaiting for DB connection")
        await client.connect();
        console.log(`DB connected`)
    } catch (err) {
        console.error(`DB Connect Failed: ${JSON.stringify(err)}`)
        context.res = {
            status: 400,
            body: err
        }
    }

    client.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.log('Database ' + err)
            context.res = {
                status: 400,
                body: err
            }
            client.end()
        } else {
            console.log(`response: ${JSON.stringify(res)}`)
            context.res = {
                status: 200,
                body: res
            }
            client.end()
        }
    })
}

module.exports = handler