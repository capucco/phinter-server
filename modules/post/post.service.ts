import { mintAndTransfer } from 'modules/contract/contract.service';

import {
  createPostQuery,
  getPostListQuery,
  increasePostRathingQuery,
} from './post.repository';

export const createPost = async (
  postId: string,
  mediaId: string,
  description: string,
  creatorAddress: string
) => {
  try {
    await createPostQuery({ postId, mediaId, description, creatorAddress });
    mintAndTransfer(10, creatorAddress);

    return true;
  } catch (e) {
    return false;
  }
};

export const getPostList = async () => {
  const posts = await getPostListQuery();

  return JSON.stringify(posts);
};

export const increasePostRathing = async (postId: string, address: string) => {
  const post = await increasePostRathingQuery(postId, address);
  mintAndTransfer(1, post.creatorAddress);

  return JSON.stringify(post);
};
