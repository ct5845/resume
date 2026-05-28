## Professional Summary

**Lead web developer with 17+ years of experience, recently focused on integrating LLM-powered agents and AI features into production web platforms.** At Alterian, I led the team that built and shipped Bedrock-backed analytics and conversational data tooling to real customers, on top of large-scale data infrastructure on AWS.

**Architectural breadth across the modern web stack** — Go and TypeScript backends, Angular and component-driven UI, server-rendered HTMX/Alpine, and AWS-native infrastructure. Comfortable picking the right tool for the problem; pragmatic about stack choices and quick to come up to speed in unfamiliar ones.

**Strong record of mentoring developers, modernising legacy stacks, and turning manual delivery processes into automated CI/CD pipelines.** Equally happy in a Lead/Principal role setting direction or as a Senior IC building the hard parts.

---

## Experience

### Senior Web Developer ➠ Lead Web Developer
***Alterian (2015 to Present)***

- **AI & LLM Integration:**
  Designed and shipped production LLM features using **AWS Bedrock**, including conversational data insights over large-scale customer-journey datasets and LLM-powered analytics surfaced inside the product UI. Built **tool-calling architecture** that lets the model query internal APIs and structured data stores (SQL, Parquet/DuckDB) as part of answering, rather than stuffing raw data into prompts.
- **Technical Architecture & Modernisation:**
  Led two major platform transformations. First, unified the web stack on **Angular**, **Material Design**, **Nx monorepos**, **Tailwind CSS**, and **Storybook** with atomic design principles. More recently, led a strategic move to **Go** with lightweight HTMX/Alpine front-ends for new products, delivering faster CI/CD, lower hosting cost, and a smaller surface area for the team to maintain — while keeping React/Angular skills available where they're the right fit.
- **Leadership & Team Development:**
  Provide technical leadership and mentoring across the development team, guiding Junior Developers through to Senior roles and growing UI specialists into full-stack engineers. Run code reviews, design sessions, and architecture discussions; foster a culture of continuous learning and cross-functional collaboration.
- **Product Strategy & Stakeholder Management:**
  Lead UX improvement initiatives and feature prioritisation aligned with business objectives. Bridge communication between engineering, product, and commercial teams — translating business requirements into technical solutions and managing stakeholder expectations across delivery cycles.
- **DevOps & Cloud Infrastructure:**
  Led the migration from manual 6-weekly deployments to automated CI/CD using **Docker**, **ECS Fargate**, and **Bitbucket Pipelines**, giving the team complete deployment control and continuous delivery. Built cloud-native architecture across the AWS ecosystem (**ECS, Lambda, S3, EventBridge, DynamoDB, Cognito, Bedrock**) with **Terraform**, and established secure development practices (SSDLC) and a comprehensive testing strategy.
- **Data Engineering & Analytics:**
  Built data preprocessing and analytics pipelines over large web-traffic datasets, including **Parquet**-based storage queried with **DuckDB**, feeding both classical visualisations and LLM-driven insights.

### System Tester ➠ DevOps ➠ Senior Web Developer
***Computershare (2008 to 2015)***

Progressed from system testing through DevOps into senior web development across multiple products. Championed mobile-first and progressive-enhancement strategies for legacy applications, introduced test automation that reduced QA cycle times, and worked directly with business clients on demos, requirements gathering, and wireframing. Gained 3rd-line support experience and contributed to feature development, technical risk assessment, and resource planning.

---

## Technical Stack

**Currently building with:** Go, HTMX/Alpine, TypeScript, AWS (Bedrock, Lambda, ECS),
Angular, Tailwind, Terraform, Docker.

**LLM work:** Production Bedrock features with tool use, structured outputs,
and eval-driven development.

**Comfortable in:** React, Node.js, PHP, MySQL, Parquet/DuckDB, Nx monorepos, Storybook, Figma.

**Earlier career:** C#, .NET, ASP.NET, SQL Server.

---

## Projects

### Job-Search Agent
**Go · Claude API · MCP · local LLMs (LM Studio)**

- **Built an LLM-powered agent** that aggregates job postings from job-posting sources, scores each against a structured criteria profile, and produces a ranked daily briefing — turning a noisy manual search into a filtered, explained shortlist.
- **Designed around clean interfaces** (pluggable sources and LLM backends), so adding a new job source or swapping the model is a single new file. Developed against a local model via LM Studio for fast, zero-cost iteration, then switched to Claude for production-quality scoring.
- **Structured-output classification** with schema-constrained JSON, deterministic scoring, and an eval set that catches prompt regressions — the same eval-driven approach I use for production LLM features.
- **Exposed as an MCP server**, so the agent's tools are usable directly from Claude Desktop as well as the CLI.

### Bristol Rowing
[bristolrowing.co.uk](https://bristolrowing.co.uk) — **Designer, Developer, and Maintainer**

- **Built and maintain a full rowing-club website** with Angular front-end and PHP/MySQL back-end.
- **Delivered a CMS** that lets the communications team manage public content independently.
- **Developed the membership portal**, covering resource management, bookings, treasury/finance, and event coordination.

---

## Education

### Bristol University _(2005 to 2008)_
**Computer Science (BSc) — 2:1**

### Chislehurst and Sidcup Grammar School _(1998 to 2005)_
**GCSEs and A Levels**

---

## Additional Leadership Experience

### Trustee, City of Bristol Rowing Club _(2013 to 2019)_
Contributed to strategic direction and operational guidance for a charity with a large membership and substantial annual turnover.

### Head Coach, City of Bristol Rowing Club Women's Squad _(2016 to 2021)_
Led a performance sports team through measurable growth in both participation and competitive results. Built a culture focused on individual development and process-driven improvement, balancing competitive goals with athlete wellbeing.