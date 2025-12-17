# Pumpkin – Vision, Problem Statement, and Product Strategy (v3)

## 1) Vision

To eliminate the **"Assumption Tax"** in business. Pumpkin bridges the gap between a leader’s implicit intent and a team’s explicit execution. We turn vague chat requests into structured, crystal-clear actions, creating a fearless culture where bosses are forced to be clear, and staff are protected from guessing.

## 2) The Core Problem: The "Ambiguity Gap"

- **The "Visionary" Blinder:** Leaders and managers often assign tasks based on context that exists _only in their heads_. They mistakenly believe their instructions are obvious (e.g., "Fix the client deck" → _Which client? Due when?_).
- **The Fear of Clarification (Saving Face):** In hierarchical cultures like Hong Kong, employees often fear asking "dumb questions." Asking for details can be perceived as incompetence.
- **The "Guesswork Cycle":** Staff guess the requirements to avoid asking; they execute the wrong thing; managers get frustrated.
- **No Data Trail:** Because the "real" requirements were never written down, there is no way to prove why a task failed or succeeded.

## 3) Customers & Initial Beachhead

**Pivot:** Moving away from frontline drivers to **"Middle-Office" Operations Teams** who live in Microsoft Teams.

- **Primary (HK):**
  - **Logistics & Supply Chain:** Coordinators handling "urgent" shipment exceptions from Directors.
  - **Property & Facilities Mgmt:** Managers receiving abstract "tenant complaint" alerts.
  - **Boutique Agencies/Consultancies:** Junior staff interpreting high-level creative direction.
- **Secondary:** Regional HQs managing distributed ops teams across APAC.

## 4) Jobs‑to‑Be‑Done (JTBD)

1. _Force Clarity:_ "As a manager, help me delegate instantly, but stop me from sending vague orders that cause rework."
2. _Protect the Staff:_ "As an employee, give me a clear 'Definition of Done' so I don't have to guess or look stupid by asking."
3. _Standardize Execution:_ "Turn repetitive chaotic requests into a simple menu of options."
4. _Coach & Improve:_ "Show us how often we fail because instructions were unclear vs. execution was slow."

## 5) Product: Pumpkin Platform

### 5.1 Core Modules (Near‑term)

- **Smart Pumpkin Bot (The "Clarity Guard"):**
  - **The Vague-Buster:** If a manager types a short, ambiguous command (e.g., "Check the report"), the Bot _privately_ intercepts: _"I'm setting this up. To avoid confusion, please specify: Which report? Deadline?"_
  - **Adaptive Request Cards:** Replaces free text with structured forms in chat (e.g., "Incident Report," "Client Handoff," "Approval Request").
  - **"Clarify" Button:** A safe way for staff to push back. Clicking "Request Details" triggers the _Bot_ to ask the manager for more info, depersonalizing the conflict.

- **Workflow Templates (The "Pre-Thought" Library):**
  - Pre-built SOPs for common scenarios (e.g., "Customs Hold," "New Client Onboarding," "Vendor Payment").
  - Ensures the "Definition of Done" is pre-loaded, so the boss doesn't even have to think about it.
  - Versioning and localization (EN/Traditional Chinese).

