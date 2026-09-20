// One Markdown renderer shared by the canonical documents and the site's own pages.
const MarkdownIt = require("markdown-it");
const anchor = require("markdown-it-anchor");

const slugify = (s) =>
  String(s).toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-");

const md = new MarkdownIt({ html: false, linkify: false, typographer: true });

// Every heading gets a stable id and a visible citation mark, so any clause can be linked to.
md.use(anchor, {
  slugify,
  level: [2, 3],
  permalink: anchor.permalink.linkInsideHeader({
    symbol: "\u00A7",
    placement: "before",
    class: "cite-mark",
    ariaHidden: false,
    renderAttrs: () => ({ "aria-label": "Link to this section" }),
  }),
});

// Mermaid diagrams are drawn in the browser. Without JavaScript the source stays readable.
const defaultFence = md.renderer.rules.fence.bind(md.renderer.rules);
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  if (token.info.trim() === "mermaid") {
    if (env) env.hasMermaid = true;
    return `<figure class="diagram"><pre class="mermaid">${md.utils.escapeHtml(token.content)}</pre></figure>\n`;
  }
  return defaultFence(tokens, idx, options, env, self);
};

// Wide tables scroll inside their own box instead of stretching the page.
md.renderer.rules.table_open = () => '<div class="table-scroll"><table>\n';
md.renderer.rules.table_close = () => "</table></div>\n";

module.exports = { md, slugify };
