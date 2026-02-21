import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

export default function MockitHubSeniorLevelPage() {
  const navigate = useNavigate();
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const questions: Question[] = [
    {
      id: 1,
      question: 'Tell me about yourself',
      situation: 'I\'ve spent the last several years growing from a hands-on engineer into someone who can own features end-to-end, collaborate across teams, and contribute to architectural decisions. My experience spans building user-facing features, improving system performance, and leading small project teams.',
      task: 'Over the past few years, my focus has been on taking on more responsibility — not just writing code, but shaping solutions, improving processes, and ensuring projects move smoothly from idea to delivery. I\'ve intentionally sought roles where I could deepen my technical skills while also stepping into leadership behaviours.',
      action: 'I\'ve led feature builds from discovery through rollout, collaborated with product and design to refine requirements, and worked closely with backend, QA, and SRE teams to ensure reliability and performance. I\'ve also mentored junior engineers, improved documentation, and introduced practices like better acceptance criteria, automated testing, and performance profiling. Along the way, I\'ve taken ownership of production issues, driven cross-team alignment, and contributed to architectural improvements such as caching strategies, API redesigns, and refactoring legacy modules.',
      result: 'These experiences have helped me become a reliable mid-level engineer who can deliver independently, communicate clearly with stakeholders, and contribute to both technical and team-level improvements. I\'m now looking for a role where I can continue growing — taking on more complex systems, influencing technical direction, and contributing to a high-performing engineering culture.'
    },
    {
      id: 2,
      question: 'Tell me about a time you led a high-impact initiative',
      situation: 'Our platform was experiencing severe performance degradation during peak traffic. Latency spiked unpredictably, error rates increased, and customer complaints were rising. The issue wasn\'t isolated — it was systemic. We had architectural bottlenecks, inconsistent caching strategies, and limited observability. Leadership was concerned about SLA breaches and the potential impact on revenue and customer trust.',
      task: 'I was asked to lead a cross-functional initiative to stabilise performance, identify root causes, and create a long-term scalability strategy. This required aligning engineering, SRE, product, and data teams — all of whom had different priorities and perspectives.',
      action: 'I began by forming a dedicated working group with clear ownership and decision-making authority. We ran a deep technical analysis using profiling tools, distributed tracing, and traffic heatmaps. This revealed several hotspots: inefficient database queries, inconsistent caching layers, and a lack of performance budgets. I prioritised fixes based on business impact and technical risk. We introduced performance budgets, implemented structured logging, and built new dashboards to give teams real-time visibility. I also worked with SRE to redesign our auto-scaling strategy and with product to sequence improvements without disrupting the roadmap. To ensure safe rollout, we used feature flags, canary deployments, and automated rollback triggers. I communicated progress weekly to leadership, translating technical complexity into business-focused insights.',
      result: 'Latency dropped by 40%, incidents decreased by 70%, and customer complaints fell sharply. The new performance framework became a company-wide standard, and the initiative was cited as a model for cross-team collaboration. More importantly, we built a scalable foundation that supported future growth without firefighting.'
    },
    {
      id: 3,
      question: 'Tell me about a time you influenced without authority',
      situation: 'Two engineering teams were in conflict over an API contract. One team optimised for performance and simplicity; the other prioritised flexibility and future extensibility. The disagreement stalled a major release and created tension between the teams.',
      task: 'Although I had no formal authority over either team, I needed to break the deadlock, rebuild trust, and help them converge on a solution that balanced technical constraints with product goals.',
      action: 'I started by meeting each team separately to understand their motivations, constraints, and concerns. This revealed that both teams were making valid points — but they lacked shared context and were talking past each other. I facilitated a joint workshop where we mapped out user needs, performance requirements, and long-term architectural considerations. I encouraged both teams to articulate not just what they wanted, but why. This shifted the conversation from positions to principles. Using the insights from the workshop, I proposed a hybrid API design: a lean core contract for immediate needs, with optional extensions for future use cases. I documented tradeoffs, created a migration path, and secured product buy-in to ensure alignment.',
      result: 'Both teams agreed to the hybrid approach, unblocking the release. The API pattern became a reusable standard across the organisation, reducing future conflicts. The teams\' working relationship improved, and leadership recognised the approach as an example of influence without authority.'
    },
    {
      id: 4,
      question: 'Tell me about a time you managed risk on a critical project',
      situation: 'We were preparing a major release tied to a multi-million-pound customer renewal. The feature touched multiple systems, introduced new data flows, and carried significant reliability risk. Any instability could jeopardise the contract and damage trust.',
      task: 'I needed to identify risks early, reduce uncertainty, and ensure the release was safe, predictable, and fully observable — without slowing down delivery.',
      action: 'I conducted a structured risk assessment with engineering, QA, SRE, and product. We mapped out failure modes, dependency risks, and operational blind spots. I introduced feature flags, fallback logic, and targeted regression tests for high-risk areas. I worked with SRE to enhance monitoring, adding new metrics, alerts, and dashboards. We defined clear rollback criteria and rehearsed the deployment plan, including a dry-run in a staging environment with production-like traffic. I also created a communication plan for stakeholders, ensuring everyone understood timelines, risks, and contingency plans. This reduced anxiety and increased alignment across teams.',
      result: 'The release went out with zero incidents. The customer renewed their contract, citing improved stability and transparency. Leadership adopted the risk-assessment model as a best practice for future high-stakes launches. The team gained confidence in handling complex releases, and our operational maturity improved significantly.'
    },
    {
      id: 5,
      question: 'Tell me about a time you improved cross-team communication',
      situation: 'In a previous organisation, engineering, product, and design teams were frequently misaligned. Requirements were interpreted differently, technical constraints weren\'t communicated early, and design decisions often arrived too late in the development cycle. This led to rework, delivery delays, and frustration across teams. The lack of a shared communication model was creating operational drag and eroding trust.',
      task: 'As a senior leader responsible for delivery, I needed to create a communication structure that improved clarity, reduced friction, and enabled teams to collaborate more effectively. The goal wasn\'t just to fix communication — it was to build a scalable operating model that supported predictable delivery.',
      action: 'I started by mapping the existing communication flows and identifying failure points. It became clear that teams lacked shared rituals, consistent documentation, and early alignment checkpoints. I introduced feature kick-offs, where engineering, product, and design aligned on scope, constraints, and success metrics before any work began. I created lightweight technical briefs that clarified architecture, dependencies, and risks. These documents became the single source of truth for each feature. To reduce meeting load, I standardised async updates using structured templates. I also set up shared Slack channels and weekly cross-team syncs to maintain alignment. Finally, I coached team leads on communicating decisions transparently — especially tradeoffs and constraints. This helped shift the culture from reactive to proactive communication.',
      result: 'Rework dropped significantly, delivery became smoother, and teams reported feeling more aligned and empowered. The communication model was adopted across multiple product areas, and leadership recognised it as a key factor in improving delivery predictability. The organisation gained a scalable operating rhythm that reduced friction and improved morale.'
    },
    {
      id: 6,
      question: 'Tell me about a time you solved a critical production issue',
      situation: 'During peak traffic, our platform experienced a sudden spike in latency. Customer-facing systems slowed down, error rates increased, and support tickets surged. The incident threatened to escalate into a full outage, and the business impact could have been severe.',
      task: 'As the senior engineer on call, I needed to diagnose the issue quickly, stabilise the system, and prevent further degradation — all while keeping stakeholders informed and maintaining calm under pressure.',
      action: 'I immediately reviewed dashboards and logs, identifying a database query that had begun performing full table scans due to a missing index. To stabilise the system, I implemented temporary caching and rate limiting to reduce load. I then rolled back the recent change that introduced the issue. Once the system stabilised, I added the missing index, wrote regression tests, and updated our monitoring to detect similar issues earlier. I also documented the incident and facilitated a post-mortem to identify process improvements, including better schema review practices and automated query analysis.',
      result: 'Performance normalised within minutes, customer impact was minimised, and the fix prevented similar incidents from recurring. Leadership praised the calm, structured response under pressure. The incident led to improved database governance and stronger operational resilience across the engineering organisation.'
    },
    {
      id: 7,
      question: 'Tell me about a time you mentored someone into a senior role',
      situation: 'A mid-level engineer on my team had strong technical skills but struggled with system design, cross-team communication, and taking ownership of complex features. They were capable but not yet operating at a senior level. The organisation needed more senior engineers, and I saw potential in them.',
      task: 'My goal was to help them grow into a senior role by developing their architectural thinking, leadership behaviours, and ability to drive work independently.',
      action: 'I started by conducting a strengths-and-gaps assessment with them. Together, we created a personalised growth plan focused on system design, communication, and ownership. I set up weekly design reviews where we walked through architectural decisions, tradeoffs, and failure modes. I gave them ownership of a complex feature end-to-end, including requirements clarification, design, implementation, and rollout. I coached them on stakeholder communication, helping them articulate decisions clearly and proactively manage risks. I also encouraged them to mentor junior engineers to build leadership confidence.',
      result: 'Within months, their confidence and capability grew significantly. They became a reliable lead for complex features, improved cross-team collaboration, and demonstrated strong architectural thinking. They were promoted to senior engineer, and leadership recognised the transformation as an example of effective coaching and talent development.'
    },
    {
      id: 8,
      question: 'Tell me about a time you improved system reliability',
      situation: 'Our platform had a recurring pattern of production incidents, many of which stemmed from inconsistent error handling, missing observability, and unpredictable behaviour under load. These issues weren\'t catastrophic individually, but together they created operational instability and eroded confidence in the system. Engineers were firefighting instead of building, and SRE was overwhelmed.',
      task: 'As a senior technical leader, I needed to improve system reliability in a way that was sustainable, measurable, and didn\'t slow down delivery. The goal was to reduce incidents, improve MTTR, and build a culture of reliability across engineering.',
      action: 'I began by analysing incident data to identify patterns. The root causes were clear: inconsistent error-handling patterns, lack of structured logging, and no unified approach to retries or timeouts. I introduced a standardised error-handling framework that included clear guidelines for retries, fallbacks, and circuit breakers. I partnered with SRE to define SLOs and SLIs, ensuring teams understood reliability targets. We added structured logging, correlation IDs, and distributed tracing to improve visibility. I also introduced chaos testing to proactively identify weaknesses. To ensure adoption, I ran workshops, created templates, and embedded reliability checks into code reviews and CI pipelines. This shifted reliability from a reactive function to a shared engineering responsibility.',
      result: 'Incident frequency dropped by 60%, MTTR improved significantly, and engineers reported feeling more confident in the system. The reliability framework became part of our engineering standards, and leadership recognised the initiative as a major step toward operational maturity.'
    },
    {
      id: 9,
      question: 'Tell me about a time you handled a difficult stakeholder',
      situation: 'A key product stakeholder frequently pushed for last-minute scope changes, often during the final stages of development. These changes created churn, caused delivery delays, and frustrated the engineering team. The relationship between product and engineering was becoming strained.',
      task: 'I needed to protect the team\'s focus and delivery timelines while maintaining a positive, collaborative relationship with the stakeholder. The goal was to create a healthier working dynamic and reduce late-cycle disruptions.',
      action: 'I scheduled a direct but empathetic conversation with the stakeholder. Instead of focusing on the symptoms, I explored the underlying reasons for the late changes. They felt pressure from sales and customers and didn\'t believe they had a structured way to influence scope earlier. I explained the impact of late changes in business terms — increased risk, reduced predictability, and lower quality. I then proposed a structured decision-making model: Early alignment checkpoints, Clear deadlines for scope changes, A tiered system for evaluating late requests (must-have, should-have, could-have), Transparent tradeoff discussions. I also created a lightweight intake process so product could raise concerns earlier without friction.',
      result: 'The stakeholder appreciated the clarity and structure. Late-cycle changes dropped significantly, the team regained predictability, and the relationship between product and engineering improved. The new model became a standard for other teams, reducing friction across the organisation.'
    },
    {
      id: 10,
      question: 'Tell me about a time you improved security',
      situation: 'Several services in our platform were using outdated authentication patterns, including long-lived tokens and inconsistent access-control logic. Security audits flagged these issues as medium-to-high risk, and leadership wanted a modern, scalable solution.',
      task: 'I took ownership of modernising the authentication and authorisation model across multiple services. The goal was to improve security posture without disrupting product delivery or degrading performance.',
      action: 'I began with a comprehensive security audit, mapping out token lifecycles, access patterns, and service-to-service communication. I proposed migrating to OAuth with short-lived tokens, implementing RBAC, and centralising secret management using encrypted storage. I worked closely with security engineers to design the new model, ensuring it balanced security with developer experience. I created migration guides, sample implementations, and automated tests to reduce friction for engineering teams. We rolled out changes gradually using feature flags and monitored performance impact closely. I also improved observability by adding authentication metrics, anomaly detection, and alerting for suspicious behaviour.',
      result: 'The new authentication model significantly improved our security posture and passed external audits with strong feedback. Teams adopted the new patterns quickly due to the clear documentation and tooling. Leadership recognised the initiative as a major step toward modernising our platform\'s security architecture.'
    },
    {
      id: 11,
      question: 'Tell me about a time you drove architectural change',
      situation: 'Our core application had grown into a tightly coupled monolith over several years. Feature development slowed dramatically, deployments became risky, and teams were stepping on each other\'s toes. The architecture was limiting our ability to scale both technically and organisationally.',
      task: 'I was asked to lead the transition toward a more modular, service-oriented architecture. The challenge wasn\'t just technical — it required aligning multiple teams, managing risk, and ensuring we didn\'t disrupt ongoing delivery.',
      action: 'I began by conducting an architectural assessment to identify natural domain boundaries. I worked with engineering leads to define a decomposition strategy that balanced technical purity with pragmatic delivery. We created a migration roadmap that sequenced the work into manageable phases. I introduced shared libraries for cross-cutting concerns, standardised observability, and defined clear API contracts. To reduce risk, we used the strangler-fig pattern to gradually extract services from the monolith. I also partnered with product to ensure the roadmap aligned with business priorities. Throughout the process, I communicated progress to leadership, highlighting tradeoffs, risks, and expected outcomes. I ran design reviews, coached teams on service ownership, and ensured we maintained delivery velocity.',
      result: 'Deployment frequency increased, incidents decreased, and teams gained autonomy. The new architecture improved scalability and reduced operational risk. Leadership cited the initiative as a major step toward modernising our platform and enabling faster innovation.'
    },
    {
      id: 12,
      question: 'Tell me about a time you resolved a conflict between teams',
      situation: 'Engineering and design were in conflict over the complexity of a new feature. Design wanted a highly polished, multi-step UX; engineering flagged significant technical risk and delivery delays. The disagreement stalled progress and created tension.',
      task: 'I needed to de-escalate the conflict, rebuild trust, and help both teams converge on a solution that balanced user experience, technical feasibility, and delivery timelines.',
      action: 'I met with each team separately to understand their motivations and constraints. It became clear that both sides had valid concerns but lacked shared context. I facilitated a joint workshop where we mapped user needs, technical constraints, and business priorities. Using the insights, I proposed a phased approach: Phase 1: Deliver a simplified version that met core user needs, Phase 2: Add advanced UX elements once we validated usage and had more engineering bandwidth. I documented the plan, clarified ownership, and set up weekly syncs to maintain alignment. I also coached both teams on communicating decisions transparently.',
      result: 'The conflict de-escalated quickly. The feature shipped on time, user feedback was positive, and the phased approach became a template for future cross-team projects. The relationship between engineering and design improved significantly.'
    },
    {
      id: 13,
      question: 'Tell me about a time you improved a process',
      situation: 'Our PR review process was causing delays. Engineers waited days for reviews, quality was inconsistent, and merge conflicts were common. This slowed delivery and frustrated the team.',
      task: 'I needed to streamline the process, improve quality, and reduce cycle time without adding bureaucracy.',
      action: 'I analysed review patterns and identified bottlenecks. I introduced a PR checklist to standardise expectations, added automated linting and tests to catch issues early, and created review SLAs to ensure timely feedback. I ran workshops on writing better PRs and encouraged smaller, more focused changes. I also introduced a rotating "review captain" role to ensure coverage during busy periods.',
      result: 'Review time dropped by 50%, quality improved, and engineers reported a smoother workflow. The new process became part of our engineering standards and contributed to more predictable delivery.'
    },
    {
      id: 14,
      question: 'Tell me about a time you managed competing priorities',
      situation: 'Two mission-critical features were scheduled for delivery in the same quarter. Both had high visibility, both were tied to customer commitments, and both required overlapping engineering resources. Teams were stretched, product was anxious, and leadership wanted clarity on how we would deliver without burning people out or compromising quality.',
      task: 'As the senior leader overseeing delivery, I needed to create a prioritisation strategy that balanced business impact, technical feasibility, and team capacity. The goal was to avoid context switching, reduce risk, and ensure both initiatives moved forward predictably.',
      action: 'I began by mapping dependencies, technical complexity, and risk profiles for both features. I facilitated a joint session with engineering, product, and design to align on success metrics and identify non-negotiables. It became clear that one feature had a harder external deadline, while the other had more architectural risk. I proposed a sequenced delivery plan: Feature A would start immediately with a dedicated squad, Feature B would begin with architectural groundwork and discovery, Shared resources would be allocated in time-boxed blocks to avoid thrash. I also negotiated scope adjustments with product, ensuring we delivered the highest-value components first. To maintain transparency, I set up weekly cross-initiative syncs and created a shared dashboard showing progress, risks, and capacity.',
      result: 'Both features shipped on time with no major quality issues. Teams reported reduced stress due to clearer focus and fewer interruptions. Leadership appreciated the structured approach, and the prioritisation model became a template for future multi-initiative quarters.'
    },
    {
      id: 15,
      question: 'Tell me about a time you improved onboarding',
      situation: 'New engineers were taking 6–8 weeks to become productive. They struggled to understand the architecture, tooling, and deployment processes. Documentation was outdated, tribal knowledge was high, and onboarding depended heavily on whoever happened to be available.',
      task: 'I needed to shorten onboarding time, reduce dependency on senior engineers, and create a scalable onboarding experience that supported rapid team growth.',
      action: 'I began by interviewing recent hires to understand pain points. The themes were consistent: unclear architecture, inconsistent setup instructions, and lack of structured starter tasks. I created a comprehensive onboarding guide covering architecture, services, deployment pipelines, coding standards, and common workflows. I introduced architecture walkthrough sessions, recorded them, and made them part of the onboarding curriculum. I also created starter tasks that were small, low-risk, and designed to expose new hires to key parts of the system. To ensure support, I paired each new engineer with a mentor and set up a 30-day onboarding plan with clear milestones. I also improved local development tooling to reduce setup friction.',
      result: 'Ramp-up time dropped from 8 weeks to around 4. New hires reported feeling more confident and supported. Senior engineers spent less time answering basic questions, and the onboarding framework became a core part of our hiring scale-up strategy.'
    },
    {
      id: 16,
      question: 'Tell me about a time you made a difficult decision',
      situation: 'A major feature was behind schedule and showing signs of instability. QA flagged critical issues, engineering raised concerns about technical debt, and product was pushing hard to meet a launch date tied to a marketing campaign. The team was stressed, and leadership wanted a clear recommendation.',
      task: 'I needed to make a decision: ship on time with known risks, or delay the release and risk disappointing stakeholders. The decision required balancing technical integrity, customer trust, and business commitments.',
      action: 'I conducted a structured risk assessment with engineering and QA. We identified failure modes, estimated likelihood and impact, and evaluated mitigation options. The risks were significant: potential data inconsistencies, degraded performance, and high on-call load. I met with product and leadership to present the findings in business terms — not technical jargon. I proposed delaying the release by two weeks, focusing on stabilisation, automated testing, and targeted refactoring. I also created a revised timeline and communication plan to manage expectations. To maintain momentum, I set up daily standups focused on risk burndown and created a clear definition of "release-ready" to avoid ambiguity.',
      result: 'Leadership agreed to delay the release. The extra time allowed us to fix critical issues, improve performance, and reduce operational risk. The feature launched successfully, customer feedback was positive, and the decision strengthened trust between engineering and product. The incident reinforced a culture of quality over speed.'
    },
    {
      id: 17,
      question: 'Tell me about a time you improved developer productivity',
      situation: 'Our engineering team was experiencing slow development cycles. Build times were long, CI pipelines were flaky, and local environments were inconsistent. Engineers spent too much time troubleshooting tooling instead of delivering features. Morale dipped, and leadership wanted a clear plan to improve productivity.',
      task: 'As a senior technical leader, I needed to diagnose the root causes, improve tooling, and create a more efficient development workflow without disrupting ongoing delivery.',
      action: 'I started by gathering data: build logs, CI failure rates, and feedback from engineers. The issues were clear: slow dependency resolution, inconsistent environment setup, and redundant CI steps. I introduced a developer productivity task force to focus on improvements. We optimised build caching, parallelised CI jobs, and removed unnecessary steps. I worked with DevOps to containerise local environments, ensuring consistency across machines. I also introduced pre-commit hooks, automated linting, and a faster test suite using selective test execution. To ensure adoption, I ran workshops, created documentation, and embedded productivity metrics into our engineering dashboard.',
      result: 'Build times dropped by 40%, CI stability improved dramatically, and engineers reported a smoother workflow. Delivery velocity increased, and the productivity improvements became part of our engineering standards.'
    },
    {
      id: 18,
      question: 'Tell me about a time you managed a major incident',
      situation: 'A critical service outage occurred during peak business hours. Customers were unable to complete transactions, dashboards were failing, and support escalations were flooding in. The incident had high visibility, and leadership wanted immediate updates.',
      task: 'As the senior engineer on call, I needed to lead the incident response, coordinate teams, restore service quickly, and communicate clearly with stakeholders.',
      action: 'I initiated the incident response protocol and assembled engineers from backend, SRE, and database teams. I assigned clear roles: incident commander, communications lead, and technical responders. I ensured updates were posted every 10 minutes to keep stakeholders informed. We traced the issue to a cascading failure caused by a misconfigured cache invalidation rule. I coordinated a rollback, flushed the cache, and restarted affected services. Once stability returned, I led a structured post-incident review to identify root causes and long-term fixes. We improved alerting thresholds, added circuit breakers, and updated deployment safeguards to prevent similar issues.',
      result: 'Service was restored within 25 minutes, customer impact was minimised, and leadership praised the calm, structured response. The post-incident improvements strengthened our operational resilience and reduced the likelihood of recurrence.'
    },
    {
      id: 19,
      question: 'Tell me about a time you led a team through change',
      situation: 'Our organisation underwent a major restructuring. Teams were being realigned, priorities were shifting, and engineers were anxious about their roles and the future direction. Productivity dipped, and morale was fragile.',
      task: 'As a senior leader, I needed to guide my team through the transition, maintain stability, and ensure we continued delivering value despite the uncertainty.',
      action: 'I began by creating a safe space for open discussion. I held team meetings and 1:1s to understand concerns and provide clarity where possible. I communicated transparently about what was known and what was still evolving. I worked with leadership to clarify new priorities and translated them into a clear roadmap for the team. I redefined roles and responsibilities to align with the new structure and ensured everyone understood how their work contributed to the bigger picture. To maintain momentum, I introduced short-term goals that gave the team a sense of progress and control. I also reinforced team rituals — standups, retros, and demos — to provide stability during the transition.',
      result: 'The team regained confidence, productivity stabilised, and we delivered key milestones despite the organisational changes. Leadership recognised the team as one of the most resilient during the transition, and several engineers expressed appreciation for the clarity and support.'
    },
    {
      id: 20,
      question: 'Tell me about a time you improved code quality across a team',
      situation: 'Over time, our codebase had accumulated inconsistent patterns, duplicated logic, and varying levels of test coverage. Different teams had different coding styles, and onboarding new engineers became increasingly difficult. Bugs were slipping through, and refactoring work was becoming risky and expensive.',
      task: 'As a senior technical leader, I needed to raise the overall code quality, create consistency across teams, and reduce long-term maintenance costs — without slowing down delivery or imposing heavy bureaucracy.',
      action: 'I began by analysing the codebase and identifying common anti-patterns. I then introduced a coding standards guide that covered naming conventions, error handling, testing expectations, and architectural patterns. To ensure adoption, I ran workshops and created examples of "good vs. bad" implementations. I worked with engineering leads to embed these standards into code review checklists and CI pipelines. We added automated linting, static analysis tools, and test coverage thresholds. I also introduced architecture review sessions for complex features to ensure alignment before implementation. To reinforce the culture, I encouraged engineers to refactor opportunistically — improving code quality as part of normal feature work rather than treating it as a separate project.',
      result: 'Code quality improved significantly, onboarding became smoother, and bugs related to inconsistent patterns dropped. Engineers reported feeling more confident working across different parts of the system. The standards became part of our engineering culture and contributed to long-term maintainability.'
    },
    {
      id: 21,
      question: 'Tell me about a time you had to push back on unrealistic expectations',
      situation: 'Product leadership proposed an aggressive timeline for a major feature tied to a marketing campaign. Engineering flagged significant technical complexity, dependencies, and architectural risks. The proposed deadline was unrealistic and would have required cutting corners.',
      task: 'I needed to push back constructively, protect the team from burnout, and negotiate a timeline that balanced business urgency with technical integrity.',
      action: 'I gathered detailed estimates from engineering, identified dependencies, and mapped out the critical path. I then met with product leadership to present a clear, data-driven view of the risks. Instead of simply saying "no," I offered three structured options: 1. Ship a reduced MVP on the original timeline, 2. Ship the full feature with a revised timeline, 3. Split the feature into phases to deliver value earlier without compromising quality. I explained tradeoffs in business terms — customer impact, operational risk, and long-term maintainability. I also highlighted the cost of technical debt if we rushed.',
      result: 'Product leadership appreciated the clarity and chose the phased approach. The team delivered the MVP on time and the full feature shortly after. The process strengthened trust between engineering and product and set a precedent for healthier planning discussions.'
    },
    {
      id: 22,
      question: 'Tell me about a time you improved collaboration between engineering and product',
      situation: 'Engineering and product teams were struggling to collaborate effectively. Product felt engineering was slow and overly cautious; engineering felt product changed priorities too frequently and didn\'t understand technical constraints. This tension created inefficiency and frustration.',
      task: 'I needed to rebuild trust, improve alignment, and create a more collaborative working model that supported predictable delivery and better decision-making.',
      action: 'I started by facilitating a joint retrospective to surface frustrations and identify root causes. Both sides realised they lacked shared rituals, clear expectations, and a common language for discussing tradeoffs. I introduced joint planning sessions, where engineering and product aligned on priorities, risks, and success metrics. I created a shared roadmap that included both product features and technical work. I also introduced a decision-making framework that clarified when engineering had final say (e.g., architecture, reliability) and when product owned decisions (e.g., user value, sequencing). To improve transparency, I encouraged product managers to attend engineering standups and engineers to participate in customer feedback sessions. This created empathy and mutual understanding.',
      result: 'Collaboration improved dramatically. Delivery became more predictable, engineers felt more involved in product decisions, and product gained a clearer understanding of technical constraints. The new working model reduced friction and became a template for other teams.'
    },
    {
      id: 23,
      question: 'Tell me about a time you improved observability',
      situation: 'Our engineering teams were struggling to diagnose production issues quickly. Logs were inconsistent, metrics were incomplete, and tracing was almost non-existent. When incidents occurred, engineers spent hours piecing together clues from different systems. This slowed MTTR, increased on-call stress, and made it difficult to understand system behaviour under load.',
      task: 'As a senior technical leader, I needed to design and implement a unified observability strategy that improved visibility, reduced incident resolution time, and enabled proactive detection of issues.',
      action: 'I began by assessing our current tooling and identifying gaps. We lacked structured logging, consistent metrics, and distributed tracing. I proposed a three-pillar observability model: logs, metrics, and traces, each with clear standards. I introduced structured logging with correlation IDs, enabling engineers to trace requests across services. I worked with SRE to define key metrics — latency, error rates, throughput, saturation — and added dashboards for each service. For tracing, I implemented OpenTelemetry and instrumented critical paths. To ensure adoption, I ran training sessions, created templates, and embedded observability checks into code reviews. I also partnered with product to define user-centric SLIs and SLOs, ensuring observability aligned with customer experience.',
      result: 'MTTR dropped significantly, engineers diagnosed issues faster, and on-call stress decreased. The observability framework became a core part of our engineering standards, and leadership recognised it as a major step toward operational maturity.'
    },
    {
      id: 24,
      question: 'Tell me about a time you improved a legacy system',
      situation: 'We had a legacy system that was critical to the business but difficult to maintain. It had outdated dependencies, minimal tests, and tightly coupled components. Engineers avoided touching it because changes often introduced regressions. The system was becoming a bottleneck for new features.',
      task: 'I needed to modernise the system in a way that reduced risk, improved maintainability, and enabled future development — without rewriting everything from scratch.',
      action: 'I started by conducting a dependency audit and mapping the system\'s architecture. I identified high-risk areas and components that could be isolated. I introduced a strangler-fig pattern, gradually extracting functionality into modular services. I added automated tests around critical paths, improving confidence in changes. I upgraded dependencies incrementally, ensuring compatibility at each step. I also improved documentation and created architectural diagrams to help engineers understand the system. To ensure long-term maintainability, I introduced coding standards, refactored common utilities, and added observability to monitor performance and errors.',
      result: 'The system became significantly more stable and easier to work with. Engineers gained confidence in making changes, and new features were delivered faster. The modernisation effort extended the system\'s lifespan and reduced operational risk.'
    },
    {
      id: 25,
      question: 'Tell me about a time you led a cross-functional initiative',
      situation: 'Our company wanted to launch a new product feature that required coordination across engineering, product, design, marketing, and customer support. Each team had different priorities, and there was no clear owner for cross-functional alignment. Without structure, the initiative risked delays and miscommunication.',
      task: 'I was asked to lead the initiative end-to-end, ensuring alignment, clarity, and predictable delivery across all teams involved.',
      action: 'I began by defining the initiative\'s goals, success metrics, and scope. I created a cross-functional working group with representatives from each team and established clear roles and responsibilities. I introduced a shared roadmap and weekly syncs to maintain alignment. I facilitated workshops to clarify requirements, identify dependencies, and surface risks early. I worked closely with engineering to sequence technical work and with product to refine user stories. I partnered with marketing and support to prepare launch materials and training. Throughout the initiative, I communicated progress to leadership, highlighting risks, tradeoffs, and decisions. I ensured teams had the context they needed to make informed choices.',
      result: 'The feature launched on time with strong customer adoption. Cross-functional collaboration improved, and the initiative became a model for future multi-team projects. Leadership praised the structured approach and clear communication.'
    },
    {
      id: 26,
      question: 'Tell me about a time you improved performance at scale',
      situation: 'Our platform began experiencing performance issues as traffic grew. Latency increased, CPU usage spiked unpredictably, and certain endpoints degraded under load. Customers noticed slower response times, and internal teams struggled to diagnose bottlenecks due to limited visibility. The system had been designed for moderate traffic, but growth outpaced the architecture.',
      task: 'As a senior technical leader, I needed to diagnose the root causes, improve performance, and ensure the system could scale reliably. The goal was to deliver measurable improvements without destabilising the platform or requiring a full rewrite.',
      action: 'I began by analysing performance metrics, profiling slow endpoints, and reviewing database queries. I identified several issues: inefficient queries, missing indexes, inconsistent caching, and synchronous operations that should have been asynchronous. I introduced a performance optimisation plan that included: Adding indexes and optimising queries, Implementing caching layers for high-traffic endpoints, Introducing asynchronous processing for heavy tasks, Improving load balancing and auto-scaling policies, Adding performance budgets and dashboards. I worked with engineering teams to prioritise improvements based on business impact. We rolled out changes gradually using canary deployments and monitored performance closely.',
      result: 'Latency dropped by over 50%, throughput increased significantly, and the system handled peak traffic without degradation. Customer satisfaction improved, and the performance framework became part of our engineering standards. Leadership recognised the initiative as a key enabler for future growth.'
    },
    {
      id: 27,
      question: 'Tell me about a time you had to rebuild trust with a team',
      situation: 'A previous project had suffered from unclear requirements, shifting priorities, and poor communication. The engineering team felt burned out and undervalued. Trust between engineering, product, and leadership had eroded, and morale was low. Delivery slowed because people were hesitant to commit to timelines or take ownership.',
      task: 'As a senior leader, I needed to rebuild trust, restore psychological safety, and create a healthier working environment that supported predictable delivery and strong collaboration.',
      action: 'I began by holding 1:1s and team sessions to understand frustrations and identify root causes. Engineers wanted clearer direction, more autonomy, and better communication. Product wanted more predictability and transparency. Leadership wanted alignment and accountability. I introduced a new operating model: Clearer requirements through structured discovery, Joint planning sessions with engineering and product, Transparent decision-making frameworks, Realistic timelines based on engineering input, Regular demos to celebrate progress, A culture of blameless retrospectives. I also made sure to recognise wins publicly and address issues privately. I encouraged engineers to take ownership of decisions and empowered them to push back when needed.',
      result: 'Trust improved significantly. Engineers felt heard and supported, product gained confidence in delivery timelines, and leadership saw improved predictability. The team became more engaged, and delivery velocity increased. The new operating model became a template for other teams.'
    },
    {
      id: 28,
      question: 'Tell me about a time you delivered under tight deadlines',
      situation: 'A major customer requested a feature that was critical to their renewal. The timeline was extremely tight — just a few weeks — and the feature required changes across multiple services. The risk of failure was high, but the business impact was too significant to ignore.',
      task: 'I needed to deliver the feature on time without compromising quality or burning out the team. This required careful planning, clear communication, and strong technical leadership.',
      action: 'I began by breaking the feature into smaller components and identifying dependencies. I created a focused delivery squad with engineers from backend, frontend, and QA. We held a rapid discovery session to clarify requirements and identify risks. I introduced daily syncs to maintain alignment and used feature flags to reduce deployment risk. I also created a lightweight test plan and partnered with QA to prioritise critical paths. To keep stakeholders informed, I provided daily updates with progress, risks, and mitigation plans. Throughout the project, I shielded the team from distractions and ensured they had everything they needed to stay productive.',
      result: 'We delivered the feature on time with no major issues. The customer renewed their contract, and leadership praised the team\'s execution. The structured approach demonstrated that tight deadlines can be met without sacrificing quality when planning and communication are strong.'
    },
    {
      id: 29,
      question: 'Tell me about a time you improved stakeholder visibility',
      situation: 'Stakeholders across product, sales, and leadership frequently asked for updates on engineering progress. Because updates were scattered across Slack, Jira, and ad-hoc meetings, they lacked a clear, consistent view of delivery status. This created anxiety, misalignment, and unnecessary escalations. Engineering felt micromanaged; stakeholders felt in the dark.',
      task: 'I needed to create a transparent, predictable communication model that gave stakeholders real visibility into progress, risks, and timelines — without adding overhead for engineers.',
      action: 'I began by interviewing stakeholders to understand what information they needed and how often. I also spoke with engineers to understand what communication overhead they wanted to avoid. The gap was clear: stakeholders needed clarity, engineers needed focus. I created a single engineering delivery dashboard that included: Feature status (Not Started / In Progress / Blocked / Done), Risk indicators, Dependencies, Release timelines, Ownership. I automated as much as possible by integrating Jira and CI/CD data. I also introduced weekly delivery summaries written in business-friendly language, highlighting progress, risks, and decisions. To reinforce alignment, I established a bi-weekly stakeholder sync where engineering and product jointly reviewed progress and upcoming priorities.',
      result: 'Stakeholder escalations dropped dramatically. Product and sales gained confidence in engineering timelines, and engineers experienced fewer interruptions. Leadership praised the clarity and adopted the dashboard as a standard for other teams. The new visibility model strengthened trust across the organisation.'
    },
    {
      id: 30,
      question: 'Tell me about a time you demonstrated leadership during uncertainty',
      situation: 'The company faced a period of uncertainty due to shifting market conditions and internal restructuring. Priorities changed rapidly, teams were unsure about long-term direction, and morale was fragile. Engineers were anxious about job security, and productivity dipped as people struggled to stay focused.',
      task: 'As a senior leader, I needed to provide stability, clarity, and direction. My goal was to keep the team grounded, maintain momentum, and ensure we continued delivering value despite the uncertainty.',
      action: 'I held open forums and 1:1s to understand concerns and provide as much clarity as possible. I communicated transparently about what was known and what was still evolving. I reinforced the team\'s mission and highlighted the work that remained critical regardless of organisational changes. I created a short-term roadmap with achievable goals to give the team a sense of progress and control. I also re-established team rituals — standups, retros, demos — to provide structure and predictability. I encouraged engineers to focus on high-impact work and shielded them from unnecessary noise. To support morale, I recognised wins publicly, celebrated progress, and ensured people felt valued. I also partnered with leadership to advocate for the team\'s needs and ensure they had the resources to stay productive.',
      result: 'The team regained stability and confidence. Productivity improved, and we delivered key milestones despite the uncertainty. Leadership recognised the team as one of the most resilient during the transition. Several engineers later shared that the clarity and support helped them stay focused and motivated.'
    }
  ];

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const expandAll = () => {
    setExpandedQuestions(questions.map(q => q.id));
  };

  const collapseAll = () => {
    setExpandedQuestions([]);
  };

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/interview-toolkit')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Interview Toolkit</span>
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Senior-Level STAR Interview Questions and Answers</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Executive-level behavioural interview questions with comprehensive STAR framework responses for senior leaders and technical experts
            </p>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Use This Pack</h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 font-bold mt-0.5">•</span>
                  <span><strong>Study the STAR structure</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 font-bold mt-0.5">•</span>
                  <span><strong>Replace the scenario details</strong> with your own experiences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 font-bold mt-0.5">•</span>
                  <span><strong>Practice aloud</strong> until your delivery feels natural</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-600 font-bold mt-0.5">•</span>
                  <span><strong>Use the questions</strong> to anticipate what interviewers will probe</span>
                </li>
              </ul>
            </section>

            <section className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Disclaimer</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                These interview questions and STAR-style answers are intended purely as examples to showcase effective structure, clarity, and reasoning. They aren't designed to be memorised verbatim. Your strongest interview performance will come from drawing on your own experiences, challenges, and accomplishments. Treat these examples as a framework to shape your stories, but tailor the details so your responses highlight your genuine impact and the unique strengths you offer.
              </p>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Senior-Level Interview Questions</h2>
                <div className="flex gap-2">
                  <button
                    onClick={expandAll}
                    className="px-4 py-2 text-sm font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-lg hover:bg-violet-100 transition-colors"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for a question..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-3">
                {filteredQuestions.map((question) => {
                  const isExpanded = expandedQuestions.includes(question.id);
                  return (
                    <div key={question.id} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(question.id)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 bg-violet-100 text-violet-700 font-bold text-sm rounded-lg">
                            {question.id}
                          </span>
                          <h3 className="font-semibold text-slate-900">{question.question}</h3>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-6 space-y-4 bg-white">
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-sky-100 text-sky-700 font-bold text-sm rounded flex items-center justify-center">
                                S
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 text-sm mb-1">Situation</p>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                  {question.situation}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 font-bold text-sm rounded flex items-center justify-center">
                                T
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 text-sm mb-1">Task</p>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                  {question.task}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-700 font-bold text-sm rounded flex items-center justify-center">
                                A
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 text-sm mb-1">Action</p>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                  {question.action}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 font-bold text-sm rounded flex items-center justify-center">
                                R
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 text-sm mb-1">Result</p>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                  {question.result}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredQuestions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500">No questions found matching "{searchTerm}"</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
