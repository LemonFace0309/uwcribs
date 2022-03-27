
import { initConnections } from "@src/server/connections";

declare module 'express-serve-static-core' {
  interface Request {
    ctx?: ReturnType<typeof initConnections>;
  }
}
