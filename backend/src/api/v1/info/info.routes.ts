import { Router } from 'express';
import { InfoController } from './info.controller';

const router = Router();
const infoController = new InfoController();

router.get('/hello', infoController.getHello);
router.get('/version', infoController.getVersion);

export { router as infoRouter };