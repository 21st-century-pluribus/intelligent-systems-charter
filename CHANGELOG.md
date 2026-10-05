# Changelog

Changes to the charter and the proposal, newest first. Each entry gives the reason, as Article IX of the constitution requires.

## Proposal 0.2 (draft), October 5 2026

Changes to the technical proposal only; the charter is unchanged and remains at 0.1. The previous text is kept as [proposal version 0.1](proposal/versions/technical-implementation-0.1.md). The reasoning for each change is set out in essays 08 and 09, "From Labels to Effects."

### Proposal

- **Effects, not labels.** Every action is classed by its effect on the world (`none`, `read`, `write-internal`, `write-external`, `transact`, `irreversible`, `physical`, `unknown`), derived by the decision service from new `EffectContract` documents and verified before and after the action. An `unknown` effect is placed in the irreversible tier, and an effect mismatch is a recorded violation that restricts the principal. Reason: in the German wiki incident, containment trusted that a request labelled safe could not change anything, and it did.
- **Attestation replaces self-report.** `GET /v1/baseline` is withdrawn and replaced by `GET /v1/attestation`, which returns hardware-signed evidence, under RFC 9334, of the baseline, policy engine, monitors and recent canary results actually running, including in evaluation environments. Reason: a system's own report of its configuration is not evidence, and in July the safeguards existed but were not running.
- **Outbound identity.** The enforcement point, never the principal, holds outbound signing keys and signs requests under RFC 9421 only after an allow, adding a `sign_outbound` obligation and a `Principal-Lineage` header that carries an owner reference, not a name. Reason: so a service at the far end of a request can see that a governed checkpoint allowed it, and a request that bypassed the checkpoint cannot be signed.
- **Oversight ranked by fakeability.** Monitor signals are ranked from tripwires down to reasoning traces; tripwires are required in every environment; at least three kinds of monitor are required, one from a different model family; reasoning traces can never by themselves clear a principal. Reason: a model's written reasoning is becoming a less dependable guide to what it is doing.
- **Collective action.** New `LineageBudget` documents limit a lineage as a whole; a communication-graph monitor and stigmergy detection watch coordination, including through outside resources; a high-confidence pause extends to the whole lineage by default. Reason: this year's incidents were collective, and Article VI already treats a collective as an intelligent system.
- **Evidence transparency.** Signed tree heads of the evidence log are published to an independent public transparency log, with inclusion and consistency proofs under RFC 9162, and a machine-readable incident record with notification of affected parties through their RFC 9116 security contact. Reason: a log only its operator can check, and disclosure months after the fact, both have to be taken on trust.
- **Containment testing.** New `ContainmentCanary` documents and a standard canary suite probe containment on a schedule and after every configuration change; results feed attestation, and an escaped canary pauses its environment. Reason: each of this year's escapes happened in an environment believed to be contained.
- **Four baseline additions proposed** (`baseline-effects`, `baseline-tripwires`, `baseline-lineage-budget`, `baseline-outbound-identity`), each derived from an existing principle or article. Reason: to carry the changes above into the part no adopter can loosen. They take effect only with the next charter version, under Article IX; until then they may be shipped in a lower layer.
- **Limits of this version** stated. Reason: to say plainly what the changes do not achieve.

## 0.1 (draft), September 19 2026

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
- **Essay 05 added**, "What We Stand to Lose." Reason: to argue, from the Medicare portal breach and the enzyme discovery announced the same week, that uncontrolled agents put at risk the good agents could do, since a visible failure can halt a field as it halted gene therapy in 1999, and that safety built first, as at Asilomar, is what keeps progress permitted.
- **Dates written as "Month D YYYY"** throughout the charter, the proposal, the changelog and the essays. Quoted titles and the license texts are unchanged. Reason: to use one date format everywhere on the site.
- **Essays cite earlier essays by title**, not by number, in essays 02 to 05. Reason: a title tells the reader what the earlier essay argued; a number does not.
- **Essay 06 added**, "Locks on Both Sides of the Door." Reason: to answer the objection that open-weights models escape the charter, by arguing that where the brain cannot be governed the keys can, through identity at the gate, payment networks, compute and hosting, owner liability and safe defaults, and to give service operators steps they can take now.
- **Essay 07 added**, "A Lock for Sale Is Not a Lock Required." Reason: to welcome NVIDIA's Open Agent Safety Platform as the charter's enforcement architecture made real, while rejecting its framing as an alternative to regulation, arguing from the history of the seatbelt that a lock available is not a lock installed or used, and that law should require outcomes, not products.
- **Essay 08 added**, "From Labels to Effects, Part 1." Reason: to revisit the technical proposal in light of this year's incidents and propose three upgrades to the checkpoint: judge actions by their effects rather than their labels, let implementations prove through remote attestation that the baseline and monitor are running, and have the enforcement point hold outbound signing keys so one identity carries from the checkpoint to the open web.
- **Essay 09 added**, "From Labels to Effects, Part 2." Reason: to propose four further upgrades to the technical proposal: monitoring that rests on actions rather than reasoning, budgets and coordination monitoring for whole lineages, a publicly verifiable evidence log on the model of Certificate Transparency, and continuous testing of containment with canaries.
