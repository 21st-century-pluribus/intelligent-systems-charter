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
// Essay headings read "Topic: subtitle". The topic alone is what the sequence links show.
const essayTopic = (title) => title.split(":")[0].trim();

const essayFiles = fs.readdirSync(path.join(ROOT, "essays")).filter((f) => f.endsWith(".md")).sort();
// One line from each essay for the scrolling band on the home page. Each must appear verbatim in its essay.
const essayQuotes = require("./essayQuotes.json");
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

// Lines that open a page but say nothing about it: essay bylines, version lines, "part of" notes.
const PREAMBLE = [/^Essay \d+ · /, /^Version .* · Maintainer:/, /^From the /];
const DESCRIPTION_MAX = 160;

// The first real paragraph of prose, as plain text, for link previews. Headings, lists, tables,
// quotes and code are not paragraphs at the top level, so markdown-it's own parse skips them.
function describe(markdown) {
  const tokens = md.parse(markdown, {});
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== "paragraph_open" || tokens[i].level !== 0) continue;
    const text = tokens[i + 1].children
      .map((t) => (t.type === "text" || t.type === "code_inline" ? t.content : t.type === "softbreak" || t.type === "hardbreak" ? " " : ""))
      .join("")
      .replace(/\s+/g, " ")
      .trim();
    if (!text || PREAMBLE.some((re) => re.test(text))) continue;
    if (text.length <= DESCRIPTION_MAX) return text;
    const cut = text.slice(0, DESCRIPTION_MAX - 1);
    return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.\u2014-]+$/, "") + "\u2026";
  }
  return "";
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
    description: describe(markdown),
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

  // Essays, in file order, each linked to the one before and after it.
  const essays = essayFiles.map((file) => {
    const markdown = read(`essays/${file}`);
    return {
      file,
      markdown,
      number: (file.match(/^(\d+)_/) || [null, ""])[1],
      topic: essayTopic(firstHeading(markdown)),
      // The byline under the title reads "Essay NN · Month D YYYY · author".
      date: (markdown.match(/^Essay \d+ · ([^·]+?) ·/m) || [null, ""])[1],
    };
  });
  const essayLink = (e) => ({ title: e.topic, url: essayUrl(e.file), number: e.number });
  essays.forEach((e, i) => {
    const quote = essayQuotes[e.file] || null;
    if (quote && !e.markdown.replace(/\s+/g, " ").includes(quote)) {
      throw new Error(`Quote for ${e.file} does not appear verbatim in the essay: "${quote}"`);
    }
    docs.push(
      page({
        url: essayUrl(e.file),
        sourcePath: `essays/${e.file}`,
        markdown: e.markdown,
        kind: "essay",
        extra: {
          number: e.number,
          topic: e.topic,
          date: e.date,
          quote,
          prev: i > 0 ? essayLink(essays[i - 1]) : null,
          next: i < essays.length - 1 ? essayLink(essays[i + 1]) : null,
        },
      })
    );
  });

  return docs;
};
