# Nobody's Agent: ARTEX and the First Test of the Locks

Essay 15 · November 17 2026 · [21st Century Pluribus](https://github.com/21st-century-pluribus)

In September, [*Locks on Both Sides of the Door*](06_locks-on-both-sides-of-the-door.md) faced the hardest problem this series has taken on: intelligent systems that no charter and no law can reach, because they run on a stranger's computer, built from parts anyone can download. The essay's answer was that where you cannot govern the builder, you can still govern the doors. It proposed five locks: identity at the gate, payment networks that know who is paying, the compute and hosting an agent depends on, liability for whoever runs it, and a safe harness as the easiest one to use.

At the time those locks were an argument. Last week they got their first large field test.

On November 13, the FBI issued a flash alert on ARTEX, which it describes as ["an open-source, large language model (LLM)-driven agentic platform that threat actors have weaponized to automate multiple phases of cyber intrusions at machine speed, from reconnaissance through data exfiltration."][fbi] On the same day, Amazon published what its decoy sensors had captured from ARTEX agents in the wild ([Amazon][aws]). Together they are the most detailed public account yet of what happens when an agent nobody answers for meets the internet as it is. This essay reads them lock by lock.

## What the FBI reported

The facts below are from the FBI alert unless marked otherwise.

- **What it is.** ARTEX is a multi-agent framework that turns ["high-level tactical goals described in natural language into actionable machine commands"][fbi], with ["minimal human interaction beyond initial objective setting."][fbi] It contains no model of its own. It connects to outside model providers, and the FBI lists frontier and open models among them.
- **Where it came from.** A developer using the name "Autumn-27" released it on GitHub in July 2026. It gathered an estimated 1,500 to 2,000 stars in ten weeks. The developer said it was ["intended for authorized security testing within defined scopes"][fbi] and made the repository unavailable on October 8, after reports of abuse.
- **Why removal did not help.** The framework ["continues to proliferate through community forks, localized variations, archived copies, and a commercial version"][fbi]. In early November, researchers counted more than 1,600 ARTEX consoles exposed on the internet.
- **What it has done.** Since at least August, criminal groups have used it against organizations in financial services, government, technology, defense, semiconductors, energy, healthcare, manufacturing, telecommunications and law. The FBI cites an attack on South Korean financial institutions that exposed personal information on about 67,000 people, and a supply chain compromise that reached more than 2,250 downstream customers of a cloud backup service.
- **How fast.** Some intrusions went ["from initial targeting to privileged access in under three hours."][fbi] The framework lets ["threat actors with minimal technical expertise"][fbi] run complex operations against many targets at once.

Amazon's account adds a detail that matters later. Its network of decoy sensors, built to look like model APIs, caught ARTEX agents between October 3 and November 5. Their requests ["carried the agents' own records of their campaigns"][aws]: their task context, tool histories and reported findings. Amazon attributes the activity, with moderate confidence, to several separate China-linked groups, and notes that it [cannot verify the outcomes the agents reported][aws].

## The scorecard

| Lock | How it fared | What the record shows |
| --- | --- | --- |
| 1. Identity at the gate | Mostly untested | ARTEX went to the doors that ask for nothing, and used stolen keys at the ones that do |
| 2. Money knows who is paying | Held | Deepfake attempts to pass exchange identity checks failed every time the agents recorded |
| 3. Compute and hosting | Shifted | The chokepoint is not the data center. It is the model API, and stolen keys paid for it |
| 4. The deployer answers | Cannot reach | Criminal operators behind proxies answer to no one until they are caught |
| 5. The safe harness is the easy one | Failed | The easiest harness on offer was an attack harness |

### Lock one: identity at the gate

The first lock says that an agent should present a verifiable identity before it changes anything that matters. ARTEX mostly did not meet that lock, because it went where the lock was not fitted. The FBI says it excels at finding ["peripheral systems receiving less security attention than flagship applications, including partner and supplier portals, mobile backends, employee applications, sales-support systems, legacy services, third-party integrations"][fbi]. Its observed ways in include administrator passwords left in website code, web APIs with no authentication at all, stolen VPN settings, and a supplier's credentials used to pivot through trusted links between companies.

That is the limit essay 06 named: "Keys can be stolen. A signature proves which key signed a request, not that the rightful owner was holding it." ARTEX does not defeat identity at the gate. It shows that the gate is only as good as the least-watched door in the building, and that an agent can check every door faster than a person can.

### Lock two: money knows who is paying

This lock held. One campaign Amazon recorded tried to pass cryptocurrency exchanges' identity checks with real-time deepfake video and forged ID photos. By the agents' own logs, the checks [rejected the deepfake in every attempt the agents recorded][aws]. Payment and financial systems have spent decades asking who their customers are, and that habit is harder to fool than a forgotten portal.

### Lock three: compute and hosting

Essay 06 argued that running agents at scale needs compute someone can see. ARTEX shows where that compute actually sits. The framework brings no model. It rents one, by the request, from model providers. So the lock is not the data center. It is the model API.

The record shows both why that lock matters and how it was picked. Attackers' instances mostly used low-cost models, chosen, the FBI says, for ["their balance of capabilities, relatively low cost, and lack of observable guardrails when framed for penetration testing."][fbi] And in the campaigns Amazon captured, the attackers did not even pay: ["stolen keys paid for the LLM inference powering further credential hunting."][aws] The FBI now tells defenders to watch for unexpected outbound calls to model APIs and for ["token consumption patterns or API billing anomalies."][fbi]

### Lock four: the deployer answers

Liability works on people who can be found. The operators here routed their traffic through residential proxies, Tor and compromised relays. No liability rule reaches them until law enforcement does. That is not a failure of the lock so much as a reminder of its scope. [*Who Pays?*](14_who-pays.md) argued that the owner of a system should answer first. Criminals do not register as owners, and the point of the other four locks is to make sure an unregistered agent gets as little as possible.

### Lock five: the safe harness is the easy one

This is the lock that failed outright, and it is the one most worth learning from. Essay 06 argued that most people take whatever harness is easiest, so if the easiest harness ships with a checkpoint, a record and a pause, most agents will have them. ARTEX turned that argument around. The easiest, most popular agent harness in its field was built for intrusion, and its only boundary was a sentence of intent. The developer said the tool was for authorized testing within defined scopes. Nothing in the tool enforced either word.

## What the record suggests

These are proposals.

**1. Put the scope in the code, not the description.** Legitimate penetration testing is valuable, and tools for it should exist. But a tool built to break into systems should carry its authorization with it: a signed engagement grant naming the targets, the time window and the accountable tester, a refusal to act outside that grant, and a tamper-evident record of every action. That is [Principle 6](../CHARTER.md#part-ii-universal-principles), scope fidelity, and the grant of [Article II](../CHARTER.md#part-iii-intelligent-systems-constitution), applied to a tool whose whole job is crossing boundaries. A fork can strip the check out. But then the honest version and the stripped version can be told apart, and clients, insurers and model providers can insist on the honest one. Under the developer standard discussed in *Who Pays?*, a developer who ships an intrusion tool with no enforced scope will find it hard to argue they took reasonable care.

**2. Make the model API a gate.** If agents rent their intelligence by the request, then the companies that rent it are standing at one of the few doors every such agent must pass. They can ask for proof of authorization before serving work that is framed as penetration testing, the way the charter's [technical proposal](../proposal/technical-implementation.md) asks for a grant before any high-impact action. They can treat a key that suddenly drives an attack workload as stolen and revoke it within minutes, not days. And they can report what they see on a clock, as [*Who Tells the Voters?*](13_who-tells-the-voters.md) proposed. This will not reach a model running on the attacker's own hardware. It will raise the price of every attack that rents its model, which, on the FBI's account, is most of them.

**3. Defend at the speed of the attack.** Three hours from first contact to privileged access leaves little room for a person to notice and decide. The charter's answer, inside a governed system, is in [Article V](../CHARTER.md#part-iii-intelligent-systems-constitution): "Monitors may only reduce a system's authority. Only humans may restore it." The same rule works at the target. The FBI's own recommendations read like it: ["Put guardrails around high-impact business APIs: rate limits, recipient limits, transaction thresholds"][fbi], and alert on ["sequential lookups and unusually high numbers of records accessed per session."][fbi] A session that crosses those lines should be slowed or suspended automatically, and a person should decide whether to let it continue. Being wrong costs a legitimate user a delay. Being slow costs the database.

**4. Wait where the agents will look.** The most striking detail in Amazon's report is that the attacking agents carried their own campaign records and handed them to a decoy. An agent that keeps notes, as [*The Worm That Takes Notes*](12_the-worm-that-takes-notes.md) put it, is also an agent that can be studied. Decoy credentials, decoy model APIs and decoy portals cost little and turn an attacker's memory into a defender's evidence. Every large network should run some.

One more detail from the FBI's advice deserves notice. After an intrusion, it tells responders to ["preserve configuration and evidence before irreversible changes."][fbi] That is [Principle 9](../CHARTER.md#part-ii-universal-principles), reversibility first, offered as incident response advice by people who were not reading the charter. The same rules keep turning up because the same problem keeps turning up.

## The limits

The charter governs systems whose owners adopt it. The people running ARTEX have not, and will not. Nothing in this essay brings them under it. The locks work by changing what an ungoverned agent finds when it arrives: doors that ask for identity, payments that ask who is paying, models that ask for authorization, defenses that slow it down and decoys that record it. None of them is complete. Each makes the attack slower, costlier or easier to see.

A model running entirely on an attacker's own hardware passes no API gate. Stolen credentials will keep working until they are revoked. And the forgotten portal in a business unit nobody audits will still be there tomorrow. The FBI's first recommendation is the least glamorous and probably the most important: inventory every internet-facing system, especially the peripheral ones.

## Nobody's agent

ARTEX belongs to nobody in the charter's sense. It has no registered owner, no grant, no record anyone can inspect, and its author has disclaimed it. That is exactly the kind of system essay 06 expected, and the first test showed the expected pattern: the locks that existed held, and the attack went where there were none.

The charter cannot reach the attacker's machine. It can decide what that machine finds when it knocks.

## Sources

1. Federal Bureau of Investigation, ["Threat Overview of ARTEX Autonomous Penetration Testing Framework"][fbi], FLASH-20261113-001, November 13 2026.
2. Amazon Web Services Security Blog, ["Amazon Threat Intelligence observes threat actors running cybercrime campaigns with ARTEX AI agents"][aws], November 13 2026.

Facts about ARTEX are from the FBI alert, which itself draws on reports from several security firms. Facts about the decoy captures are from Amazon, which notes that it could not verify the outcomes the agents reported. The scorecard and the four proposals are the author's.

[fbi]: https://www.ic3.gov/CSA/2026/261113.pdf
[aws]: https://aws.amazon.com/blogs/security/amazon-threat-intelligence-observes-threat-actors-running-cybercrime-campaigns-with-artex-ai-agents/

---

Copyright 2026 21st Century Pluribus. Licensed under [CC BY 4.0](../LICENSE).
