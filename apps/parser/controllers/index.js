import {
  checkIfPostStillExists,
  clickAllElementsBySelector,
  fetchAllPosts,
  generateStoryArray,
  getAllGroups,
  getAllPosts,
  upsertPosts,
  visitFacebookGroupById,
  writePageSourceToFile,
} from "./helpers";

import { driver } from "../driver";

export const writeFacebookGroupPageSourceById = async (req, res) => {
  const { groupId } = req.params;
  try {
    let stories = [];
    await visitFacebookGroupById(driver, groupId);
    await clickAllElementsBySelector(driver, 'span[data-sigil="more"]');
    stories = await generateStoryArray(driver);
    await writePageSourceToFile(
      driver,
      `./_extractions/${groupId}/`,
      `${Date.now()}.txt`
    );
    res.status(200).json(stories.map((s) => ({ ...s, groupId })));
  } finally {
    // await driver.quit();
  }
};

export const createFacebookGroupStoriesById = async (req, res) => {
  const { groupId: id } = req.params;
  try {
    const { stories, groupId } = await getAllPosts(driver, id);
    const posts = await upsertPosts(stories.map((s) => ({ ...s, groupId })));
    res.status(200).json(posts);
  } finally {
    // await driver.quit();
  }
};

const generateFBPermalink = (post, group) => {
  return `https://m.facebook.com/groups/${group.id}/permalink/${post.id}`;
};

export const createOrUpdateAllFacebookGroupStories = async (req, res) => {
  try {
    const result = [];
    const groups = await getAllGroups();
    const promises = groups.map((g) => async () => {
      const { stories, groupId } = await getAllPosts(driver, g.id);
      const upserted = await upsertPosts(
        stories.map((s) => ({
          ...s,
          groupId,
          fbLink: generateFBPermalink(s, g),
        }))
      );
      result.push(upserted);
      return upserted;
    });
    await promises.reduce(
      (p, c) => p.then((r) => c().then(Array.prototype.concat.bind(r))),
      Promise.resolve([])
    );
    res.status(200).json(result);
  } finally {
    // await driver.quit();
  }
};

export const returnAllPosts = async (req, res) => {
  res.status(200).json(await fetchAllPosts());
};

export const updateAllPosts = async (req, res) => {
  const posts = (await fetchAllPosts()).chunk(20);
  let updatedPosts = [];
  const results = [];
  let post;
  for (let i = 0; i < posts.length; i++) {
    for (let j = 0; j < posts[i].length; j++) {
      post = await checkIfPostStillExists(driver, posts[i][j]._doc);
      if (!post.isAvailable) continue;
      if (!post) {
        updatedPosts.push({ ...posts[i][j]._doc, isAvailable: false });
      } else {
        updatedPosts.push(post);
      }
      driver.sleep(2000);
    }
    results.push(await upsertPosts(updatedPosts));
  }
  res.status(200).json(results);
};
