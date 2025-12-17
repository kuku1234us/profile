# Master Blueprint: Personal Experience Website

## 1. Purpose of This Document
This document defines the **core goals, philosophy, and information architecture** of the personal experience website. It serves as the **single source of truth** against which all future design, content, and engineering decisions should be validated.

Any future documentation for pages, components, interactions, or content must:
- Clearly map back to the goals defined here
- Reinforce the intended audience experience
- Respect the structural and conceptual boundaries laid out in this blueprint

If a feature or section does not strengthen this blueprint, it should not be built.

---

## 2. High-Level Goals of the Website

### 2.1 Replace the CV With an Experience
The website is **not** a digital resume or a downloadable CV. It exists because a traditional CV fails to communicate:
- The depth and breadth of experience across domains
- The chronological evolution of skills and interests
- The way different disciplines intersect over time

The website should feel **exploratory, narrative, and intentional**, allowing visitors to *experience* a career rather than scan a document.

---

### 2.2 Allow Self-Directed Discovery
Different visitors care about different things:
- A software engineering interviewer may only care about systems, languages, and architecture
- A capital markets professional may care about trading, funds, and financial infrastructure
- A general visitor may simply want to understand the journey

The website must allow visitors to **choose their own path** through the content without forcing a linear reading order.

This is achieved through:
- Tag-based filtering
- Multiple entry points (Journey, Explore, Projects, Case Studies)
- Lateral navigation between related content

---

### 2.3 Preserve Narrative Integrity
While filtering and non-linear browsing are supported, the website must still communicate a **coherent life trajectory**.

The site should balance:
- **Story** (chronological progression)
- **Index** (search, tags, filters)

Neither should dominate the other.

---

### 2.4 Signal Craft, Curiosity, and Judgment
The website should communicate not just *what* was done, but:
- Why certain problems were chosen
- How different technologies and domains were explored
- The ability to move fluidly between experimentation and production

This is especially important for personal software projects, which represent curiosity, learning velocity, and engineering taste.

---

## 3. Intended Audience & Viewing Modes

The website is designed for **multiple audience modes**, not a single persona.

### 3.1 Narrative Mode (First-Time Visitor)
- Enters via the home page
- Scrolls through a visual timeline
- Gains an emotional and chronological understanding of the journey

### 3.2 Targeted Evaluation Mode (Recruiter / Interviewer)
- Enters via Explore or Projects
- Filters by domain, region, or role
- Consumes only the relevant slices of experience

### 3.3 Deep Validation Mode (Senior Reviewer / Peer)
- Reads case studies
- Examines system design decisions
- Cross-references projects and timeline

All three modes must be supported without duplication of content.

---

## 4. Core Structural Philosophy

### 4.1 Content Is Atomic and Reusable
All experience is broken down into **atomic units**:
- Timeline periods
- Projects
- Case studies

Each unit:
- Has metadata (tags, dates, domains)
- Can appear in multiple contexts (Journey, Explore, Projects)
- Is written once, reused everywhere

---

### 4.2 Tags Are the Primary Indexing Mechanism
Tags are not decorative; they are **first-class navigation tools**.

Primary tag dimensions include:
- Region (US, Asia-Pacific, Middle East, Global)
- Domain (Software Engineering, Quantitative Trading, Capital Markets, Fintech, Research)
- Role (Engineer, Architect/CTO, Quant, Operator, Consultant)
- Platform (Windows, Mobile, Web)
- Technology (JavaScript, Swift, Flutter, Python, CSS, etc.)

Tags must be:
- Consistent
- Finite
- Shared across sections

---

## 5. Top-Level Information Architecture (Navbar)

The navigation bar defines the **mental model** of the website. Each item represents a distinct way of viewing the same underlying experience.

### 5.1 Journey
**Purpose:**
- Present the chronological narrative
- Establish context and emotional continuity

**Characteristics:**
- Timeline-driven
- Visual
- Minimal filtering

---

### 5.2 Explore
**Purpose:**
- Enable self-directed discovery
- Act as the primary filter hub

**Characteristics:**
- Tag-based filtering
- Cross-sectional view of all content
- Entry point for recruiters

---

### 5.3 Projects
**Purpose:**
- Showcase hands-on software experimentation
- Demonstrate engineering craft and curiosity

**Characteristics:**
- Personal and exploratory in tone
- Organized by platform, technology, and focus
- Emphasizes learning and decision-making over polish

---

### 5.4 Case Studies
**Purpose:**
- Provide deep, outcome-oriented proof of impact

**Characteristics:**
- Fewer items, high depth
- Structured narratives (problem → approach → result)
- Strong linkage to timeline and projects

---

### 5.5 Capabilities
**Purpose:**
- Abstract experience into transferable strengths

**Characteristics:**
- Synthesizes across timeline, projects, and case studies
- Answers the question: "What can you do?"

---

### 5.6 About
**Purpose:**
- Provide personal context and philosophy
- Humanize the experience

---

### 5.7 Contact
**Purpose:**
- Enable intentional follow-up
- Minimize friction

---

## 6. Design Principles

- **Experience-first, not information-first**
- **Clarity over completeness**
- **Curation over exhaustiveness**
- **Consistency across views**

Every component and page must be evaluated against these principles.

---

## 7. How This Blueprint Should Be Used

All future documentation (page specs, component designs, data models) must:
- Reference this blueprint explicitly
- Identify which goal(s) it supports
- Explain how it fits into the overall experience

This document is the foundation. Everything else is implementation.

