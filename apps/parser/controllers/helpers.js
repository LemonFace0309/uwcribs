import fs from "fs";
import { By, until } from "selenium-webdriver";

import { Group, Post } from "../models";

export const visitFacebookGroupById = async (driver, groupId) => {
  await driver.get(`https://mobile.facebook.com/groups/${groupId}`);
  await driver.wait(
    until.elementLocated(By.id(`m_group_stories_container`)),
    10000
  );
};

export const writePageSourceToFile = async (driver, dirName, filepath) => {
  const src = await driver.getPageSource();
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
  fs.writeFile(dirName + filepath, src);
};

export const clickAllElementsBySelector = async (driver, selector) => {
  const elements = await driver.findElements(By.css(selector));
  await Promise.all(elements.map((e) => e.click()));
};

export const generateStoryArray = async (driver) => {
  return (
    (await driver
      .findElements(By.css(".story_body_container"))
      .then(async (elements) => {
        return await Promise.all(
          elements.map(async (element) => {
            const id = await element.getAttribute("innerHTML").then((html) => {
              return (html.split("mf_story_key.")[1] || "%3A").split("%3A")[0];
            });
            const text = await element.getText().then((text) => {
              return text;
            });
            return { id, text };
          })
        );
      })) || []
  );
};

export const upsertPosts = async (posts) => {
  const result = await Post.bulkWrite(
    posts.map((p) => ({
      updateOne: {
        filter: { id: p.id },
        update: { ...p },
        upsert: true,
      },
    }))
  );
  return result;
};

export const insertGroupIfNotExists = async (groupId) => {
  let group = await Group.findOne({ where: { id: groupId } });
  if (!group) {
    group = await Group.create({ id: groupId });
  }
  return group._id;
};

export const getAllGroups = async () => {
  return await Group.find();
};

export const getAllPosts = async (driver, id) => {
  let stories = [];
  let groupId = await insertGroupIfNotExists(id);
  await visitFacebookGroupById(driver, id);
  stories = await generateStoryArray(driver);
  return { stories, groupId };
};

export const fetchAllPosts = async () => {
  return await Post.find({});
};

export const checkIfPostStillExists = async (driver, post) => {
  if (!post.fbLink) {
    return false;
  }
  try {
    await driver.get(post.fbLink);
    await driver.wait(
      until.elementLocated(By.css(`.story_body_container`)),
      1000
    );
    const author = await extractAuthor(driver);
    if (!author) return false;
    return { ...post, author };
  } catch (e) {
    return false;
  }
};

export const extractAuthor = async (driver) => {
  return await driver
    .findElement(By.css("header strong > a"))
    .then(async (element) => {
      return await element.getText().then((text) => {
        return text;
      });
    });
};
