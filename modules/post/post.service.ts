import { mintAndTransfer } from 'modules/contract/contract.service';

import {
  createPostQuery,
  getPostListQuery,
  getPostWithIdQuery,
  increasePostRathingQuery,
} from './post.repository';

export const createPost = async (
  postId: string,
  mediaId: string,
  header: string,
  description: string,
  creatorAddress: string
) => {
  let reward = 10;

  if (header) reward += 1;
  if (description) reward += 5;

  try {
    await createPostQuery({
      postId,
      mediaId,
      header,
      description,
      creatorAddress,
    });
    mintAndTransfer(reward, creatorAddress);

    return true;
  } catch (e) {
    return false;
  }
};

export const getPost = async (postId: string) => {
  const post = await getPostWithIdQuery(postId);

  return JSON.stringify(post);
};

export const getPostList = async (limit: string, offset: string) => {
  const posts = await getPostListQuery(limit, offset);
  console.log(posts)

  return JSON.stringify(posts);
};

export const increasePostRathing = async (postId: string, address: string) => {
  const post = await increasePostRathingQuery(postId, address);
  mintAndTransfer(0.02, post.creatorAddress);

  return JSON.stringify(post);
};
