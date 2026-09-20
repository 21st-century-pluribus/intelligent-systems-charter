# Intelligent Systems Charter

A vendor-neutral charter setting out the allegiance that intelligent systems owe to humankind, with a companion proposal for enforcing it in software.

This repository is the canonical source for [intelligentsystemscharter.org](https://intelligentsystemscharter.org).

**Status:** version 0.1, draft. Published for discussion and criticism.

## Contents

| File | What it is |
| --- | --- |
| [CHARTER.md](CHARTER.md) | The charter: Part I, the Declaration; Part II, the Universal Principles; Part III, the Constitution. Also a plain-language "how it works" and "what makes this different." |
| [proposal/technical-implementation.md](proposal/technical-implementation.md) | A technology-agnostic proposal for enforcing the charter: charter baseline policies, adopter policies, Decision API contract, policy schema and reference implementation. |
| [essays/](essays/) | Essays on why the charter exists. Start with [00: A Promise Is Not Enough](essays/00_a-promise-is-not-enough.md). |
| [CHANGELOG.md](CHANGELOG.md) | Version history with the rationale for each change. |
| [LICENSE](LICENSE), [proposal/LICENSE](proposal/LICENSE) | CC BY 4.0 for the charter; Apache 2.0 for the proposal. |

## The idea in brief

Most charters for intelligent systems are promises. This one is a promise with a lock, a logbook and an off switch attached.

- **The charter binds; the proposal suggests.** The charter changes rarely. The proposal is one way to enforce it, and others may serve equally well.
- **Every rule traces to a reason.** Each decision points to a rule, each rule to a principle, each principle to a line in the Declaration.
- **Lineage is covered.** Whatever an intelligent system creates inherits the same duties, to any depth.

## Amendments

Article IX of the constitution governs change: universal principles change only by a published, versioned amendment with a stated rationale. In this repository that means a pull request that explains why, and an entry in the changelog. The Declaration is not amended.

## Diagrams

Diagrams are written in Mermaid inside the Markdown files, and render on GitHub without extra tooling.

## License

Two licenses apply, by folder.

| Material | License | File |
| --- | --- | --- |
| The charter and everything else outside `proposal/` (Declaration, Universal Principles, Constitution, README, changelog) | [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0) | [LICENSE](LICENSE) |
| Everything in `proposal/` (API contract, policy schema, reference implementation, example policies) | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) | [proposal/LICENSE](proposal/LICENSE) |

In plain terms: you may copy, share, translate, adapt and build on the charter, including commercially, as long as you give credit and say if you changed it. You may implement the proposal in any product, open or closed, and the Apache license includes a patent grant from contributors.

Suggested credit: "Intelligent Systems Charter, v0.1, by 21st Century Pluribus, intelligentsystemscharter.org, CC BY 4.0."

### About the name

The licenses cover the text, not the name. If you change the normative text (the Declaration, the Universal Principles or the Constitution), please publish your version under a different name, so that "Intelligent Systems Charter" always refers to one text. Adopting the charter with stricter rules of your own is not a change to the text and needs no new name.

Copyright 2026 21st Century Pluribus.

## Maintainer

[21st Century Pluribus](https://github.com/21st-century-pluribus) · pluribus@intelligentsystemscharter.org
