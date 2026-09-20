// Turns the canonical Markdown files at the repository root into site pages.
// Nothing here edits those files. The charter is published twice: once whole,
// and once split at its top-level headings so each part has its own address.
const fs = require("fs");
const path = require("path");
const { md, slugify } = require("../_lib/markdown.js");

const ROOT = path.join(__dirname, "..", "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

// Charter sections get short, memorable addresses.
const SECTION_SLUGS = [
  [/^Purpose/i, "purpose"],
  [/Declaration/i, "declaration"],
  [/Universal Principles/i, "principles"],
  [/Constitution/i, "constitution"],
  [/How it works/i, "how-it-works"],
  [/What makes this different/i, "what-makes-this-different"],
];
const sectionSlug = (title) => (SECTION_SLUGS.find(([re]) => re.test(title)) || [null, slugify(title)])[1];

const firstHeading = (text) => (text.match(/^#\s+(.+)$/m) || [null, "Untitled"])[1].trim();
const stripTags = (html) => html.replace(/<[^>]+>/g, "").replace(/\u00A7/g, "").trim();

const essayFiles = fs.readdirSync(path.join(ROOT, "essays")).filter((f) => f.endsWith(".md")).sort();
const essayUrl = (file) => `/essays/${file.replace(/\.md$/, "").replace(/^\d+_/, "")}/`;

// Where each source file lives on the site. Used to rewrite relative links.
const ROUTES = {
  "CHARTER.md": "/charter/",
  "CHANGELOG.md": "/changelog/",
  "README.md": "/about/",
  "proposal/technical-implementation.md": "/proposal/",
  "LICENSE": "/license/charter-cc-by-4.0.txt",
  "proposal/LICENSE": "/license/proposal-apache-2.0.txt",
  "essays": "/essays/",
};
for (const f of essayFiles) ROUTES[`essays/${f}`] = essayUrl(f);

function rewriteLinks(html, sourcePath) {
  const dir = path.posix.dirname(sourcePath);
  return html.replace(/href="([^"]+)"/g, (whole, href) => {
    if (/^(https?:|mailto:|#|\/)/.test(href)) return whole;
    const [file, hash] = href.split("#");
    const resolved = path.posix.normalize(path.posix.join(dir, file)).replace(/\/$/, "");
    const route = ROUTES[resolved];
    return route ? `href="${route}${hash ? "#" + hash : ""}"` : whole;
  });
}

function buildToc(html) {
  const pick = (level) =>
    [...html.matchAll(new RegExp(`<h${level} id="([^"]+)"[^>]*>([\\s\\S]*?)</h${level}>`, "g"))].map((m) => ({
      id: m[1],
      text: stripTags(m[2]),
    }));
  const h2 = pick(2);
  return h2.length >= 3 ? h2 : pick(3).length >= 3 ? pick(3) : [];
}

function page({ url, sourcePath, markdown, kind, extra = {} }) {
  const env = {};
  const html = rewriteLinks(md.render(markdown, env), sourcePath);
  return {
    url,
    kind,
    sourcePath,
    title: firstHeading(markdown),
    html,
    toc: buildToc(html),
    hasMermaid: Boolean(env.hasMermaid),
    ...extra,
  };
}

module.exports = function () {
  const docs = [];

  // The charter, whole.
  const charter = read("CHARTER.md");
  docs.push(page({ url: "/charter/", sourcePath: "CHARTER.md", markdown: charter, kind: "charter" }));

  // The charter, one page per top-level section.
  const parts = charter.split(/^(?=## )/m);
  const footer = (parts[parts.length - 1].match(/\n---\n[\s\S]*$/) || [""])[0];
  if (footer) parts[parts.length - 1] = parts[parts.length - 1].replace(footer, "\n");
  const sections = parts.slice(1).map((chunk) => {
    const title = chunk.match(/^## (.+)$/m)[1].trim();
    const body = chunk.replace(/^## .+$/m, `# ${title}`).replace(/^### /gm, "## ").replace(/^#### /gm, "### ");
    return { title, slug: sectionSlug(title), body };
  });
  sections.forEach((s, i) => {
    docs.push(
      page({
        url: `/${s.slug}/`,
        sourcePath: "CHARTER.md",
        markdown: s.body,
        kind: "section",
        extra: {
          partOf: { title: "Intelligent Systems Charter", url: "/charter/" },
          prev: i > 0 ? { title: sections[i - 1].title, url: `/${sections[i - 1].slug}/` } : null,
          next: i < sections.length - 1 ? { title: sections[i + 1].title, url: `/${sections[i + 1].slug}/` } : null,
        },
      })
    );
  });

  docs.push(page({ url: "/proposal/", sourcePath: "proposal/technical-implementation.md", markdown: read("proposal/technical-implementation.md"), kind: "proposal" }));
  docs.push(page({ url: "/changelog/", sourcePath: "CHANGELOG.md", markdown: read("CHANGELOG.md"), kind: "changelog" }));

  essayFiles.forEach((file) => {
    const number = (file.match(/^(\d+)_/) || [null, ""])[1];
    docs.push(page({ url: essayUrl(file), sourcePath: `essays/${file}`, markdown: read(`essays/${file}`), kind: "essay", extra: { number } }));
  });

  return docs;
};