- **Scorecards, Objectives & Performance:**
  - **The "Win Log":** Automates a record of "Tasks completed exactly as requested" for employee performance reviews.
  - **Clarity Metrics:** Tracks how often tasks require clarification loops (a metric for the _Manager's_ communication skills).
  - **Performance Scorecards:** Throughput, on-time rates, and "Blocker" frequency.

### 5.2 Mid‑term Extensions

- **Knowledge Base:** Auto-index resolved Relays. If a "Customs Hold" is solved, it becomes a searchable playbook for the next junior hire.
- **Cross-channel Connectors:** Email ingestion (converting client emails into Relay tasks) and WhatsApp (for communicating with external vendors).
- **Coaching Loops:** Nudges for managers who consistently send vague tasks (e.g., _"80% of your tasks require follow-up questions. Try using the 'Standard Assignment' template."_)

## 6) Differentiation

- **Active "Intervention" vs. Passive Tracking:** Competitors (Asana/Planner) assume the user knows what to type. Pumpkin actively structures the input to prevent ambiguity.
- **Psychological Safety:** Designed specifically to bridge the gap in hierarchical Asian workplaces. The Bot asks the hard questions so the staff doesn't have to.
- **Ops-Grade Speed:** Built for high-velocity chat environments, not slow project management portals.
- **Bilingual First:** Seamless switching between English (Management) and Chinese (Ops/Admin).

## 7) Representative Use Cases

- **Logistics Coordinator:** Director types _"Handle the delay."_ Pumpkin intercepts: _"Is this Air or Sea? Client A or B?"_ $\to$ Creates a structured ticket for the Ops team.
- **Property Management:** _"Tenant in 1204 is angry."_ $\to$ Pumpkin triggers the "Tenant Dispute SOP" (Step 1: Log complaint, Step 2: Check contract, Step 3: Assign Engineering).
- **Agency Project Manager:** _"Update the deck."_ $\to$ Pumpkin forces the assigner to attach the specific file and list the 3 key changes required.

## 8) Product Roadmap

**V0 (Internal Dev):** Azure Bot (Teams), "Smart Intercept" logic for vague text, basic adaptive cards.

**V1 (Pilot HK - Middle Office):**

- Focus on **Office Ops** templates (IT Request, Admin Approval, Client Handoff).
- "Clarify" button and private bot-manager coaching loop.
- Scorecards focused on "Rework Rate" and "Clarity."

**V2 (Scale):**

- Knowledge Base auto-indexing.
- Email-to-Relay connector (for client requests).
- Manager Coaching Insights (Communication style analysis).

**V3 (Ops OS):**

- Predictive prompts, cross-department dependencies, external vendor relays (WhatsApp integration).

## 9) Success Metrics

- **Clarity Index:** % of tasks created that require _zero_ follow-up questions.
- **Psychological Safety:** Reduction in "Stalled/Blocked" time caused by staff hesitation.
- **Execution:** On-time completion rate; reduction in Rework/Rejection rate.
- **Adoption:** Daily Active Relays per user.
- **Business:** Time-to-Value for new hires (onboarding speed using Relay SOPs).

## 10) Go‑to‑Market (Hong Kong first)

- **Target Persona:** COO, Operations Directors, or HR Leaders in mid-sized firms (50-500 staff).
- **Pitch:** "Productivity + Wellness." Reduce the anxiety of your team and the frustration of your managers.
- **Channel:** Microsoft 365 partners, HR Consultants, LinkedIn direct outreach to "Head of Operations."
- **Pricing:** Seat-based pricing with a "Pilot Pack" (includes custom Template setup).

## 11) Technical Foundations

- **Bot & Channels:** Azure Bot Framework (Teams focus), Adaptive Cards 1.5 (for rich forms).
- **AI Layer:** LLM (OpenAI/Azure) for intent detection ("Is this request vague?") and summarization.
- **Data:** Azure SQL + CosmosDB; strictly scoped permissions (manager private chats remain private).
- **Security:** Entra ID (SSO), Audit logging for all task changes.

## 12) Competitive Landscape & Positioning

- **Microsoft Copilot:** Great for _generating_ text, but bad at _enforcing_ process. It doesn't stop a boss from being vague.
- **Asana/Jira:** Too heavy/complex for quick ad-hoc office requests.
- **ServiceNow:** Too expensive and rigid for SMB ops.

**Positioning:** _Pumpkin is the AI-powered 'Chief of Staff' that ensures every instruction in Teams is clear, tracked, and actionable._

## 13) Risks & Mitigations

- **"Slowing Me Down" perception:** Managers might feel the "Intervention" is annoying.
  - _Mitigation:_ "Smart Bypass" for trusted managers, and emphasizing the time saved on _rework_ later.
- **Teams Adoption:** Ensuring the target companies are actually active on Teams.
  - _Mitigation:_ Strict qualification questions during sales (must be active M365 users).
- **Face/Culture:** Managers might feel insulted by a bot correcting them.
  - _Mitigation:_ Tune the Bot's tone to be "Helpful Assistant" rather than "Correction Officer."

## 14) Implementation Plan (Pilot)

1. **Diagnosis:** Review the last 2 weeks of team chat to identify "Ambiguity Hotspots."
2. **Template Setup:** Build 3 "Golden Templates" for the most common vague requests (e.g., "Urgent Issue," "Client Request," "Approval").
3. **Deploy Bot:** Enable the "Smart Intercept" feature.
4. **Review:** Weekly "Clarity Review" – show the manager how many hours were saved by getting it right the first time.

## 15) What “Great” Looks Like (12–16 weeks)

- Managers spend 50% less time explaining tasks after assigning them.
- "Rework" (doing the task twice) drops by 30%.
- New junior staff start contributing effectively in week 1 (guided by Relay SOPs).
- The phrase "What did you mean by that?" disappears from the public chat.

---
