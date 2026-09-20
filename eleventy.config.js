// Build configuration for intelligentsystemscharter.org.
// The canonical texts live at the repository root and are never edited for the site.
// Everything web-related lives in site/.
const { md } = require("./site/_lib/markdown.js");

module.exports = function (cfg) {
  cfg.setLibrary("md", md);
  cfg.addPassthroughCopy({ "site/assets": "assets" });
  cfg.addPassthroughCopy({
    "LICENSE": "license/charter-cc-by-4.0.txt",
    "proposal/LICENSE": "license/proposal-apache-2.0.txt",
  });
  cfg.addWatchTarget("./*.md");
  cfg.addWatchTarget("./essays/");
  cfg.addWatchTarget("./proposal/");
  return {
    dir: { input: "site", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
