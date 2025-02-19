import { Router } from 'express';
import { BlogController } from './blog.controller';

const router = Router();
const blogController = new BlogController();

// Blog routes will be added here
router.get('/', blogController.getAllPosts);

export { router as blogRouter };