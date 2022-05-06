import { NlpManager } from "node-nlp";

import { fetchAllPosts, upsertPosts } from "./controllers/helpers";

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

  manager.addNamedEntityText(
    "genderRestriction",
    "male",
    ["en"],
    [" male only", " men only", " male unit", "all male", "only men"]
  );

  manager.addNamedEntityText(
    "genderRestriction",
    "female",
    ["en"],
    [
      " female only",
      " girls only",
      " female unit",
      "girls unit",
      "all female",
      "only girls",
    ]
  );

  manager.addNamedEntityText(
    "building",
    "icon",
    ["en"],
    ["ICON", "330 Phillip"]
  );

  manager.addNamedEntityText(
    "building",
    "rezOne",
    ["en"],
    [
      "RezOne",
      "Rez-One",
      "Rez One",
      "252 Phillip",
      "250 Phillip",
      "254 Phillip",
      "256 Phillip",
      "Elora House",
      "Hespeler House",
      "Fergus House",
      "Blair House",
    ]
  );

  manager.addNamedEntityText(
    "building",
    "icon",
    ["en"],
    ["ICON", "330 Phillip"]
  );

  manager.addNamedEntityText(
    "amenities",
    "wifi",
    ["en"],
    ["Wi-Fi included", "wifi included", "internet included"]
  );

  manager.addNamedEntityText("amenities", "gym", ["en"], ["Gym", "gymnasium"]);

  manager.addNamedEntityText(
    "amenities",
    "utilities",
    ["en"],
    ["utilities included", "hydro included"]
  );
};

const getPostFieldValue = (mappedEntities, field, isMultiple) => {
  if (mappedEntities[field].length) {
    const values = getValueFromEntity(
      mappedEntities[field].sort((a, b) => b.accuracy - a.accuracy),
      field
    );
    return values ? (isMultiple ? values : values[0]) : undefined;
  }

  return undefined;
};

const sanitizePPP = (ppp, beds) => {
  if (!ppp || ppp < 100 || ppp > 8000) {
    return 0;
  }
  if (beds > 1 && ppp > 1600 + 100 * (2 - beds)) {
    return ppp / (beds || 1);
  }
  return ppp;
};

const shouldBeFlagged = (mappedEntities) => {
  return (
    mappedEntities.bedrooms.length !== 1 ||
    mappedEntities.bathrooms.length !== 1 ||
    mappedEntities.ppp.length !== 1 ||
    mappedEntities.genderRestriction.length !== 1
  );
};

const filterEntities = (post, entityType, minAccuracy) => {
  return post.entities.filter(
    ({ entity, accuracy }) => entity === entityType && accuracy >= minAccuracy
  );
};

const getValueFromEntity = (entity, type) => {
  switch (type) {
    case "ppp":
      return entity.resolution.value;
    default:
      return entity.option;
  }
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
            if (post._doc.confirmed) {
              return post._doc;
            }

            let flagged = false;
            let bathrooms;
            let bedrooms;
            let ppp;
            let genderRestriction;
            let building;

            let amenities;
            const mappedEntities = {
              bathrooms: filterEntities(p, "bathrooms", 0.9),
              bedrooms: filterEntities(p, "bedrooms", 0.9),
              ppp: filterEntities(p, "currency", 0.9),
              genderRestriction: filterEntities(p, "genderRestriction", 0.9),
              building: filterEntities(p, "building", 0.9),
              amenities: filterEntities(p, "amenities", 0.8),
            };

            flagged = shouldBeFlagged(mappedEntities);
            bedrooms = getPostFieldValue(mappedEntities, "bedrooms");
            bathrooms = getPostFieldValue(mappedEntities, "bathrooms");
            ppp = sanitizePPP(getPostFieldValue(mappedEntities, "ppp"));
            genderRestriction = getPostFieldValue(
              mappedEntities,
              "genderRestriction"
            );
            building = getPostFieldValue(mappedEntities, "building");
            amenities = getPostFieldValue(mappedEntities, "amenities", true);

            return {
              ...post._doc,
              availableBeds: bedrooms,
              totalBeds: bedrooms,
              baths: bathrooms,
              ppp,
              genderRestriction: genderRestriction || "coed",
              building: building || "other",
              flagged,
              amenities: (amenities || []).filter(
                (value, index, self) => self.indexOf(value) === index
              ),
            };
          });
      })
    );
    await upsertPosts(postData);
  });
};
