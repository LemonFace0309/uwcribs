import { initServer } from "@src/server/initServer";

try {
  initServer();
} catch (err) {
  console.error(err);
}
