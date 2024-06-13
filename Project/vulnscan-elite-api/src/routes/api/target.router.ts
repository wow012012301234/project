import { Router } from 'express'
import validateTokenMiddleware from '../../middlewares/authentication.middleware'
import { getTargets, getTarget, createTarget, updateTarget, deleteTarget } from "../../handlers/target.handler"

const targetRouter: Router = Router()

targetRouter.get("/", validateTokenMiddleware, getTargets)
targetRouter.post("/", validateTokenMiddleware, createTarget)
targetRouter.get("/:id", validateTokenMiddleware, getTarget)
targetRouter.put("/:id", validateTokenMiddleware, updateTarget)
targetRouter.delete("/:id", validateTokenMiddleware, deleteTarget)


export default targetRouter
