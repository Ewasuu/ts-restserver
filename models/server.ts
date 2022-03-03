import express, { Application } from 'express'
import cors from 'cors'

import usuariosRouter from '../routes/usuarios'
import db from '../database/connection'

class Server{

	private app: Application;
	private port: string;
	private paths = {
		usuarios: '/api/usuarios'
	};


	constructor(){
		this.app = express();
		this.port = process.env.PORT || '8080';


		//Conectar base de datos
		this.dbConnenction()

		//Middlewares
		this.middlewares()

		//Rutas
		this.routes()

	}

	middlewares() {

		//cors
		this.app.use( cors() )

		//Servir contenido html
		this.app.use( express.static('public') )

		//Parser del body
		this.app.use( express.json() )

	}

	async dbConnenction() {
		try {

			await db.authenticate()
			console.log('Base de datos conectada')

		} catch(err) {

			throw err

		}
	}

	routes() {
		this.app.use( this.paths.usuarios, usuariosRouter )
	}

	listen() {
		this.app.listen( this.port, () => {
			console.log(`Servidor corriendo en el puerto ${this.port}`);
		} )
	}

}

export default Server