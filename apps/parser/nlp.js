import { NlpManager } from "node-nlp";

import { fetchAllPosts, upsertPosts } from "./controllers/helpers";

Array.range = function (n) {
  return Array.apply(null, Array(n)).map((x, i) => i);
};
Object.defineProperty(Array.prototype, "chunk", {
  value: function (n) {
    return Array.range(Math.ceil(this.length / n)).map((x, i) =>
      this.slice(i * n, i * n + n)
    );
  },
});

const manager = new NlpManager({ threshold: 0.6 });

const defineCategories = () => {
  [1, 2, 3, 4, 5, 6, 7, 8].forEach((num) => {
    manager.addNamedEntityText(
      "bedrooms",
      num,
      ["en"],
      [
        `${num} bedroom`,
        `${num}-bedroom`,
        `${num} bed`,
        `${num} br`,
        `${num} bd`,
        `${num}/`,
        `${num}bed`,
        `${num} beds`,
      ].concat(num === 1 ? ["a bedroom", "a room", "my room"] : [])
    );
    manager.addNamedEntityText(
      "bathrooms",
      num,
      ["en"],
      [
        `${num} bathroom`,
        `${num}-bathroom`,
        `${num} bath`,
        `${num} ba`,
        `${num}bath`,
        `${num} baths`,
        `${num} bedroom with ensuite`,
      ]
    );
  });
};

const getNumRooms = (mappedEntities, roomType) => {
  if (mappedEntities[roomType].length) {
    return mappedEntities[roomType].sort((a, b) => b.accuracy - a.accuracy)[0]
      .option;
  }
  return undefined;
};

const shouldBeFlagged = (mappedEntities) => {
  return (
    mappedEntities.bedrooms.length !== 1 ||
    mappedEntities.bathrooms.length !== 1
  );
};

const filterEntities = (post, entityType, minAccuracy) => {
  return post.entities.filter(
    ({ entity, accuracy }) =>
      entity.type === entityType && accuracy >= minAccuracy
  );
};

export const logEntities = async () => {
  defineCategories();

  const chunkedPosts = (await fetchAllPosts()).chunk(20);
  chunkedPosts.forEach(async (posts) => {
    const postData = await Promise.all(
      posts.map(async (post) => {
        return manager
          .extractEntities(
            "en",
            post.text.replace("\n", " ").toLocaleLowerCase()
          )
          .then((p) => {
            let flagged = false;
            let bathrooms;
            let bedrooms;

            const mappedEntities = {
              bathrooms: filterEntities(p, "bathrooms", 0.9),
              bedrooms: filterEntities(p, "bedrooms", 0.9),
            };

            flagged = shouldBeFlagged(mappedEntities);
            bedrooms = getNumRooms(mappedEntities, "bedrooms");
            bathrooms = getNumRooms(mappedEntities, "bathrooms");

            return {
              ...post._doc,
              bedrooms,
              bathrooms,
              flagged,
            };
          });
      })
    );
    await upsertPosts(postData);
  });
};
