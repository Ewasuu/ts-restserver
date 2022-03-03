import dotenv from 'dotenv'
import Server from './models/server'

const server = new Server()

dotenv.config()
server.listen()