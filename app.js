const client = require('./db')
const { funcion, rut, nombre, curso, nivel } = require('./argv')

// Crear una función asíncrona para registrar un nuevo estudiante en la base de datos
async function registrarEstudiante() {
	client.connect()
	const res = await client.query(
		'insert into estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;',
		[nombre, rut, curso, nivel]
	)
	console.log('estudiante agregado:', res.rows[0])
	client.end()
}

// Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
async function estudianteRut() {
   client.connect()
	const res = await client.query('SELECT * FROM estudiantes WHERE rut = $1', [
		rut,
	])
	console.log('Estudiante: ', res.rows)
	client.end()
}

// Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
async function todosEstudiantes() {
   client.connect()
	const res = await client.query('SELECT * FROM estudiantes')
	console.log('Estudiantes: ', res.rows)
	client.end()
}

// Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
async function actualizarEstudiante() {
   client.connect()
	const res = await client.query(
		'UPDATE estudiantes SET rut = $2 , nombre = $1, curso = $3, nivel = $4 WHERE rut = $2 RETURNING *;',
		[nombre, rut, curso, nivel]
	)
	console.log('Registro del Estuadiante modificado', res.rows[0])
	client.end()
}

// Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
const eliminarEstudiante = async () => {
   client.connect()
	const res = await client.query(
		'DELETE FROM estudiantes WHERE rut = $1 RETURNING *',
		[rut]
	)
	console.log('Registro del Estudiante eliminado', res.rows[0])
	client.end()
}

if (funcion === 'nuevo') {
	registrarEstudiante()
} else if (funcion === 'rut') {
	estudianteRut()
} else if (funcion === 'todos') {
	todosEstudiantes()
} else if (funcion === 'actualizar') {
	actualizarEstudiante()
} else if (funcion === 'eliminar') {
	eliminarEstudiante()
}
