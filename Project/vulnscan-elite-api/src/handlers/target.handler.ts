import { Request, Response } from "express";
import TargetModel from "../models/target.model";
import Target from "../types/Target";
import Joi from "joi";

const targetModel = new TargetModel()

export const getTargets = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.headers['x-user-id'] as string
		const offset = parseInt(req.query['index'] as string)
		if (isNaN(offset) || offset < 0) {
			res.status(400).json({ "error": "missing param offset or not valid" })
			return
		}
		const targets = await targetModel.index(userId, offset)
		res.status(200).json(targets)
	} catch (err) {
		console.error(err)
		res.status(500).json({ "error": "internal server error" })
	}
}

export const getTarget = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.headers['x-user-id'] as string;
		const targetId = req.params['id'] as string;

		const uuidSchema = Joi.string().guid({ version: 'uuidv4' });
		const validationResult = uuidSchema.validate(targetId);

		if (validationResult.error) {
			res.status(400).json({ error: 'Invalid targetId format' });
			return;
		}

		if (!targetId) {
			res.status(400).json({ error: 'Missing param id' });
			return;
		}

		const target = await targetModel.show(targetId, userId);

		if (target) {
			res.status(200).json(target);
		} else {
			res.status(404).json({ error: "Target not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
}



export const createTarget = async (req: Request, res: Response): Promise<void> => {
	try {
		const targetSchema = Joi.object({
			name: Joi.string().required(),
			value: Joi.array().items(Joi.string()).required(),
		});

		const validationResult = targetSchema.validate(req.body);

		if (validationResult.error) {
			res.status(400).json({ error: validationResult.error.message });
			return;
		}

		const newTarget: Target = {
			user_id: req.headers['x-user-id'] as string,
			name: req.body.name,
			value: req.body.value,
		};

		const createdTarget = await targetModel.create(newTarget);

		res.status(201).json(createdTarget);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
}

export const updateTarget = async (req: Request, res: Response): Promise<void> => {
	try {

		const targetSchema = Joi.object({
			id: Joi.string().guid({ version: 'uuidv4' }).required(),
			name: Joi.string().required(),
			value: Joi.array().items(Joi.string()).required(),
		});

		const validationResult = targetSchema.validate(req.body);

		if (validationResult.error) {
			res.status(400).json({ error: validationResult.error.message });
			return;
		}

		const updatedTarget: Target = {
			id: req.params.id,
			user_id: req.headers['x-user-id'] as string,
			name: req.body.name,
			value: req.body.value,
		};

		const result = await targetModel.update(updatedTarget);

		if (result) {
			res.status(200).json(updatedTarget);
		} else {
			res.status(404).json({ error: "Target not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
};
export const deleteTarget = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId = req.headers['x-user-id'] as string;
		const targetId = req.query['id'] as string;

		const uuidSchema = Joi.string().guid({ version: 'uuidv4' });
		const validationResult = uuidSchema.validate(targetId);

		if (validationResult.error) {
			res.status(400).json({ error: 'Invalid targetId format' });
			return;
		}

		if (!targetId) {
			res.status(400).json({ error: 'Missing param id' });
			return;
		}

		const target = await targetModel.delete(targetId, userId);

		if (target) {
			res.status(200).json(target);
		} else {
			res.status(404).json({ error: "Target not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
}



