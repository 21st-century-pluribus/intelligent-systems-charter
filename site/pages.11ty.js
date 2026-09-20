// One output page per entry in _data/docs.js.
class Pages {
  data() {
    return {
      pagination: { data: "docs", size: 1, alias: "doc" },
      layout: "base.njk",
      permalink: (data) => data.doc.url,
      eleventyComputed: {
        title: (data) => data.doc.title,
        toc: (data) => data.doc.toc,
        hasMermaid: (data) => data.doc.hasMermaid,
        sourcePath: (data) => data.doc.sourcePath,
        kind: (data) => data.doc.kind,
      },
    };
  }
  render(data) {
    return data.doc.html;
  }
}
module.exports = Pages;
