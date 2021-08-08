import { db } from 'lib';

import { TCreatePostDto } from './post.dto';

export const getPostListQuery = (limit: string, offset: string) =>
  db('post')
    .select()
    .offset(Number(offset))
    .limit(Number(limit))
    .orderBy('creationDate', 'desc')
    .as('posts');

export const getPostWithIdQuery = (postId: string) =>
  db('post').select().where({ postId }).first();

export const createPostQuery = ({
  postId,
  mediaId,
  header,
  description,
  creatorAddress,
}: TCreatePostDto) =>
  db('post').insert({
    postId: db.raw(':postId', { postId }),
    mediaId: db.raw(':mediaId', { mediaId }),
    header: db.raw(':header', { header }),
    description: db.raw(':description', { description }),
    creatorAddress: db.raw(':creatorAddress', { creatorAddress }),
  });

export const increasePostRathingQuery = (postId: string, address: string) =>
  db('post')
    .where({ postId })
    .update({
      phintCount: db.raw('phintCount + 0.02'),
    })
    .then(() => db('post').select().where({ postId }).first());

export const decreasePostRathingQuery = (postId: string, address: string) =>
  db('post')
    .where({ postId })
    .update({
      phintCount: db.raw('phintCount - 0.02'),
    })
    .then(() => db('post').select().where({ postId }).first());
