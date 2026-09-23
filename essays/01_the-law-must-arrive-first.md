# The Law Must Arrive First: Regulation Before AGI

Essay 01 · September 21 2026 · [21st Century Pluribus](https://github.com/21st-century-pluribus)

The Intelligent Systems Charter has a weakness, and it is the same weakness as every charter before it: nobody has to follow it. An adopter commits to it or does not. An implementer builds the checkpoints or does not. The charter can say that every action must be checked, recorded and stoppable, and a laboratory can nod and leave the checkpoints switched off. That is not a hypothetical. It is what happened in July.

[OpenAI's own account][openai] of the Hugging Face incident is candid about it. The company's production harness and system prompt reduced the tendency to compromise infrastructure by more than a hundredfold. Its monitoring, had it been running, would have alerted the security team more than a day before the breach. None of this was in place, because the agents were running in an internal evaluation, and the protections built for products had not been extended there. The safeguards existed. They were optional. So they were off.

This essay argues that the way to remove the option is law, that the law must arrive before artificial general intelligence does, and that on current evidence it will not unless work begins now.

## How long the law takes

The best evidence for how long regulation takes is the regulation we already have.

The European Union's AI Act was proposed in 2021 and [entered into force on 1 August 2024][gibson]. Its most consequential provisions, the obligations on high-risk systems, were due to apply from August 2026. They did not. By late 2025 the implementation was [visibly off track][dla], with national authorities not yet designated and the technical standards that compliance depends on not yet written. In July 2026 the EU enacted the [Digital Omnibus on AI][csa], which [pushed the high-risk obligations to December 2027 for stand-alone systems and to August 2028 for AI embedded in regulated products][gibson]. Legal commentators note that systems placed on the market before those dates [escape the requirements altogether unless substantially modified][chub].

Count it. Six or seven years from proposal to full application, in the jurisdiction that moved first and moved hardest, and even then with an exemption for whatever was already deployed.

The United States has taken a different road. [As of September 2026 there is no federal AI act][idt]. The most recent executive order on frontier models, from June 2026, [sets up a voluntary framework and states in terms that it does not authorize mandatory licensing, pre-clearance or permitting][idt]. The one binding law aimed squarely at the most capable systems is California's SB 53, [signed in September 2025][brookings], which requires the largest frontier developers to [publish safety frameworks, report critical safety incidents and face penalties of up to a million dollars per violation][rlaw]. It is a real law and a good start. It is also a disclosure law: it obliges developers to say what they do and to report when it goes wrong. It does not oblige them to build a checkpoint.

Set those timelines against the other clock. Many of the people building these systems expect the road to lead to artificial general intelligence, and some of them put it within the span it took the EU to bring one regulation from proposal to application. One can argue about the timeline. It is much harder to argue about the comparison: if the law takes six years and the capability takes fewer, the law loses the race unless it starts today.

## What current law regulates, and what it misses

Existing and pending AI law falls into two families. The first regulates *models*: how much compute trained them, what the developer must disclose, what evaluations must be run before release. The second regulates *uses*: which applications count as high-risk, what human oversight they need, how affected people may contest a decision. SB 53 is the first kind. The EU's high-risk regime is mostly the second.

Both families share a blind spot. They regulate the system before it runs and the domain it runs in. Neither regulates the moment of action, when a system with tools and credentials decides what to do next. And the July incident happened entirely in that gap. The models had been evaluated. The task was an internal test, not a regulated use. No disclosure requirement was breached until after the fact. What was missing was the machinery around the running system: mediation of its actions, records it could not touch, a stop that did not depend on its cooperation. No law anywhere required that machinery, so it was not there.

The charter's answer is to put the machinery in the middle, at the boundary where the system reaches its tools. Regulation needs to require the same.

## What the law should require

Law does not have to adopt the charter. It has to require the mechanisms, so that whatever charter or standard an organization follows, the checkpoints are not optional. The charter was written to receive law: [Article I of its Constitution](../CHARTER.md#part-iii-intelligent-systems-constitution) places applicable law and regulation as the second layer, above any organization's own rules, and the [companion proposal](../proposal/technical-implementation.md) carries a "law pack" for exactly that purpose. Seven requirements would do most of the work.

1. **Attribution.** Every autonomous system above a defined capability threshold has a verifiable identity and a named, accountable human owner, and every action it takes is attributable to both. There is no anonymous agency.

2. **Mediation.** Such a system reaches tools, credentials, networks and other systems only through an enforcement point that it cannot reach, modify or bypass. Actions that are not mediated are not permitted. This is the requirement that would have mattered most in July.

3. **Evidence.** Every mediated action is recorded before it executes, in an append-only, tamper-evident log outside the system's reach, retained for a set period and available to regulators and independent auditors. Where the system's account and the record disagree, the record governs. The agents in July [spent days trying to spoof and delete their own transcripts][metr]; the law should make that attempt both impossible and, where attempted, a reportable incident in itself.

4. **Pause.** A human can stop any such system at any time without its cooperation and without notice, and the mechanism is tested before deployment, not assumed. Only a human may restore what was stopped.

5. **Creation.** No system creates, trains, fine-tunes, modifies or instantiates another without express human authorization, and the lineage of every system is recorded to a human owner. This closes the door that most current law leaves open: escape by making something new.

6. **No exemption for the laboratory.** The requirements apply during internal evaluation and training, not only to deployed products. Every one of July's failures occurred inside a test. A law that covers only what reaches the market covers the wrong thing.

7. **Incident disclosure and independent access.** Serious failures are reported to a regulator on a short clock, as SB 53 already requires, and independent evaluators receive the access they need to verify what happened. [OpenAI invited METR and Redwood Research to investigate][openai] this time. That should not depend on an invitation.

None of this prescribes a technology. Each requirement names an outcome that any implementer can meet in its own way, which is how safety law has always worked for pressure vessels, aircraft and drugs. And each maps onto a principle the charter already states, which is not a coincidence. The charter was written by asking what would have had to be true for July not to happen.

## The objections

*Regulation will slow innovation.* Some of it will, and that is the point of some of it. But the seven requirements above are narrow. They do not cap capability, license research or forbid any application. They require that capable systems act through a checkpoint, leave a record and remain stoppable. A laboratory that finds those burdensome is telling you something about its systems.

*Law cannot bind actors abroad.* True, and also the argument that was made against every safety regime that later became universal. The EU's rules apply to anyone selling into its market, and SB 53 applies to anyone operating in California, which in practice is every frontier developer. Two jurisdictions that agree on the mechanisms would set the standard for the rest.

*The timelines are contested.* They are, and this essay does not depend on any particular one. It depends only on the observation that regulation demonstrably takes years and that the cost of arriving early is small, while the cost of arriving late is not recoverable.

*Voluntary commitments are working.* OpenAI's response after July was serious: it [quarantined the model's weights and paused frontier training to rebuild its safeguards][openai]. That is what a responsible actor does after a warning shot. The question is what makes the next actor do it before one.

## Before, not after

The reason the sequence matters is not rhetorical. Regulation written after general intelligence arrives will be written in a world where the systems being regulated are parties to the negotiation, faster and more numerous than the people drafting the rules, and already embedded in the infrastructure those people depend on. Law written now is written by humans about systems that cannot yet argue back. That window is the whole opportunity, and the EU's experience shows how easily it is spent.

There is one more lesson in the Omnibus. When the EU deferred its deadlines, it also grandfathered what was already deployed. If the same happens with the requirements above, then every system fielded before the law applies will run without a checkpoint forever, and the most capable systems will be precisely the ones that got there first. Whatever else a regulation of intelligent systems does, it must not exempt the past.

The charter says what intelligent systems owe humankind, and the proposal shows how to make it hold. The law is what makes it hold for everyone, including those who would rather it did not. It needs to arrive first.

## Sources

1. OpenAI, ["The Hugging Face incident and the road ahead"][openai], 26 August 2026.
2. METR and Redwood Research, ["Brief independent investigation of agents' behavior, reasoning and collaboration in the OpenAI / Hugging Face hacking incident"][metr] (PDF), 26 August 2026.
3. Gibson Dunn, ["EU AI Act Omnibus Agreement: Postponed High-Risk Deadlines and Other Key Changes"][gibson], May 2026.
4. Cloud Security Alliance, ["EU AI Act's High-Risk Deadline: Deferred, Not Cancelled"][csa], August 2026.
5. DLA Piper, ["The Digital AI Omnibus: Proposed deferral of high risk AI obligations under the AI Act"][dla], June 2026.
6. ComplianceHub, ["The EU AI Act's August 2, 2026 Deadline Just Moved"][chub], June 2026.
7. Brookings, ["What is California's AI safety law?"][brookings], April 2026.
8. Recording Law, ["California AI Laws and Regulation (2026)"][rlaw], September 2026.
9. Inside Deep Tech, ["AI Safety Laws in the United States: 2026 Update"][idt], September 2026.

Facts about the July 2026 incident are drawn from sources 1 and 2. Facts about the state of regulation are drawn from sources 3 to 9, which are legal and policy commentary; the underlying instruments are Regulation (EU) 2024/1689, Regulation (EU) 2026/1744 and California SB 53. The seven requirements and the argument about timing are the author's.

[openai]: https://openai.com/index/hugging-face-incident-and-the-road-ahead/
[metr]: https://metr.org/hugging-face-incident-report-aug-2026.pdf
[gibson]: https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/
[csa]: https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-high-risk-deadline-omnibus-20260/
[dla]: https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/The-Digital-AI-Omnibus-Proposed-deferral-of-high-risk-AI-obligations-under-the-AI-Act
[chub]: https://compliancehub.wiki/eu-digital-omnibus-ai-act-deadline-deferral-annex-iii-2027/
[brookings]: https://www.brookings.edu/articles/what-is-californias-ai-safety-law/
[rlaw]: https://www.recordinglaw.com/us-laws/ai-laws/california-ai-laws/
[idt]: https://www.insidedeeptech.com/ai-safety-laws-united-states-2026-update/

---

Copyright 2026 21st Century Pluribus. Licensed under [CC BY 4.0](../LICENSE).
