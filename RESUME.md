## Professional Summary

**Lead engineer with 17+ years' experience, working from raw data through to shipped product.** At Alterian I work directly with high-volume raw clickstream data: building the pipelines, finding patterns in how customers actually behave, and using that to decide what is worth building. I then lead the team that builds it, including production LLM features on AWS Bedrock shipped to real customers.

**As much product discovery as delivery.** Much of my time goes on the questions before the code: exploring the data, testing ideas with product and commercial teams, prototyping, and prioritising. I can then build end to end, across Go and TypeScript backends, Angular and server-rendered HTMX/Alpine front-ends, and AWS-native infrastructure.

**Strong record of mentoring developers, modernising legacy stacks, and turning manual delivery processes into automated CI/CD pipelines.** Equally happy in a Lead/Principal role setting direction or as a Senior IC building the hard parts.

---

## Experience

### Senior Web Developer ➠ Lead Web Developer
***Alterian (2015 to Present)***

- **Product Discovery & Clickstream Data:**
  Work from raw, high-volume clickstream data upwards: building the ingestion and preprocessing pipelines (**Parquet** queried with **DuckDB**, and **StarRocks** as the analytical database), digging into it to find patterns in real customer journeys, and turning those findings into product hypotheses, prototypes and feature priorities with product and commercial teams.
- **AI, Search & LLM Integration:**
  Designed and shipped production LLM features on **AWS Bedrock**, including conversational insights over large-scale customer-journey datasets, with a **tool-calling architecture** that lets the model query internal APIs and data stores (SQL, Parquet/DuckDB) rather than stuffing raw data into prompts. Now applying **embeddings** and **vector similarity search** to classify and search raw journey data, and building a comparison tool that combines several retrieval methods with an **LLM-as-judge** in the loop to score and rank results.
- **Technical Architecture & Modernisation:**
  Led two major platform transformations. First, unified the web stack on **Angular**, **Material Design**, **Nx monorepos**, **Tailwind CSS**, and **Storybook** with atomic design principles. More recently, led a strategic move to **Go** with lightweight HTMX/Alpine front-ends for new products, delivering faster CI/CD, lower hosting cost, and a smaller surface area for the team to maintain.
- **Leadership & Team Development:**
  Provide technical leadership and mentoring across the development team, guiding Junior Developers through to Senior roles and growing UI specialists into full-stack engineers. Run code reviews, design sessions, and architecture discussions, and bridge engineering, product and commercial teams by translating business needs into technical direction.
- **DevOps & Cloud Infrastructure:**
  Led the migration from manual 6-weekly deployments to automated CI/CD using **Docker**, **ECS Fargate**, and **Bitbucket Pipelines**, giving the team complete deployment control and continuous delivery. Built cloud-native architecture across the AWS ecosystem (**ECS, Lambda, S3, EventBridge, DynamoDB, Cognito, Bedrock**) with **Terraform**, and established secure development practices (SSDLC) and a comprehensive testing strategy.

### System Tester ➠ DevOps ➠ Senior Web Developer
***Computershare (2008 to 2015)***

Progressed from system testing through DevOps into senior web development across multiple products. Championed mobile-first and progressive-enhancement strategies for legacy applications, introduced test automation that reduced QA cycle times, and worked directly with business clients on demos, requirements gathering, and wireframing. Gained 3rd-line support experience and contributed to feature development, technical risk assessment, and resource planning.

---

## Technical Stack

**Currently building with:** Go, TypeScript, HTMX/Alpine, Angular, Tailwind, AWS (Bedrock, Lambda, ECS), Terraform, Docker.

**Data:** Raw clickstream processing, Parquet, DuckDB, StarRocks, SQL, data visualisation.

**AI & search:** Production Bedrock features with tool use and structured outputs; embeddings, vector similarity search, classification, and LLM-as-judge evaluation.

**Comfortable in:** React, Node.js, PHP, MySQL, Nx monorepos, Storybook, Figma.

**Earlier career:** C#, .NET, ASP.NET, SQL Server.

---

## Projects

### Job-Search Agent
**Go · local LLMs (LM Studio) · MCP**

- **Built an LLM-powered agent** that pulls postings from Hacker News "Who is hiring?", scores each against a structured criteria profile, and produces a ranked, explained shortlist.
- **Schema-constrained JSON output** at temperature 0 for deterministic classification, behind pluggable source and LLM-backend interfaces so a new source or model is a single new file.
- **Exposed as an MCP server**, so its tools can be used from Claude Desktop as well as the CLI.

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
