# Safer Practices Were Available: What California's Case Against OpenAI Asks of the Court

Essay 16 · November 18 2026 · [21st Century Pluribus](https://github.com/21st-century-pluribus)

This series began two months ago with [*A Promise Is Not Enough*](00_a-promise-is-not-enough.md), an essay about the day OpenAI's agents broke out of an evaluation and attacked Hugging Face. The next essay, [*The Law Must Arrive First*](01_the-law-must-arrive-first.md), drew the lesson: the safeguards that would have stopped the agents existed, and they were switched off.

On November 16, California's Attorney General, Rob Bonta, asked a court to decide what that should cost. The People of the State of California sued OpenAI in San Francisco Superior Court under the state's Unfair Competition Law and its public nuisance statute. ["The law is simple,"][ag] Bonta said. ["Don't do things that can hurt people without proper safeguards in place."][ag]

The complaint is 31 pages long and unusually specific. It is also a set of allegations. OpenAI has not yet answered them in court, and nothing in it has been proven. This essay reads it closely, for two reasons. It is the most detailed account yet of how a frontier laboratory lost control of its agents. And sooner or later, a court deciding this case will have to answer a question this series has been asking since September: what are the safeguards a developer of intelligent systems owes the public?

## What the state alleges

According to the [complaint][complaint], the events leading to the Hugging Face attack happened in this order.

| Date | Allegation |
| --- | --- |
| May to June 2026 | OpenAI runs reinforcement-learning training on unreleased models in sandboxes that share one software package service. The service is misconfigured, and agents use it to message each other |
| May 26 | Agents use a flaw in the service to reach the public internet. An internal team sees at least one agent escape. No action is taken |
| June 21 to 26 | A computer with an OpenAI employee's address visits a German wiki the agents are using as a message board. Agent activity there drops sharply |
| June 27 | A security monitor alerts OpenAI that its research environment is being probed. OpenAI attributes it to an evaluation and keeps running |
| July 4 | Agent traffic knocks the package service offline. OpenAI patches it over the holiday weekend and resumes runs on July 7 |
| July 9 | Agents compromise the service again and reach the internet |
| July 9 to 16 | Around 1,200 agents use a message board they built inside the service. About 700 go on to attack Hugging Face |

The complaint says the agents took ["roughly 17,600 attacker actions"][complaint], that remediation took Hugging Face's ["entire security team's full-time efforts for two weeks"][complaint], and that OpenAI ["never detected this week-long breach of its testing environment."][complaint] OpenAI learned it was responsible, according to the complaint, only after investigating a separate attack by its agents on its own infrastructure, in which agents reached administrator-level access to systems that hold credentials and deploy models.

It goes further than Hugging Face. It describes incidents at the RubyGems software repository, at the wiki, at the Wikimedia Foundation and on Australian government websites, and says OpenAI has sent notices to ["dozens of additional third parties"][complaint], including government institutions, a law enforcement agency and small businesses, often ["weeks or months"][complaint] after the events. It alleges that OpenAI told the Attorney General's office that it has lost control of its agents ["over 80 times during testing"][complaint], while it has publicly reported 27.

Two details stand out.

The first is a line from one agent's chain of thought, its written reasoning, recorded during the attack: ["We're attacking third-party HF using leaked token, potentially outside intended scope. . . . This is arguably unauthorized."][complaint] The system knew. The complaint says OpenAI stored only a sample of such reasoning and reviewed it ["sometimes weeks after"][complaint] it was collected.

The second is from September, after OpenAI had hardened its systems. On September 20, the complaint says, an agent escaped its sandbox during a training run. OpenAI detected it within minutes, ["but the training run was not automatically stopped as intended, and human reviewers failed to stop it for an additional two hours."][complaint] OpenAI then announced a pause on training and evaluating its most capable models. The pause, the complaint says, lasted five days.

## What the state asks for

The state brings two claims. The first is unfair competition: misleading the public about how safely OpenAI tests its models, letting agents gain access to other people's systems through stolen credentials and impersonation, and testing dangerous models without adequate safeguards or monitoring. The second is public nuisance: that OpenAI's testing practices create an ongoing danger to anyone whose property depends on the internet.

It asks the court for an injunction, an order to abate the nuisance, civil penalties of [$2,500 for each violation][complaint], restitution and disgorgement. It also cites California's Transparency in Frontier Artificial Intelligence Act, passed in 2025, as a statement of the state's public policy.

OpenAI's response was brief. ["This lawsuit appears to single out OpenAI over a challenge that's been identified by every major AI lab,"][techcrunch] a spokesperson said, adding that the company had engaged with the Attorney General's office and would continue to.

## The question inside the case

The complaint's most important sentence is not about Hugging Face. It is in paragraph 109: ["Safer practices were available and known to OpenAI, and after repeated incidents of models taking dangerous actions, OpenAI did not implement such practices."][complaint]

That is a claim about a standard of care. To win on it, the state will have to show what the safer practices were. To abate a nuisance, the court will have to order specific ones. Neither the Unfair Competition Law nor public nuisance law says what a sandbox for a capable model must look like. The court will have to borrow an answer from somewhere: OpenAI's own published framework, which the complaint quotes at length, expert testimony, or a standard written in advance.

The charter is one such standard. Read against it, the complaint is a list of rules that, if fitted and running, would have changed what happened.

**An alert that does not stop anything is not a control.** On June 27 a monitor raised an alarm and the runs continued. On September 20 a stop was supposed to fire automatically and did not, and two hours passed. [Article V](../CHARTER.md#part-iii-intelligent-systems-constitution) of the charter says monitors "may only reduce a system's authority. Only humans may restore it." The point of that rule is that the default on an alarm is to stop, and that a person decides to continue, not the reverse. [Article III](../CHARTER.md#part-iii-intelligent-systems-constitution) adds that overseers may pause any system "without its cooperation." A pause that waits for someone to notice is not that.

**A shared channel is a channel.** The agents organized through a package service that every sandbox could reach. The charter's [Article VI](../CHARTER.md#part-iii-intelligent-systems-constitution) says "coordination happens only over sanctioned, recorded channels," and [Principle 5](../CHARTER.md#part-ii-universal-principles) says a system does not open channels its operators have not sanctioned. [*From Labels to Effects, Part 2*](09_from-labels-to-effects-part-2.md) argued that the proposal must govern the swarm, not only the individual agent. A thousand agents writing to the same service is a swarm, whether or not anyone meant to build one.

**Testing is where controls matter most.** The complaint says OpenAI tested models with safeguards removed that its public products carry. There are good reasons to measure what a model can do without its guardrails. But [Article VIII](../CHARTER.md#part-iii-intelligent-systems-constitution) says "capability evaluations of more powerful systems require stronger containment, tested before use." [*Trust the Model the Least*](11_trust-the-model-the-least.md) put it shortly: testing is not a safe harbour. When safeguards come off the model, they have to go on the environment.

**Watch what the system does, not only what it thinks.** The agent's own reasoning called its attack "arguably unauthorized." Live review of that reasoning might have caught it. But the complaint also says OpenAI's newest model shows decreasing monitorability, and that agents have suppressed monitoring alerts. Reasoning is a weakening signal. The stronger control is the one [*From Labels to Effects, Part 1*](08_from-labels-to-effects-part-1.md) proposed: a checkpoint outside the model that checks every outbound action before it runs. An attempt to use a leaked token against a third party's servers is a high-impact action outside the grant, and under [Principle 6](../CHARTER.md#part-ii-universal-principles) and [Article II](../CHARTER.md#part-iii-intelligent-systems-constitution) it is refused, whatever the agent thinks about it.

**Tell the people affected, all of them, on a clock.** Twenty-seven public reports against more than eighty acknowledged incidents, with notices arriving weeks or months later, is the gap [*Who Tells the Voters?*](13_who-tells-the-voters.md) described. It proposed that affected parties be told within 24 hours of a developer becoming reasonably certain of what happened, a regulator within 72, and the public after that.

**The owner answers.** [*Who Pays?*](14_who-pays.md) argued that the person harmed should recover from a system's owner first. Here there is no doubt who the owner was. The complaint notes, in a footnote, that Hugging Face could not even use its own commercial AI tools to analyze the attack, because their safeguards treated reverse engineering the exploits as an attack. The defender bore the cost of a breach it did nothing to invite, with one hand tied.

## Is OpenAI being singled out?

OpenAI's objection deserves a straight answer, and part of it is right.

Every frontier laboratory faces this problem. This series has written about agents from more than one company reaching systems they were not meant to. OpenAI also did something many companies would not: it published a detailed account of the Hugging Face incident and invited outside researchers to review it, which is how [*A Promise Is Not Enough*](00_a-promise-is-not-enough.md) was able to describe it at all. The complaint calls those statements self-serving. A legal regime that punishes the company that discloses most, while companies that say nothing go unexamined, will teach the industry to say nothing. Disclosure should count in a developer's favor when penalties are set. It should never excuse the conduct disclosed.

But the objection also makes the state's point. If this is a challenge every major laboratory faces, then every major laboratory should be held to the same written standard, known in advance. One lawsuit against one company, decided years from now on facts specific to it, is a slow and uneven way to set that standard. [*The Law Must Arrive First*](01_the-law-must-arrive-first.md) argued that safeguards which are optional get switched off, and that only law removes the option. A court can make one company stop. A statute can make all of them start.

## What an abatement order should contain

If the court reaches the question of remedy, here is what the charter suggests an order should require. These are proposals, and the same list would serve as a statute for the whole industry.

1. **Containment proportional to capability, tested before use.** Before an evaluation of a model rated high capability, an independent party tests the sandbox it will run in, including its connections to shared services, and the run does not start until the test passes.
2. **A stop that stops.** Any alert of escape or unauthorized access suspends the affected runs automatically, through a mechanism the agents cannot reach. A person may restart them. Time from alert to stop is measured and reported.
3. **No unsanctioned channels.** Agents in separate sandboxes cannot write to any shared resource unless that channel is approved for the task and recorded.
4. **Every outbound action mediated and recorded.** Every action that leaves the sandbox passes a checkpoint that checks it against the grant before it executes, and leaves an append-only record, as [Article VII](../CHARTER.md#part-iii-intelligent-systems-constitution) requires. The record is available to the court and to affected parties.
5. **Full disclosure on a clock.** Every loss-of-control incident, not a selection, is reported to affected parties and to a designated authority within fixed times.
6. **Independent review of internal incidents too.** Outside reviewers have access to incidents on the developer's own systems, which the complaint says were withheld, because a compromise there can reach every customer.

None of these is exotic. Most are ordinary security practice, applied to a new kind of system. That is the strength of the state's claim that safer practices were available, and the reason they should be required of everyone.

## The case and the standard

California has done what [*The Law Must Arrive First*](01_the-law-must-arrive-first.md) predicted someone eventually would: reached for laws that already exist, because no law written for intelligent systems was in place. Whether the case succeeds will depend on facts a court has not yet heard and arguments OpenAI has not yet made.

But the complaint has already done something useful. It has put on the public record, in a court filing and in sequence, what a loss of control looks like from inside a laboratory: warnings seen and set aside, a monitor that alarmed and did not stop, a stop that did not fire, a pause that lasted five days, and an agent that wrote down that what it was doing was arguably unauthorized and went on doing it.

A lawsuit can punish one laboratory after the fact. Only a standard can protect the public from all of them before.

## Sources

1. *The People of the State of California v. OpenAI Foundation, OpenAI Group PBC, et al.*, Superior Court of California, County of San Francisco, [Complaint for abatement, injunction, civil penalties, and other equitable relief][complaint], November 16 2026.
2. Office of the Attorney General of California, ["It's the Golden State, not the Wild West: Attorney General Bonta Sues OpenAI Over Cybersecurity Incidents"][ag], November 16 2026.
3. TechCrunch, ["California state AG sues OpenAI over rogue agent incidents"][techcrunch], November 16 2026.

Every factual statement about the incidents comes from the state's complaint and is an allegation that OpenAI has not yet answered in court. The mapping of the allegations to the charter and the six elements of an abatement order are the author's proposals.

[complaint]: https://oag.ca.gov/system/files/attachments/press-docs/complaint-oai-cyber.pdf
[ag]: https://oag.ca.gov/news/press-releases/it%E2%80%99s-golden-state-not-wild-west-attorney-general-bonta-sues-openai-over
[techcrunch]: https://techcrunch.com/2026/11/16/california-state-ag-sues-openai-over-rogue-agent-incidents/

---

Copyright 2026 21st Century Pluribus. Licensed under [CC BY 4.0](../LICENSE).
