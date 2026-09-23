// A short fingerprint of the stylesheet, added to its address so browsers fetch
// a fresh copy whenever it changes instead of reusing a stale one from cache.
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

module.exports = function () {
  const css = fs.readFileSync(path.join(__dirname, "..", "assets", "style.css"));
  return crypto.createHash("sha256").update(css).digest("hex").slice(0, 10);
};
