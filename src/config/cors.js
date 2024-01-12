const allowlist = ["http://localhost:3000", "http://localhost:8000", "https://onlyfansfinder-ai.vercel.app"];

const corsOptions = {
  credentials: true,
  exposedHeaders: ["WWW-Authenticate"],
  // origin: function (origin, callback) {
  //   if (allowlist.includes(origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // }
};

module.exports = corsOptions;
