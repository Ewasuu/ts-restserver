import { Request, Response } from 'express'

import Usuario from '../models/usuario'

export const getUsuarios = async( req: Request, res: Response ) => {

	const usuario = await Usuario.findAll()

	res.json(usuario)

}

export const getUsuario = async( req: Request, res: Response ) => {

	const { id } = req.params

	const usuario = await Usuario.findByPk(id)

 	if(!usuario){
 		return res.status(404).json({
 			msg: 'Usuario no encontrado'
 		})
 	}

	res.json(usuario)

}

export const postUsuario = async( req: Request, res: Response ) => {

	const { body } = req

	try{

		const existsOne = await Usuario.findOne({
			where: {
				email: body.email
			}
		})

		if(existsOne){
			return res.status(400).json({
				msg: 'El email ya tiene una cuenta registrada'
			})
		}

		console.log('alla cayo')
		const usuario = new Usuario(body)
		await usuario.save()

		res.status(201).json(usuario)

	} catch(error){
		res.status(500).json({
			msg: 'Error del servidor'
		})
	}

}

export const putUsuario = async( req: Request, res: Response ) => {

	const { id } = req.params
	const { body } = req

	try{

		const usuario = await Usuario.findByPk(id)

		if(!usuario){
			return res.status(404).json({
				msg: 'No fue encontrado un usuario con ese ID'
			})
		}

		await usuario.update(body)
		res.json(usuario)

	} catch(error){
		res.status(500).json({
			msg: 'Error del servidor'
		})
	}

}

export const deleteUsuario = async( req: Request, res: Response ) => {

	const { id } = req.params

	try{

		const usuario = await Usuario.findByPk(id)

		if(!usuario){
			return res.status(404).json({
				msg: 'No fue encontrado un usuario con ese ID'
			})
		}

		await usuario.update({ estado: false })

		res.json(usuario)

	} catch(error){
		res.status(500).json({
			msg: 'Error del servidor'
		})
	}

}