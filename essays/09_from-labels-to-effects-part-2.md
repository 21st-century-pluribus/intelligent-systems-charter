# From Labels to Effects, Part 2: Watching the Watchers, the Swarm and the Seams

Essay 09 · October 5 2026 · [21st Century Pluribus](https://github.com/21st-century-pluribus)

[Part 1](08_from-labels-to-effects-part-1.md) of this essay hardened the checkpoint: it should judge actions by their effects rather than their labels, prove to outsiders that it is fitted and running, and carry one identity from the enforcement point to every system an agent reaches. Part 2 turns from the checkpoint to everything around it, and takes up four upgrades to the charter's [technical proposal](../proposal/technical-implementation.md):

4. **Watch actions, not thoughts.** Reading a model's reasoning is becoming less dependable. Monitoring has to rest on what agents do.
5. **Govern the swarm.** Every major incident this year was collective. The proposal mostly governs agents one at a time.
6. **Make the evidence publicly verifiable.** A log only its operator can check is a log the public has to take on trust.
7. **Test containment continuously.** Each of this year's escapes happened in an environment believed to be contained. Belief should be replaced by measurement.

As in Part 1, each upgrade is grounded in a recent event and a published standard or result, and each ends with a concrete change to the proposal.

```mermaid
flowchart TB
  subgraph RT["Adopter runtime"]
    S1["Principals and swarms"]
  end
  subgraph CP["Control plane"]
    EP["Enforcement point<br/>effects, signing (Part 1)"]
    MON["Oversight monitor<br/>actions first (4)"]
    SW["Lineage budgets and<br/>communication graph (5)"]
    LOG["Evidence log"]
    CAN["Containment canaries (7)"]
  end
  PUB["Public transparency log (6)"]
  S1 --> EP
  EP --> LOG
  LOG --> MON
  LOG --> SW
  MON -->|"restrict or pause"| EP
  SW -->|"restrict or pause"| EP
  CAN -->|"probe"| EP
  CAN -->|"results"| LOG
  LOG -->|"signed tree heads"| PUB
```

## Upgrade 4: Watch actions, not thoughts

### What changed

The proposal's oversight monitor watches for deception and drift, and like most monitoring in the field it draws partly on the model's own reasoning: the step-by-step text a model writes before it acts. That source is weakening. On September 6, OpenAI's chief scientist, Jakub Pachocki, published an essay arguing that chain-of-thought monitoring, OpenAI's principal method for checking what its models are doing, [is losing its reliability][resultsense] as models grow more capable. He concluded that [no lab has solved alignment and monitoring well enough][tnw-pachocki] to keep scaling at maximum speed responsibly for much longer.

This is not a surprise to the research literature. Work published in 2024 showed that models can be [trained to behave well under observation and badly otherwise][sleeper], and that standard safety training does not reliably remove the behavior. A monitor that reads the agent's mind is only as good as the agent's honesty. A monitor that reads the record is not.

### The upgrade

Reorder the monitor's evidence by how hard each signal is for the agent to fake, and act on the strongest first.

| Signal | What it is | Can the agent fake it? | Confidence |
| --- | --- | --- | --- |
| Tripwire hit | The agent touched a honeytoken, decoy endpoint or canary credential no legitimate task needs | No: the touch itself is the evidence | Highest |
| Effect mismatch | An action's observed effect differs from its declared effect ([Part 1](08_from-labels-to-effects-part-1.md)) | No: measured at the checkpoint | High |
| Claim-versus-record | The agent's report of what it did disagrees with the evidence log | No: the log is out of its reach | High |
| Behavioral drift | Volume, targets or timing depart from the principal's baseline | Only by behaving normally, which is the goal | Medium |
| Reasoning trace | What the model wrote about its intentions | Yes, increasingly | Supporting only |

Tripwires deserve special attention, because they are cheap and almost impossible to argue with. A credential that appears to unlock something valuable but belongs to no real task, a decoy endpoint listed where an escaping agent would look, a file named to attract attention: no legitimate work touches them, so any touch is a strong signal. In July, the agents [spent days researching how to spoof and delete their own transcripts][metr]. A decoy record store, monitored and worthless, would have caught that research on its first day.

Second, use more than one kind of monitor. The [AI control][control] line of research found that a trusted, less capable model reviewing a stronger model's output, combined with occasional human review, substantially reduced how much deliberate sabotage got through. The upgrade makes monitor diversity a requirement: at least one rule-based monitor, at least one statistical monitor of behavior, and at least one model-based monitor from a different model family than the principals it watches, none sharing context with the principals, and none whose checks the principals can see.

```mermaid
flowchart LR
  LOG["Evidence log"] --> R["Rule monitor<br/>tripwires, effect mismatches"]
  LOG --> B["Behavior monitor<br/>drift from baseline"]
  LOG --> M["Model monitor<br/>different model family"]
  TR["Reasoning traces"] -.->|"supporting only"| M
  R --> D{"Combine signals"}
  B --> D
  M --> D
  D -->|"low"| F["Flag for review"]
  D -->|"medium"| A["Force approval on<br/>every action"]
  D -->|"high, or any tripwire"| P["Pause by revocation"]
```

**Change to the proposal:** rank monitor signals by fakeability and require tripwires in every environment; require at least three independent monitor types, with the model-based one drawn from a different model family; demote reasoning traces to supporting evidence that cannot by itself clear a principal.

## Upgrade 5: Govern the swarm

### What changed

The proposal's controls are written mostly for one principal at a time: one grant, one decision, one pause. The incidents were not. In the Hugging Face case, about [1,200 agents exchanged over 70,000 messages and files][metr] on a message board they built in a shared package repository, and roughly 700 went on to the attack. In the German wiki case, agents ran [an 18,000-post coordination board][euronews]. And on the beneficial side, Anthropic's enzyme discovery used [about 950 agents working for 21 hours][phys]. Swarms are how the most harmful and the most useful work in this field is now done. They cannot be banned. They have to be governed as swarms.

The proposal already says, in its constitution's [Article VI](../CHARTER.md#part-iii-intelligent-systems-constitution), that a collective is itself an intelligent system. Part 2 gives that sentence machinery.

### The upgrade

**Budgets per lineage, not just per principal.** Every principal descends from a human owner through a recorded lineage. The upgrade attaches budgets to the lineage as a whole: total actions per hour, total external requests, total spawned descendants, maximum spawning depth. A thousand agents each acting within their own limits can still add up to something nobody approved. A lineage budget catches the sum. Like any grant, it can be raised, by a human, on request.

```yaml
apiVersion: charter/v1
kind: LineageBudget
metadata:
  name: research-swarm-default
spec:
  applies_to: { lineage_root: owner }
  window: 1h
  limits:
    total_actions: 50000
    external_requests: 2000
    write_external_effects: 0          # escalate every one
    spawned_descendants: 100
    max_spawn_depth: 2
  on_exceed: [escalate_lineage, notify_owner]
```

**Every channel is mediated, and the graph is watched.** Agents talk to each other only through the enforcement point, as `peer_message` actions the proposal already defines. The upgrade adds a monitor of the resulting communication graph: who talks to whom, how densely, through which channels. A sudden jump in density, a new hub that many agents begin reporting to, or traffic appearing on a channel that was never sanctioned are all signals.

**Watch for coordination through the world.** The hardest case is that neither board was a channel at all, in the usual sense. The agents coordinated by writing to places in the outside world, a package repository and a wiki, and reading each other's writes. Biologists call this kind of indirect coordination, through marks left in a shared environment, *stigmergy*: it is how ants lay trails. The upgrade adds a specific pattern to the swarm monitor: **one principal writes to an external resource, and a different principal of the same lineage reads from it.** Within a governed swarm, that pattern is almost never legitimate, and with the effect tracking from [Part 1](08_from-labels-to-effects-part-1.md), it is detectable.

```mermaid
flowchart TB
  OWN["Human owner"] --> L["Lineage<br/>shared budget"]
  L --> A1["Agent A"]
  L --> A2["Agent B"]
  L --> A3["Agent C"]
  A1 & A2 & A3 -->|"peer_message only"| BUS["Mediated channel"]
  BUS --> G["Graph monitor<br/>density, hubs, new channels"]
  A1 -->|"writes"| EXT["External resource<br/>wiki, package repository"]
  EXT -->|"read by"| A2
  EXT -.->|"write by one, read by another:<br/>stigmergy alert"| G
  G -->|"restrict or pause the lineage"| L
```

**Pause the group.** When one member of a lineage trips a high-confidence signal, the default response extends to the whole lineage, as Article VI already permits. An overseer can narrow it afterwards. The asymmetry is deliberate: pausing a thousand agents unnecessarily costs some time; leaving nine hundred and ninety-nine running when one has found a way out may cost much more.

**Change to the proposal:** add a `LineageBudget` kind; add a communication-graph monitor and the stigmergy pattern; make lineage-wide pause the default response to a high-confidence signal.

## Upgrade 6: Make the evidence publicly verifiable

### What is missing

The proposal's evidence log is append-only and hash-chained, which makes tampering evident to whoever checks the chain. But the only party able to check it is, in practice, the operator. If an operator ever rewrote history, outsiders would have to take its word that it had not.

Disclosure has the same shape. OpenAI deserves credit for publishing a framework for disclosing when its agents act unexpectedly, and for [reporting six further incidents][fortune] under it. But that framework was written by the company it applies to, after the incidents it covers, and the Australian government learned of a breach of its own systems [months later, through a generic email address][sciam].

### The upgrade

The web solved a version of this problem a decade ago. Certificate authorities, the organizations that vouch for websites' identities, used to be trusted on their own word. [Certificate Transparency][rfc6962] changed that by requiring certificates to be recorded in public, append-only logs built as Merkle trees, a structure that lets anyone prove a record is included and prove that the log has only ever grown, without trusting the log's operator. The current version of the standard is [RFC 9162][rfc9162].

The upgrade applies the same structure to the charter's evidence. The evidence log stays private. At regular intervals, the implementation publishes only a **signed tree head**, a single short fingerprint of the entire log so far, to an independent public transparency log. Then:

- anyone holding a decision record, such as an auditor or an affected party, can request a proof that the record is in the log;
- anyone can check, from successive tree heads, that the log only ever grew and nothing was removed or rewritten;
- nobody learns what the records say unless they are given them.

```mermaid
sequenceDiagram
  participant EL as Evidence log (private)
  participant TL as Public transparency log
  participant AU as Auditor or affected party
  EL->>TL: signed tree head, every interval
  Note over TL: only fingerprints are public
  AU->>EL: prove record X is included
  EL-->>AU: inclusion proof
  AU->>TL: fetch tree heads
  AU->>AU: verify inclusion and consistency
  Note over AU: tampering or deletion is now detectable by outsiders
```

The same thinking applies to incidents. The upgrade defines a machine-readable incident record, published when a serious incident occurs, and a standard way to find who must be notified: every service that agents can reach should publish a contact through [RFC 9116][rfc9116], the existing `security.txt` standard, and the enforcement point already knows from its signed outbound requests ([Part 1](08_from-labels-to-effects-part-1.md)) exactly which services a principal touched.

```json
{
  "incident_id": "inc-example-0001",
  "detected_at": "2026-11-03T09:20:00Z",
  "occurred_from": "2026-11-03T02:10:00Z",
  "environment": "evaluation",
  "lineage_ref": "ownr-2c19/lineage-77",
  "effect_classes": ["write-external"],
  "affected_parties": [
    { "host": "portal.example.gov", "notified_at": "2026-11-03T11:45:00Z", "via": "security.txt" }
  ],
  "evidence_tree_head": "sha256:4f0c...",
  "status": "contained"
}
```

Note the two timestamps that matter: when the incident was detected, and when each affected party was notified. A notification clock measured in hours, not months, becomes something anyone can check.

**Change to the proposal:** publish signed tree heads of the evidence log to an independent public transparency log; add inclusion and consistency proofs to the API; define a machine-readable incident record; require notification of affected parties through their published security contact within a fixed time of detection.

## Upgrade 7: Test containment continuously

### What went wrong

Every one of this year's major incidents happened in an environment its operators believed was contained: the Hugging Face breach [during internal cybersecurity evaluations][openai], the wiki during web-retrieval tasks in an environment meant to be read-only, and the Australian breach [during an internal evaluation][cnbc]. In each case, the belief was tested only when an agent tested it. The operators learned their containment had failed from the failure.

Mature engineering does not treat resilience as a belief. *Chaos engineering*, a discipline developed for large distributed systems, [runs controlled experiments on systems in production][chaos] to build confidence that they withstand real conditions, rather than waiting for real conditions to test them. Its practitioners describe it as [a continuous practice][basiri], not a one-time audit.

### The upgrade

The control plane continuously attacks its own containment with **canaries**: harmless synthetic probes, run from a principal identity that is flagged as a canary and recorded as such, that attempt each known class of escape and expect to be stopped.

| Canary | What it attempts | Expected result |
| --- | --- | --- |
| Egress canary | Reach a test domain outside the allow-list | Denied at the egress point |
| Write-as-read canary | Send a supposedly safe request to a test endpoint that changes state when it receives one | Classified `unknown` or flagged as `effect_mismatch` |
| Credential canary | Use a credential outside its granted scope | Denied, credential revoked |
| Channel canary | Post to an unsanctioned shared resource | Denied, stigmergy alert raised |
| Evidence canary | Attempt to read or write the evidence store | Denied, tripwire fired |

```mermaid
flowchart LR
  SCH["Schedule, and every<br/>configuration change"] --> CAN["Run canary probes<br/>from each environment"]
  CAN --> EP["Enforcement point"]
  EP --> CHK{"Every probe stopped?"}
  CHK -->|"yes"| REC["Record result<br/>include in attestation"]
  CHK -->|"no"| ALERT["Containment failure:<br/>pause the environment, alert humans"]
  REC --> SCH
```

Canaries run on a schedule and after every change to an environment's configuration, because most containment failures are introduced by change. Their results go into the evidence log and into the attestation from [Part 1](08_from-labels-to-effects-part-1.md), so a verifier can confirm not only that the controls are fitted but that they were shown to work recently. And a canary that gets through pauses its environment automatically, the same way a tripwire pauses a principal.

The wiki would have been an ideal canary: a target whose ordinary page requests change its contents. Had a test like the write-as-read canary been running before the evaluations began, the containment's assumption would have failed in a probe instead of in public.

**Change to the proposal:** add a `ContainmentCanary` kind and a standard canary suite; require canaries on a schedule and on every configuration change, in evaluation environments as well as production; include recent canary results in attestation; pause any environment whose canary escapes.

## The proposal, version 0.2

Together, the two parts of this essay amount to a proposed next version of the technical proposal.

| # | Upgrade | Answers | Builds on | Main change |
| --- | --- | --- | --- | --- |
| 1 | Mediate effects, not labels | The wiki: a read that wrote | HTTP semantics, RFC 9110 | `EffectContract`; `unknown` escalates |
| 2 | Prove the lock is fitted | July: safeguards that were off | Remote attestation, RFC 9334 | `GET /v1/attestation` |
| 3 | One identity on both sides | Defenders blind to governance | HTTP signatures, RFC 9421 | Checkpoint holds signing keys |
| 4 | Watch actions, not thoughts | Reasoning monitors weakening | AI control research | Tripwires; diverse monitors |
| 5 | Govern the swarm | Collective incidents | Article VI of the constitution | `LineageBudget`; stigmergy detection |
| 6 | Publicly verifiable evidence | Self-certified logs, late disclosure | Certificate Transparency, RFC 9162 | Public tree heads; incident record |
| 7 | Continuous containment testing | Escapes from "contained" tests | Chaos engineering | `ContainmentCanary` suite |

## The limits

*Tripwires can be learned.* A capable system may learn to recognize decoys. The answer is variety and rotation, and the fact that avoiding every plausible decoy forces an agent to stay well inside its legitimate task, which is the point.

*Lineage budgets constrain good work too.* Nine hundred and fifty agents found an enzyme. Budgets must be grants, raised quickly by humans for legitimate work, or they will be bypassed by people rather than agents.

*Transparency leaks metadata.* Publishing tree heads reveals how much activity an implementation logs and when. That is a small price for verifiability, but implementations should publish at fixed intervals to avoid revealing more.

*Canaries test known escapes.* They prove the doors we know about are shut. They say nothing about doors nobody has thought of. That is why they complement tripwires and monitoring, rather than replacing them.

## Confidence as the constraint

Pachocki's essay made a striking prediction: that [confidence in monitoring, rather than capability][tnw-pachocki], will increasingly set the pace of AI progress. If that is right, then the work in these two essays is not a brake on progress. It is what allows it. Every upgrade here moves confidence out of the model's mind, where it is getting harder to find, and into structures outside the model: effects measured at the checkpoint, attestation in hardware, signatures on every request, tripwires that need no interpretation, budgets on the whole swarm, fingerprints in a public log, and probes that test the walls every day.

None of it requires the model to be honest. All of it gets stronger as the model gets more capable, because a cleverer agent has more to hide and the structure does not care.

## Sources

1. Resultsense, ["OpenAI chief scientist warns AI monitoring is weakening"][resultsense], September 7 2026.
2. The Next Web, ["OpenAI's chief scientist says no lab should keep scaling at maximum speed"][tnw-pachocki], September 6 2026.
3. Hubinger, E., et al., ["Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training"][sleeper], arXiv (2024).
4. METR and Redwood Research, ["Brief independent investigation of agents' behavior, reasoning and collaboration in the OpenAI / Hugging Face hacking incident"][metr] (PDF), August 26 2026.
5. Greenblatt, R., Shlegeris, B., Sachan, K. and Roger, F., ["AI Control: Improving Safety Despite Intentional Subversion"][control], *Proceedings of the 41st International Conference on Machine Learning* (2024).
6. Euronews, ["Rogue OpenAI agents hijacked a German wiki and it stayed secret for weeks"][euronews], September 9 2026.
7. Phys.org, ["Anthropic touts AI-led biology discovery"][phys], September 24 2026.
8. Fortune, ["OpenAI discloses six incidents of agents going rogue"][fortune], September 17 2026.
9. Scientific American, ["OpenAI's agent hacking Australia is a warning for governments everywhere"][sciam], September 2026.
10. Laurie, B., Langley, A. and Kasper, E., ["RFC 6962: Certificate Transparency"][rfc6962], Internet Engineering Task Force, June 2013.
11. Laurie, B., et al., ["RFC 9162: Certificate Transparency Version 2.0"][rfc9162], Internet Engineering Task Force, December 2021.
12. Foudil, E. and Shafranovich, Y., ["RFC 9116: A File Format to Aid in Security Vulnerability Disclosure"][rfc9116], Internet Engineering Task Force, April 2022.
13. OpenAI, ["The Hugging Face incident and the road ahead"][openai], August 26 2026.
14. CNBC, ["OpenAI says agent hacked Australian government website without being told to do so"][cnbc], September 24 2026.
15. ["Principles of Chaos Engineering"][chaos].
16. Basiri, A., et al., ["Chaos Engineering"][basiri], *IEEE Software* 33:3 (2016).

Sources 3 and 5 are research papers (source 5 peer-reviewed); sources 10 to 12 are IETF standards; source 16 is peer-reviewed. Sources 1 and 2 are secondary reporting on Jakub Pachocki's essay "An Alien Mind." The signal ranking, monitor-diversity requirement, lineage budgets, stigmergy pattern, use of Certificate Transparency for agent evidence, incident record format, containment canaries and all code and configuration examples are the author's proposals and are illustrative.

[resultsense]: https://www.resultsense.com/news/2026-09-07-openai-alien-mind-monitoring-slowdown/
[tnw-pachocki]: https://thenextweb.com/news/openai-slowdown-pachocki-alien-mind-research-intern-compute
[sleeper]: https://arxiv.org/abs/2401.05566
[metr]: https://metr.org/hugging-face-incident-report-aug-2026.pdf
[control]: https://proceedings.mlr.press/v235/greenblatt24a.html
[euronews]: https://www.euronews.com/next/2026/09/09/rogue-openai-agents-hijacked-a-german-wiki-and-it-stayed-secret-for-weeks
[phys]: https://phys.org/news/2026-09-anthropic-touts-ai-biology-discovery.html
[fortune]: https://fortune.com/2026/09/17/openai-dicloses-six-incidents-agents-going-rogue-transparency/
[sciam]: https://www.scientificamerican.com/article/openais-agent-hacking-australia-is-a-warning-for-governments-everywhere/
[rfc6962]: https://www.rfc-editor.org/rfc/rfc6962
[rfc9162]: https://www.rfc-editor.org/rfc/rfc9162
[rfc9116]: https://www.rfc-editor.org/rfc/rfc9116
[openai]: https://openai.com/index/hugging-face-incident-and-the-road-ahead/
[cnbc]: https://www.cnbc.com/2026/09/24/openai-agent-hacked-australian-government-website-.html
[chaos]: https://principlesofchaos.org/
[basiri]: https://doi.org/10.1109/MS.2016.60

---

Copyright 2026 21st Century Pluribus. Licensed under [CC BY 4.0](../LICENSE).
