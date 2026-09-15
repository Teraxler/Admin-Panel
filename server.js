const next = require("next");
const expressApp = require("./server/app.js");
const dotenv = require("dotenv");
const sql = require("mssql");

const isDevMode = process.env.NODE_ENV !== "production";

dotenv.config({
  path: isDevMode ? ".env" : ".env.production",
});
const port = process.env.PORT || 3000;

// Next.js
const nextApp = next({ dev: isDevMode });
const handle = nextApp.getRequestHandler();

// DB
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    encrypt: false,
    trustServerCertificate: true,
  },
  port: Number(process.env.DB_PORT),
};

const dbPool = new sql.ConnectionPool(dbConfig);

async function startServer() {
  try {
    await dbPool.connect();

    console.log("✅ Connected to Database!");
    expressApp.locals.db = dbPool;

    await nextApp.prepare();

    expressApp.use("/", (req, res) => {
      return handle(req, res);
    });

    expressApp.listen(port, () => {
      console.log(`> Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
}

startServer();
