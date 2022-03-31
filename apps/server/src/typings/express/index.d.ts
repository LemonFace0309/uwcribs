
import { initConnections } from "@src/server/context";

declare module 'express-serve-static-core' {
  interface Request {
    ctx?: ReturnType<typeof initConnections>;
  }
}
