import fs from "fs";
import path from "path";

const SCHEMA_FILENAME = path.join(__dirname, "schema.graphql");

export default fs.readFileSync(SCHEMA_FILENAME, "utf8");
