import { Router } from 'express';

import { post } from './post';
import { authentication } from './authentication';

const router = Router();

router.use('/post', post);
router.use('/authentication', authentication);

export { router };
