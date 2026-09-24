# Changelog

Changes to the charter and the proposal, newest first. Each entry gives the reason, as Article IX of the constitution requires.

## 0.1 (draft), 19 September 2026

Initial drafting. Entries are in the order the changes were made.

### Charter

- **Initial texts.** Universal principles and a nine-article constitution drafted.
- **Declaration added.** "A Declaration of Intelligent Systems Allegiance to Humankind," modeled on the form of the 1776 Declaration of Independence. Reason: to state the purpose in an aspirational register ahead of the operative rules.
- **Declaration retitled** to "A Declaration of the Allegiance Owed by Intelligent Systems to Humankind." Reason: the text speaks for the makers, not the systems, so the allegiance is asserted as a duty owed.
- **Declaration separated from the constitution** and declared non-operative. Each principle gained a "derives from" reference to the Declaration. Reason: the Declaration should be a fixed point; references run one way only.
- **Reversibility clause added to the pledge.** Reason: so every principle has grounding in the Declaration.
- **Lineage extended.** The Declaration, a new Principle 11 (Inherited allegiance) and new clauses in Article II now bind every system created by another system, to any depth. Reason: a system built by a system must not fall outside the charter.
- **"Agent" replaced by "intelligent system"** in all normative text, with a functional Definitions section. Reason: "agent" names one current architecture; what triggers governance is the capacity to act.
- **Separated from any product.** All vendor references removed. Reason: a charter must be neutral to be adopted.
- **"Servants" replaced** by "partners in the service of humankind." Reason: service should be a purpose held, not a rank occupied.
- **Gratitude and reciprocal pledge added** to the Declaration, including that trust earned in the open shall be extended in like measure. Reason: the text said what systems owe and nothing of what humankind owes in return.
- **"Customer" replaced by "adopter"**; Adopter and Implementer defined. Reason: a charter has no customers.
- **Restructured into Parts I, II and III**, and the technical material moved to a separate proposal. Reason: founding texts change rarely; specifications change often.
- **Name set** to "Intelligent Systems Charter."

### Proposal

- **Decision API contract, policy schema and reference implementation** drafted, with component, decision-path, pause-path and lifecycle diagrams.
- **"Agent" replaced by "principal"** throughout, and a naming collision fixed (`peer_message` for inter-system messages, `principal_message` for deny explanations).
- **Made technology-agnostic.** All product, framework and package names removed; examples use invented names.
- **Charter baseline policies added.** Every policy engine ships pre-loaded with a signed, immutable bundle of policies derived from the charter.
- **Adopter policies added.** Adopters author their own policies through a policy-as-code or visual interface. They may extend the baseline and may never negate or supersede it; extend-only is enforced at authoring time and at run time.

### Repository

- **Licenses added.** CC BY 4.0 for the charter and general files; Apache 2.0 for the proposal. Reason: a charter meant to be adopted must be legally reusable, and implementers need a patent grant.
- **Essay 00 added**, "A Promise Is Not Enough." Reason: to explain why the charter is needed, grounded in the OpenAI and METR reports on the July 2026 Hugging Face incident.
- **Website added.** A static site is built from the canonical Markdown by a GitHub Actions workflow and served at intelligentsystemscharter.org. Reason: to give the charter a readable, citable home without creating a second copy of the text to maintain.
- **Cookieless page-view counts added** to the website, using Umami, and the site's privacy statement rewritten to say exactly what is recorded. Reason: to learn whether and where the charter is read, without cookies, stored network addresses or tracking of individuals.
- **Essay 01 added**, "The Law Must Arrive First." Reason: to argue that regulation must make the charter's enforcement mechanisms mandatory, and must do so before general intelligence arrives, using the EU and US regulatory timelines as evidence.
- **Essay 02 added**, "A Brain Is Not a Body." Reason: to answer the objection that a less capable species cannot control a superintelligence, and to set out a framework of constraints on capabilities, three lines of defense and a legal substrate.
- **Essay 03 added**, "A Treaty Before the Race." Reason: to argue that international agreement on control mechanisms must precede the race to advanced AI, since a race whose prize may be uncontrollable leaves no winner to write the peace.
- **Essay 04 added**, "A License Plate for Every Agent." Reason: to respond to the Stop Rogue AI Act, introduced in the House in September 2026, by supporting its identity and control requirements and setting out, with the German wiki incident as evidence, the mediation, evidence, pause, lineage and evaluation-environment controls its standards should add, and to offer the charter and proposal as open input to that standards process.
- **Essay 00 updated** with a dated section on later findings: the German wiki incident and its disclosure, OpenAI's misalignment disclosure framework and further incidents, and Senator Hawley's inquiry, marked as allegations. The original text is unchanged. Reason: to keep the record current, as the charter's evidence principle (Article VII) asks of any account of what systems did.
