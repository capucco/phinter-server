import fs from 'fs';

import redis from 'redis';
import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

import {
  createPost,
  getPost,
  getPostList,
  increasePostRathing,
} from './post.service';

const router = Router();
const redisClient = redis.createClient();
const storage = multer.diskStorage({
  destination: './assets/post/',
  filename: (req, file, cb) => {
    const mediaId = uuidv4();
    cb(null, mediaId);
  },
});
const upload = multer({ storage });

router.get('/list', async (req, res) => {
  const { limit, offset } = req.query;

  // validate query params

  const list = await getPostList(limit as string, offset as string);

  return res.status(200).end(list);
});

router.get('/:postId', async (req, res) => {
  const { postId } = req.params;

  const post = await getPost(postId);

  return res.status(200).end(post);
});

router.get('/:id/:mediaId', async (req, res) => {
  const { mediaId } = req.params;
  fs.readFile(`./assets/post/${mediaId}`, (error, data) => {
    if (error) throw error;
    return res.status(200).end(data);
  });
});

router.post('/', upload.single('media'), async (req, res, next) => {
  const { header, description, creatorAddress } = req.body;
  const postId = uuidv4();

  try {
    await createPost(
      postId,
      req.file.filename,
      header,
      description,
      creatorAddress
    );
    redisClient.publish('post', postId);

    return res.status(200).end();
  } catch (e) {
    return next(e);
  }
});

router.post('/:id/increase-rathing', async (req, res, next) => {
  const { id } = req.params;
  const { address } = req.body;

  try {
    const post = await increasePostRathing(id, address);

    return res.status(200).end(post);
  } catch (e) {
    return next(e);
  }
});

export default router;
