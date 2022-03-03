import { Sequelize } from 'sequelize'


const db = new Sequelize('curso-node', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
})

export default db