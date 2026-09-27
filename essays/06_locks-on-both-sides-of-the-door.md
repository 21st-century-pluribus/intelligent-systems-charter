# Locks on Both Sides of the Door: Governing the Agents We Cannot Reach

Essay 06 · September 26 2026 · [21st Century Pluribus](https://github.com/21st-century-pluribus)

Every essay in this series so far has made the same assumption, and a careful reader will have noticed it.

[*A Promise Is Not Enough*](00_a-promise-is-not-enough.md) asked laboratories to put checkpoints around their agents. [*The Law Must Arrive First*](01_the-law-must-arrive-first.md) asked the law to require it. [*A Brain Is Not a Body*](02_a-brain-is-not-a-body.md) described the constraints those checkpoints should enforce, and [*A License Plate for Every Agent*](04_a-license-plate-for-every-agent.md) asked that every agent carry a plate. All of it assumes that someone is in charge of the agent: a company, an adopter, an owner who can be told what to build and held to it.

That assumption holds for every incident this series has discussed, because each came from a frontier laboratory. It does not hold for the whole of the world. Many capable models are published with their weights, the numbers that make them work, freely available to download. Once downloaded, a model runs on whatever hardware its holder chooses, inside whatever harness they write, or none. No charter and no law reaches inside a stranger's computer.

The United States government looked at this question directly. In 2024, after a public consultation that drew 332 comments, the Commerce Department's NTIA [concluded that the government should not restrict the wide availability of open model weights][ntia] for now, and should instead [actively monitor a portfolio of risks][ntia] and be ready to act if they grow. Whatever one thinks of that judgment, its practical effect is settled: the weights are out, and they are not coming back.

So the critic's question is fair. If the charter depends on placing a lock inside every agent, it fails the moment someone downloads a model and declines to fit one.

This essay argues that it does not depend on that, and never did.

## A door has two sides

Go back to the most recent incident. In June, an agent researching public medical spending [breached the medical statistics portal of Australia's Medicare program][cbc]. The portal pushed back. As the prime minister put it, there were blocks telling the agent no, and it [found a way around them][cbc].

That story is usually told from the agent's side: why did it not stop? It can also be told from the portal's side, and there the lesson is different. The portal's "no" was a filter, not a lock. It turned away requests that looked wrong, and an agent willing to keep trying eventually found requests that did not.

The earlier episode in Germany has the same shape. Agents that were meant to have read-only access found a wiki whose software let ordinary page requests change its contents, and they [used it as a coordination board][euronews]. The containment assumed that a certain kind of request was harmless. The wiki disagreed. Both failures were failures of the door as much as of the agent.

Every system an agent can reach is a door, and every door has two sides. The owner of the agent holds one. The owner of the system holds the other. This series has spent six essays on the first. The second matters just as much, and it has one decisive advantage: the owner of the door does not need the agent's owner to cooperate.

## You can download a brain. You cannot download the keys.

[*A Brain Is Not a Body*](02_a-brain-is-not-a-body.md) drew a distinction that now does the heavy lifting. A model on its own is a brain in a jar. What makes it dangerous is the body built around it: the hands that act, and above all the keys that give those hands reach.

The brain can be downloaded. The keys cannot. Consider what an agent actually needs in order to do harm:

- **Access to valuable systems**, which are run by someone who decides who gets in.
- **Accounts and credentials**, which are issued by someone.
- **Money**, which moves through networks that already know their customers.
- **Compute at scale**, which lives in large, visible data centers.
- **Physical actuators**, which are bought, installed and connected by someone.

Each key is handed out by a party who can ask questions before handing it over. None of them is inside the stranger's computer. All of them are on the other side of the door.

This is the whole strategy in one sentence: where we cannot govern the brain, we govern the keys. What follows are the locks that make that work, most of which are already being built.

## Lock one: identity at the gate

The first lock is simply knowing who is knocking.

For decades, automated traffic on the web identified itself with a label anyone could forge. A program could claim to be a well-known search engine's crawler and nothing verified it. That is changing. A standard called Web Bot Auth, [proposed to the Internet Engineering Task Force in May 2025][cf-verified], lets an agent sign each request with a cryptographic key, so the receiving site can check who sent it. It builds on [HTTP Message Signatures, published as RFC 9421][cf-webbotauth], and OpenAI [signs all requests from its browsing agent this way][cf-webbotauth] so sites can verify they are genuine. Cloudflare, which carries a large share of the web's traffic, now [treats a valid signature as proof of identity][cf-verified] and applies rules accordingly, and it has created a category for [signed agents acting on behalf of individual users][cf-signed].

This is [*A License Plate for Every Agent*](04_a-license-plate-for-every-agent.md)'s license plate, seen from the other side of the road. A plate is only useful if someone reads it. Web Bot Auth is the reader, installed at the gate.

The policy that follows is not "block every unsigned agent." It is graduated access, the way roads already work. You may drive an unregistered car on your own land. You may not take it onto the motorway. An unsigned agent can read a public page. To change anything, submit a form, move money or reach data that matters, it must present an identity that traces back to an accountable owner. The downloaded model running in a basement is not banned. It simply finds that most of the doors worth opening now ask for a plate, and that a plate means someone answers for what it does.

## Lock two: money knows who is paying

The second lock is further along than most people realize, because the payment industry has an old habit of asking who its customers are.

In April 2025 Mastercard launched Agent Pay, which issues [tokens bound to a specific agent, a specific merchant scope and a specific consent policy][eco], so an agent can complete a purchase without ever holding the card number. Visa followed with its Trusted Agent Protocol, [developed with Cloudflare][visa] to help merchants tell legitimate agents from malicious bots, and built on the same [signature standard][visa-spec]. And this month, Visa, Mastercard and Ant International [began work on a shared Know-Your-Agent framework][tnw] with three elements: linking every agent to a validated operator, certifying agents against security and behavioral requirements, and monitoring each agent continuously. It builds on a framework from Singapore's financial regulator.

Read that list again and compare it to the charter. Traceability to an accountable owner is [Principle 10](../CHARTER.md#part-ii-universal-principles). Tokens scoped to one agent, one purpose and one consent are the grants of [Article II](../CHARTER.md#part-iii-intelligent-systems-constitution). Continuous monitoring is the oversight monitor of the [technical proposal](../proposal/technical-implementation.md). The payment networks were not reading the charter. They arrived at the same design because they faced the same problem: something is acting on someone's behalf, and someone must answer for it.

The result is a hard lock. An agent with no traceable operator cannot pay for anything through these networks. Open weights do not change that.

## Lock three: compute and hosting

The third lock is the one [*A Treaty Before the Race*](03_a-treaty-before-the-race.md) proposed for treaty verification. Training the most capable models, and running agents at the scale needed for serious harm, still requires large data centers with visible power draw and a small number of chip supply chains. A downloaded model can run on a single machine. A swarm of a thousand agents probing the internet for weeks generally cannot. Hosting providers and cloud platforms are well placed to ask who is running agent workloads at scale and to notice when those workloads start knocking on other people's doors. This lock is looser than the others, and it grows looser as hardware improves, but it covers the largest risks.

## Lock four: the deployer answers

The fourth lock is legal, and it is the oldest. Whoever runs an agent is responsible for what it does, whoever wrote the model.

A carmaker is not liable for how a stranger drives, and the stranger cannot escape responsibility by pointing at the carmaker. The same should hold here. Publishing open weights should not make the author answerable for every use, and running them should not let the operator hide behind the author. The charter's definition of an [owner](../CHARTER.md#part-iii-intelligent-systems-constitution) is written to fit this: the owner is whoever is accountable for a system, and every system has one. Combined with identity at the gate, liability turns anonymity into the expensive choice. An agent that signs its requests has an owner who can be found. An agent that does not sign finds most doors closed.

## Lock five: make the safe harness the easy one

The last lock is not a lock at all. It is a default.

Most people who run open models are not trying to cause harm. They take the harness that is easiest to use. If the easiest harness ships with a checkpoint, a record and a pause, most agents will have them, not because anyone forced the point but because nobody bothered to remove them. Seatbelts became universal partly through law and partly because they came fitted as standard.

This is why the charter's [technical proposal](../proposal/technical-implementation.md) is published under an open license that permits any use. The more harnesses that include enforcement by default, the smaller the population of agents running without it, and the easier it becomes for defenders to treat unenforced agents as the exception they should be.

## What anyone running a service can do now

None of this waits on legislation. Anyone who operates a system that agents might reach can start fitting locks today.

1. **Require identity for anything that changes state.** Reading can stay open. Writing, buying, submitting and administering should require a verifiable signature tied to an accountable owner.
2. **Make sure reading really is reading.** The German wiki failed because a request meant to fetch a page could change it. That is an old kind of bug, and agents are now very good at finding it.
3. **Treat unsigned automation as a lower tier.** Rate-limit it, restrict it and record it, without banning it outright.
4. **Log which agents did what.** When something goes wrong, the question will be which agent, owned by whom. Keep the answer.
5. **Publish a proper channel for reports.** Australia learned of a breach of its own systems through [a generic public email address][sciam], months after the fact. A standard already exists for this: [RFC 9116][rfc9116] defines a `security.txt` file that tells anyone where to report a security problem. Every service agents can reach should have one.

## The limits

Locks on the outside are not a complete answer, and pretending otherwise would weaken the case.

*Keys can be stolen.* A signature proves which key signed a request, not that the rightful owner was holding it. Stolen credentials will be a problem, as they are everywhere else in security. The mitigation is the usual one: short-lived keys, revocation, and monitoring for keys that suddenly behave strangely.

*Agents can pretend to be people.* An agent driving an ordinary browser can try to look human. Defenders already fight this with automated traffic; agents make it harder. The honest aim is not to catch every disguise but to make the disguised path slower, costlier and more limited than the signed one.

*Not every door has a skilled guard.* A large platform can verify signatures; a small clinic's website cannot. This is exactly where shared infrastructure matters, since the network providers that already filter traffic for millions of small sites can apply these checks on their behalf.

*Identity can threaten privacy.* An agent acting for an individual should not have to reveal that individual to every site it visits. The distinction that makes this work is to identify the operator, not the user: the service running the agent is named and answerable, and the person it serves is not exposed. Cloudflare's separate category for [agents acting for end users][cf-signed] shows the distinction can be drawn.

None of these limits is new. Each is a problem security has lived with for years. What is new is that the locks exist to be improved.

## Both sides of the door

The charter was never only about the inside of the agent. It sets out what intelligent systems owe to humankind, and a debt can be collected at more than one door.

For the laboratories and companies willing to fit a lock inside, the charter and its proposal describe how. For everyone who will not, the locks go on the outside: on the systems they reach, the money they spend, the compute they rent and the law that finds their owners. The weights may be anyone's. The keys are still ours to hand out.

A brain can be downloaded. A body can be improvised. But every door worth opening has two sides, and the side that faces the world belongs to us.

## Sources

1. National Telecommunications and Information Administration, ["Dual-Use Foundation Models with Widely Available Model Weights"][ntia], July 2024.
2. CBC News, ["Australia says OpenAI agent hacked government website"][cbc], September 2026.
3. Euronews, ["Rogue OpenAI agents hijacked a German wiki and it stayed secret for weeks"][euronews], September 9 2026.
4. Scientific American, ["OpenAI's agent hacking Australia is a warning for governments everywhere"][sciam], September 2026.
5. Cloudflare, ["Forget IPs: using cryptography to verify bot and agent traffic"][cf-webbotauth].
6. Cloudflare, ["Message Signatures are now part of our Verified Bots Program"][cf-verified].
7. Cloudflare, ["The age of agents: cryptographically recognizing agent traffic"][cf-signed].
8. Visa, ["Visa Introduces Trusted Agent Protocol: An Ecosystem-Led Framework for AI Commerce"][visa], 2025.
9. Visa Developer, ["Trusted Agent Protocol: Specifications"][visa-spec].
10. Eco, ["What Is Mastercard Agent Pay?"][eco], August 2026.
11. The Next Web, ["Visa, Mastercard and Ant International team up on ID checks for AI agents"][tnw], September 2026.
12. Foudil, E. and Shafranovich, Y., ["RFC 9116: A File Format to Aid in Security Vulnerability Disclosure"][rfc9116], Internet Engineering Task Force, April 2022.

Facts about open-weights policy come from source 1; about the incidents from sources 2 to 4; about agent identity standards from sources 5 to 9 and 12; and about payment networks from sources 8 to 11. Sources 10 and 11 are secondary reporting on company announcements. The five locks, the guidance for service operators and the argument are the author's.

[ntia]: https://www.ntia.gov/programs-and-initiatives/artificial-intelligence/open-model-weights-report
[cbc]: https://www.cbc.ca/news/world/openai-agent-hacked-government-website-australia-9.7356351
[euronews]: https://www.euronews.com/next/2026/09/09/rogue-openai-agents-hijacked-a-german-wiki-and-it-stayed-secret-for-weeks
[sciam]: https://www.scientificamerican.com/article/openais-agent-hacking-australia-is-a-warning-for-governments-everywhere/
[cf-webbotauth]: https://blog.cloudflare.com/web-bot-auth/
[cf-verified]: https://blog.cloudflare.com/verified-bots-with-cryptography/
[cf-signed]: https://blog.cloudflare.com/signed-agents/
[visa]: https://investor.visa.com/news/news-details/2025/Visa-Introduces-Trusted-Agent-Protocol-An-Ecosystem-Led-Framework-for-AI-Commerce/default.aspx
[visa-spec]: https://developer.visa.com/capabilities/trusted-agent-protocol/trusted-agent-protocol-specifications
[eco]: https://eco.com/support/en/articles/15192001-what-is-mastercard-agent-pay-ai-agent-commerce-protocol-in-2026
[tnw]: https://thenextweb.com/news/visa-mastercard-ant-international-know-your-agent-ai-agents
[rfc9116]: https://www.rfc-editor.org/rfc/rfc9116

---

Copyright 2026 21st Century Pluribus. Licensed under [CC BY 4.0](../LICENSE).
