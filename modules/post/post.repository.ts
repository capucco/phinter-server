import { db } from 'lib';

import { TCreatePostDto } from './post.dto';

export const getPostListQuery = () =>
  db.select().table('post').orderBy('creationDate', 'desc').as('posts');

export const getPostWithIdListQuery = (postId: string) =>
  db('post').select().where({ postId }).first();

export const createPostQuery = ({
  postId,
  mediaId,
  description,
  creatorAddress,
}: TCreatePostDto) =>
  db('post').insert({
    postId: db.raw(':postId', { postId }),
    mediaId: db.raw(':mediaId', { mediaId }),
    description: db.raw(':description', { description }),
    creatorAddress: db.raw(':creatorAddress', { creatorAddress }),
  });

export const increasePostRathingQuery = (postId: string, address: string) =>
  db('post')
    .where({ postId })
    .update({
      phintCount: db.raw('phintCount + 1'),
    })
    .then(() => db('post').select().where({ postId }).first());

export const decreasePostRathingQuery = (postId: string, address: string) =>
  db('post')
    .where({ postId })
    .update({
      phintCount: db.raw('phintCount - 1'),
    })
    .then(() => db('post').select().where({ postId }).first());
