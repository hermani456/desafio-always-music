const { Client } = require('pg')

const config = {
	user: 'postgres',
	host: 'localhost',
	database: 'estudiantes_db',
	password: 'pw456',
	port: 5432,
}
const client = new Client(config)

module.exports = client
