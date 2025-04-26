import { RequestHandler, Router } from "express";
import authenticationMiddleware from "../Middlewares/authenticationMiddleware";

const SoundScapeController = require('../Controllers/soundScapeController')

const router = Router()

router.post('/',authenticationMiddleware as RequestHandler,SoundScapeController.postSoundScape )
router.get('/', authenticationMiddleware as RequestHandler, SoundScapeController.getAllSavedMix)
router.get('/:id', authenticationMiddleware as RequestHandler, SoundScapeController.getMixById)
router.patch('/:id', authenticationMiddleware as RequestHandler, SoundScapeController.editMixById)
router.delete('/:id', authenticationMiddleware as RequestHandler, SoundScapeController.deleteMixById)

export default router