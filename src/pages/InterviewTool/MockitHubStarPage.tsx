import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface Scenario {
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

interface Role {
  id: number;
  title: string;
  scenarios: Scenario[];
}

export default function MockitHubStarPage() {
  const navigate = useNavigate();
  const [expandedRoles, setExpandedRoles] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const roles: Role[] = [
    {
      id: 1,
      title: 'IT Support / Service Desk',
      scenarios: [
        {
          title: 'Resolving a Difficult Technical Issue',
          situation: 'A department reported intermittent network drops that were disrupting their workflow.',
          task: 'I was responsible for diagnosing the root cause and restoring stable connectivity.',
          action: 'I reviewed switch logs, identified a failing port causing packet loss, reassigned affected devices, and scheduled a replacement with minimal downtime.',
          result: 'Connectivity was fully restored within an hour, and the department\'s productivity returned to normal. Complaints dropped by 95% that week.'
        },
        {
          title: 'Handling a Frustrated User',
          situation: 'A user was upset because their laptop kept freezing during client calls.',
          task: 'My task was to resolve the issue and rebuild trust.',
          action: 'I listened actively, reassured them, ran diagnostics, found a corrupted driver, reinstalled it, and provided tips to prevent recurrence.',
          result: 'The issue was resolved the same day, and the user later praised the support experience in our internal feedback survey.'
        }
      ]
    },
    {
      id: 2,
      title: 'IT Technician / Field Engineer',
      scenarios: [
        {
          title: 'Hardware Replacement Under Time Pressure',
          situation: 'A critical workstation failed minutes before a scheduled presentation.',
          task: 'I had to restore functionality immediately.',
          action: 'I swapped the workstation, transferred essential files from backup, and tested peripherals to ensure everything worked.',
          result: 'The presentation started on time, and the department commended the rapid response.'
        },
        {
          title: 'Implementing a New Imaging Process',
          situation: 'Our device imaging process was slow and inconsistent.',
          task: 'I was tasked with improving deployment speed.',
          action: 'I introduced a standardised imaging template, automated driver installation, and documented the workflow.',
          result: 'Imaging time dropped from 90 minutes to 25, improving onboarding efficiency.'
        }
      ]
    },
    {
      id: 3,
      title: 'Network Engineer',
      scenarios: [
        {
          title: 'Fixing a Major Network Outage',
          situation: 'A core switch failure caused widespread connectivity issues.',
          task: 'I needed to restore service quickly and identify the root cause.',
          action: 'I rerouted traffic, isolated the faulty switch, applied a temporary configuration, and coordinated a hardware replacement.',
          result: 'Network uptime was restored within 30 minutes, and we implemented redundancy to prevent future outages.'
        },
        {
          title: 'Improving WiFi Performance',
          situation: 'Staff complained about slow WiFi in meeting rooms.',
          task: 'I was responsible for diagnosing and improving performance.',
          action: 'I performed a site survey, adjusted channel allocation, added an access point, and optimised load balancing.',
          result: 'WiFi speeds improved by 60%, and complaints dropped to zero.'
        }
      ]
    },
    {
      id: 4,
      title: 'Systems Administrator',
      scenarios: [
        {
          title: 'Automating a Manual Process',
          situation: 'User account provisioning was fully manual and error-prone.',
          task: 'I needed to streamline and automate it.',
          action: 'I created a PowerShell script that automated account creation, group assignment, and mailbox setup.',
          result: 'Provisioning time dropped from 20 minutes to under 2, and errors were eliminated.'
        },
        {
          title: 'Patch Management Improvement',
          situation: 'Our patching compliance was below audit requirements.',
          task: 'I was tasked with improving compliance.',
          action: 'I implemented scheduled maintenance windows, automated patch deployment, and created dashboards to track compliance.',
          result: 'Compliance increased from 72% to 98% within two months.'
        }
      ]
    },
    {
      id: 5,
      title: 'Cybersecurity Analyst',
      scenarios: [
        {
          title: 'Responding to a Security Incident',
          situation: 'A phishing email led to a compromised user account.',
          task: 'I needed to contain the incident and prevent further impact.',
          action: 'I disabled the account, analysed logs, reset credentials, blocked the malicious domain, and educated the user.',
          result: 'The breach was contained within 20 minutes, and no data was lost.'
        },
        {
          title: 'Strengthening Security Awareness',
          situation: 'We saw a rise in phishing attempts targeting staff.',
          task: 'I was responsible for improving user awareness.',
          action: 'I launched a phishing simulation campaign, created training materials, and held short awareness sessions.',
          result: 'Click-through rates dropped from 18% to 3% over three months.'
        }
      ]
    },
    {
      id: 6,
      title: 'Cloud Engineer',
      scenarios: [
        {
          title: 'Reducing Cloud Costs',
          situation: 'Our monthly cloud bill was exceeding budget.',
          task: 'I needed to identify cost-saving opportunities.',
          action: 'I analysed usage, removed idle resources, implemented auto-scaling, and moved workloads to reserved instances.',
          result: 'Cloud costs were reduced by 28% without impacting performance.'
        },
        {
          title: 'Migrating a Legacy App to the Cloud',
          situation: 'A legacy internal tool needed to be migrated to Azure.',
          task: 'I was responsible for planning and executing the migration.',
          action: 'I containerised the app, set up CI/CD pipelines, configured monitoring, and tested failover.',
          result: 'The migration completed ahead of schedule with zero downtime.'
        }
      ]
    },
    {
      id: 7,
      title: 'DevOps Engineer',
      scenarios: [
        {
          title: 'Improving Deployment Reliability',
          situation: 'Deployments frequently failed due to inconsistent environments.',
          task: 'I needed to stabilise the deployment pipeline.',
          action: 'I introduced infrastructure-as-code, standardised environments, and added automated tests.',
          result: 'Deployment failures dropped by 80%, and release frequency doubled.'
        },
        {
          title: 'Reducing Build Times',
          situation: 'Build times were slowing down development.',
          task: 'I was tasked with optimising the pipeline.',
          action: 'I implemented caching, parallelised steps, and upgraded build agents.',
          result: 'Build times decreased from 12 minutes to 4, improving developer productivity.'
        }
      ]
    },
    {
      id: 8,
      title: 'IT Manager / Team Lead',
      scenarios: [
        {
          title: 'Improving Team Performance',
          situation: 'Ticket resolution times were slipping below SLA.',
          task: 'I needed to improve team efficiency.',
          action: 'I introduced daily standups, clearer prioritisation rules, and cross-training.',
          result: 'SLA compliance rose from 82% to 97% within six weeks.'
        },
        {
          title: 'Leading a Major Upgrade',
          situation: 'We needed to upgrade our entire endpoint fleet to Windows 11.',
          task: 'I was responsible for planning and delivery.',
          action: 'I created a phased rollout plan, coordinated with departments, and ensured compatibility testing.',
          result: 'The upgrade completed on time with minimal disruption.'
        }
      ]
    },
    {
      id: 9,
      title: 'IT Business Analyst',
      scenarios: [
        {
          title: 'Gathering Requirements for a New System',
          situation: 'A department was struggling with an outdated workflow tool that caused delays.',
          task: 'I needed to gather requirements for a replacement system.',
          action: 'I ran workshops, mapped current processes, identified pain points, and translated them into clear functional requirements.',
          result: 'The new system reduced processing time by 35% and improved cross-team visibility.'
        },
        {
          title: 'Resolving Conflicting Stakeholder Needs',
          situation: 'Two teams wanted different features in a shared dashboard.',
          task: 'I had to align them and define a unified solution.',
          action: 'I facilitated a prioritisation session, used data to justify decisions, and created a roadmap that satisfied both groups.',
          result: 'The dashboard launched on time with strong adoption across both teams.'
        }
      ]
    },
    {
      id: 10,
      title: 'Software Developer',
      scenarios: [
        {
          title: 'Fixing a Critical Production Bug',
          situation: 'A production API endpoint started returning errors during peak usage.',
          task: 'I needed to diagnose and fix the issue quickly.',
          action: 'I reviewed logs, identified a race condition, patched the code, added tests, and deployed a hotfix.',
          result: 'Service was restored within 20 minutes, and no further incidents occurred.'
        },
        {
          title: 'Improving Code Quality',
          situation: 'Our codebase had inconsistent patterns that slowed development.',
          task: 'I was tasked with improving maintainability.',
          action: 'I introduced coding standards, refactored legacy modules, and added linting to CI.',
          result: 'Code review time dropped by 40%, and onboarding new developers became easier.'
        }
      ]
    },
    {
      id: 11,
      title: 'IT Compliance / Governance Analyst',
      scenarios: [
        {
          title: 'Preparing for an External Audit',
          situation: 'We had an upcoming ISO audit with several gaps identified.',
          task: 'I needed to bring documentation and processes up to standard.',
          action: 'I reviewed controls, updated policies, ran internal checks, and trained staff on compliance requirements.',
          result: 'We passed the audit with zero major findings.'
        },
        {
          title: 'Reducing Policy Violations',
          situation: 'Staff frequently bypassed security policies due to unclear guidance.',
          task: 'I needed to reduce violations.',
          action: 'I simplified policy language, created quick-reference guides, and held short awareness sessions.',
          result: 'Violations dropped by 50% within two months.'
        }
      ]
    },
    {
      id: 12,
      title: 'QA Tester / QA Engineer',
      scenarios: [
        {
          title: 'Catching a High-Impact Bug Before Release',
          situation: 'During regression testing, I noticed inconsistent behaviour in the checkout flow.',
          task: 'I needed to confirm and escalate the issue.',
          action: 'I reproduced the bug, documented steps, captured logs, and worked with developers to isolate the cause.',
          result: 'The fix prevented a major release-blocking defect that would have impacted thousands of users.'
        },
        {
          title: 'Improving Test Coverage',
          situation: 'Our automated test suite covered only 40% of critical paths.',
          task: 'I was tasked with increasing coverage.',
          action: 'I added new test cases, refactored flaky tests, and integrated coverage reporting.',
          result: 'Coverage increased to 85%, reducing post-release defects significantly.'
        }
      ]
    },
    {
      id: 13,
      title: 'Database Administrator (DBA)',
      scenarios: [
        {
          title: 'Optimising Slow Queries',
          situation: 'Users complained about slow report generation.',
          task: 'I needed to improve database performance.',
          action: 'I analysed query plans, added indexes, and rewrote inefficient queries.',
          result: 'Report generation time dropped from 45 seconds to under 5.'
        },
        {
          title: 'Restoring Data After Corruption',
          situation: 'A table became corrupted after a failed deployment.',
          task: 'I had to restore data quickly.',
          action: 'I isolated the issue, restored from point-in-time backup, and validated data integrity.',
          result: 'Data was fully restored within 30 minutes with no loss.'
        }
      ]
    },
    {
      id: 14,
      title: 'IT Project Manager',
      scenarios: [
        {
          title: 'Delivering a Project Under Tight Deadlines',
          situation: 'A client requested a major feature with a hard deadline.',
          task: 'I needed to deliver on time without compromising quality.',
          action: 'I reprioritised tasks, set up daily standups, and improved communication between dev and QA.',
          result: 'The feature launched on schedule and met all acceptance criteria.'
        },
        {
          title: 'Managing Stakeholder Expectations',
          situation: 'A project was at risk due to scope creep.',
          task: 'I had to regain control and reset expectations.',
          action: 'I documented changes, presented impact analysis, and negotiated a revised timeline.',
          result: 'Stakeholders agreed to a realistic scope, and the project was delivered successfully.'
        }
      ]
    },
    {
      id: 15,
      title: 'Data Analyst',
      scenarios: [
        {
          title: 'Creating a Dashboard for Leadership',
          situation: 'Leadership lacked visibility into weekly performance metrics.',
          task: 'I needed to build a clear, actionable dashboard.',
          action: 'I gathered requirements, cleaned data, built visualisations, and automated refreshes.',
          result: 'The dashboard became the primary tool for decision-making and reduced reporting time by 80%.'
        },
        {
          title: 'Identifying a Trend That Prevented Loss',
          situation: 'I noticed unusual spikes in transaction failures.',
          task: 'I needed to investigate and report findings.',
          action: 'I analysed logs, identified a pattern linked to a recent update, and escalated it to engineering.',
          result: 'The issue was fixed within hours, preventing significant revenue loss.'
        }
      ]
    },
    {
      id: 16,
      title: 'IT Trainer / Learning & Development',
      scenarios: [
        {
          title: 'Upskilling Staff on a New System',
          situation: 'A new ticketing system was rolled out, and staff struggled to adopt it.',
          task: 'I needed to train the entire department.',
          action: 'I created step-by-step guides, ran workshops, and offered follow-up clinics.',
          result: 'Adoption reached 95% within two weeks, and ticket handling improved.'
        },
        {
          title: 'Improving Training Effectiveness',
          situation: 'Feedback showed that previous training sessions were too theoretical.',
          task: 'I needed to make them more practical.',
          action: 'I introduced hands-on labs, real scenarios, and interactive quizzes.',
          result: 'Training satisfaction scores increased from 3.2 to 4.7 out of 5.'
        }
      ]
    },
    {
      id: 17,
      title: 'IT Support Technician (Advanced)',
      scenarios: [
        {
          title: 'Handling a Multi-User Outage',
          situation: 'Multiple users reported being unable to access shared drives.',
          task: 'I needed to diagnose and restore access quickly.',
          action: 'I checked domain controller logs, identified a replication failure, forced sync, and verified permissions.',
          result: 'Access was restored within 15 minutes, preventing workflow disruption across two departments.'
        },
        {
          title: 'Reducing Repeat Tickets',
          situation: 'We kept receiving the same VPN-related tickets.',
          task: 'I needed to reduce repeat issues.',
          action: 'I created a simple troubleshooting guide, updated onboarding materials, and ran a short training session.',
          result: 'VPN-related tickets dropped by 40% in the next quarter.'
        }
      ]
    },
    {
      id: 18,
      title: 'Desktop Support Engineer',
      scenarios: [
        {
          title: 'Deploying a New Endpoint Security Tool',
          situation: 'We needed to roll out new endpoint protection across 300 devices.',
          task: 'I was responsible for deployment and user readiness.',
          action: 'I created a deployment script, tested compatibility, and communicated changes to staff.',
          result: 'Deployment completed with zero downtime and full compliance.'
        },
        {
          title: 'Fixing a Persistent Performance Issue',
          situation: 'A senior manager\'s laptop kept freezing during presentations.',
          task: 'I needed to resolve it quickly and professionally.',
          action: 'I ran diagnostics, found a failing SSD, replaced it, restored data, and optimised startup apps.',
          result: 'The device performed flawlessly, and the manager praised the proactive support.'
        }
      ]
    },
    {
      id: 19,
      title: 'IT Operations Analyst',
      scenarios: [
        {
          title: 'Improving Monitoring Alerts',
          situation: 'Our monitoring system generated too many false alerts.',
          task: 'I needed to reduce noise and improve accuracy.',
          action: 'I reviewed thresholds, tuned alert rules, and added dependency mapping.',
          result: 'False alerts dropped by 60%, improving response efficiency.'
        },
        {
          title: 'Streamlining Incident Handover',
          situation: 'Shift handovers were inconsistent, causing delays.',
          task: 'I needed to standardise the process.',
          action: 'I created a handover template, introduced a 10-minute overlap, and trained the team.',
          result: 'Incident resolution times improved by 25%.'
        }
      ]
    },
    {
      id: 20,
      title: 'Infrastructure Engineer',
      scenarios: [
        {
          title: 'Rebuilding a Failing Server',
          situation: 'A critical application server was experiencing frequent crashes.',
          task: 'I needed to stabilise it.',
          action: 'I analysed logs, identified memory leaks, rebuilt the VM, and applied updated configs.',
          result: 'Crashes stopped entirely, and uptime returned to 99.9%.'
        },
        {
          title: 'Improving Backup Reliability',
          situation: 'Backups were failing intermittently.',
          task: 'I needed to ensure consistent backups.',
          action: 'I reconfigured schedules, added health checks, and tested restores.',
          result: 'Backup success rate increased from 78% to 100%.'
        }
      ]
    },
    {
      id: 21,
      title: 'Cloud Support Engineer',
      scenarios: [
        {
          title: 'Fixing a Misconfigured Load Balancer',
          situation: 'A customer\'s web app was experiencing intermittent 503 errors.',
          task: 'I needed to identify and fix the issue.',
          action: 'I reviewed logs, found a misconfigured health probe, corrected it, and validated traffic flow.',
          result: 'Errors disappeared, and the customer\'s SLA was restored.'
        },
        {
          title: 'Reducing Cloud Costs',
          situation: 'The client\'s monthly bill spiked unexpectedly.',
          task: 'I needed to identify the cause.',
          action: 'I analysed usage, found orphaned resources, and recommended right-sizing.',
          result: 'Costs dropped by 22% the following month.'
        }
      ]
    },
    {
      id: 22,
      title: 'Platform Engineer',
      scenarios: [
        {
          title: 'Improving Platform Reliability',
          situation: 'Deployments frequently caused downtime.',
          task: 'I needed to stabilise the platform.',
          action: 'I introduced blue-green deployments, improved observability, and automated rollbacks.',
          result: 'Deployment-related incidents dropped by 80%.'
        },
        {
          title: 'Scaling for High Traffic',
          situation: 'A product launch required handling 5× normal traffic.',
          task: 'I needed to prepare the platform.',
          action: 'I implemented auto-scaling, optimised caching, and load-tested the environment.',
          result: 'The launch ran smoothly with zero downtime.'
        }
      ]
    },
    {
      id: 23,
      title: 'SOC Analyst',
      scenarios: [
        {
          title: 'Detecting Suspicious Lateral Movement',
          situation: 'SIEM flagged unusual authentication attempts.',
          task: 'I needed to investigate and contain the threat.',
          action: 'I analysed logs, isolated the affected endpoint, reset credentials, and blocked the attacker\'s IP.',
          result: 'The intrusion was contained with no data loss.'
        },
        {
          title: 'Improving Alert Triage',
          situation: 'Analysts were overwhelmed by low-value alerts.',
          task: 'I needed to improve triage efficiency.',
          action: 'I tuned rules, added enrichment, and created a triage playbook.',
          result: 'Triage time improved by 50%.'
        }
      ]
    },
    {
      id: 24,
      title: 'Data Engineer',
      scenarios: [
        {
          title: 'Fixing a Broken ETL Pipeline',
          situation: 'A nightly ETL job failed, delaying reports.',
          task: 'I needed to restore data flow.',
          action: 'I traced the issue to malformed source data, added validation, and reprocessed the batch.',
          result: 'Reports were delivered within the hour, and the pipeline became more resilient.'
        },
        {
          title: 'Optimising Data Storage',
          situation: 'Storage costs were rising rapidly.',
          task: 'I needed to optimise usage.',
          action: 'I implemented partitioning, compression, and lifecycle policies.',
          result: 'Costs dropped by 35%.'
        }
      ]
    },
    {
      id: 25,
      title: 'AI/ML Engineer',
      scenarios: [
        {
          title: 'Improving Model Accuracy',
          situation: 'A classification model was underperforming.',
          task: 'I needed to improve accuracy.',
          action: 'I engineered new features, tuned hyperparameters, and added cross-validation.',
          result: 'Accuracy improved from 78% to 92%.'
        },
        {
          title: 'Reducing Model Inference Time',
          situation: 'The model was too slow for real-time use.',
          task: 'I needed to optimise performance.',
          action: 'I quantised the model, optimised the pipeline, and deployed it to a faster runtime.',
          result: 'Inference time dropped by 60%.'
        }
      ]
    },
    {
      id: 26,
      title: 'Product Manager (Tech)',
      scenarios: [
        {
          title: 'Prioritising Features',
          situation: 'Stakeholders requested conflicting features.',
          task: 'I needed to prioritise effectively.',
          action: 'I used a value-vs-effort matrix and customer data to justify decisions.',
          result: 'The roadmap gained alignment and delivered higher-impact features first.'
        },
        {
          title: 'Improving User Adoption',
          situation: 'A new feature had low adoption.',
          task: 'I needed to increase engagement.',
          action: 'I analysed usage data, simplified onboarding, and improved messaging.',
          result: 'Adoption increased by 45% in one month.'
        }
      ]
    },
    {
      id: 27,
      title: 'IT Change Manager',
      scenarios: [
        {
          title: 'Preventing Change Collisions',
          situation: 'Multiple teams scheduled overlapping changes.',
          task: 'I needed to prevent outages.',
          action: 'I introduced a centralised change calendar and approval workflow.',
          result: 'Change-related incidents dropped by 70%.'
        },
        {
          title: 'Improving CAB Efficiency',
          situation: 'CAB meetings were long and unproductive.',
          task: 'I needed to streamline them.',
          action: 'I created pre-CAB summaries and categorised changes by risk.',
          result: 'Meeting time reduced by 40%.'
        }
      ]
    },
    {
      id: 28,
      title: 'IT Procurement Specialist',
      scenarios: [
        {
          title: 'Reducing Licensing Costs',
          situation: 'Software licensing costs were increasing.',
          task: 'I needed to negotiate better terms.',
          action: 'I analysed usage, identified unused licenses, and renegotiated contracts.',
          result: 'Saved the company £120k annually.'
        },
        {
          title: 'Improving Vendor Performance',
          situation: 'A vendor consistently missed SLAs.',
          task: 'I needed to address the issue.',
          action: 'I held a performance review, updated KPIs, and introduced penalties.',
          result: 'SLA compliance improved to 98%.'
        }
      ]
    },
    {
      id: 29,
      title: 'IT Asset Manager',
      scenarios: [
        {
          title: 'Fixing Inventory Inaccuracies',
          situation: 'Asset records were outdated.',
          task: 'I needed to restore accuracy.',
          action: 'I conducted a full audit, implemented barcode tracking, and updated processes.',
          result: 'Accuracy improved from 60% to 99%.'
        },
        {
          title: 'Reducing Lost Devices',
          situation: 'Devices were frequently going missing.',
          task: 'I needed to reduce losses.',
          action: 'I introduced check-in/out procedures and automated reminders.',
          result: 'Lost devices dropped by 80%.'
        }
      ]
    },
    {
      id: 30,
      title: 'IT Team Lead',
      scenarios: [
        {
          title: 'Coaching Underperforming Staff',
          situation: 'A technician struggled with ticket quality.',
          task: 'I needed to improve performance.',
          action: 'I provided coaching, set clear expectations, and reviewed progress weekly.',
          result: 'Ticket quality improved significantly within a month.'
        },
        {
          title: 'Improving Team Morale',
          situation: 'The team felt overwhelmed during a major project.',
          task: 'I needed to boost morale.',
          action: 'I rebalanced workloads, introduced recognition rituals, and improved communication.',
          result: 'Engagement scores increased, and burnout decreased.'
        }
      ]
    }
  ];

  const toggleRole = (roleId: number) => {
    setExpandedRoles(prev =>
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const expandAll = () => {
    setExpandedRoles(roles.map(role => role.id));
  };

  const collapseAll = () => {
    setExpandedRoles([]);
  };

  const filteredRoles = roles.filter(role =>
    role.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">STAR Framework Interview Scenarios and Answers</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              The STAR framework is a structured method for answering behavioural interview questions by breaking your response into four parts: Situation, Task, Action, and Result.
            </p>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">What STAR Stands For</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
                  <h3 className="text-lg font-bold text-sky-900 mb-2">S – Situation</h3>
                  <p className="text-slate-700 text-sm">
                    Describe the context. Where were you? What was happening?
                  </p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">T – Task</h3>
                  <p className="text-slate-700 text-sm">
                    Explain the challenge or responsibility you faced.
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <h3 className="text-lg font-bold text-amber-900 mb-2">A – Action</h3>
                  <p className="text-slate-700 text-sm">
                    Detail the specific steps you took to address the task.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">R – Result</h3>
                  <p className="text-slate-700 text-sm">
                    Share the outcome, ideally with measurable impact (numbers, improvements, recognition).
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Use STAR in Interviews</h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold mt-0.5">•</span>
                  <span><strong>Identify behavioural questions:</strong> These often start with "Tell me about a time when…" or "Give me an example of…".</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold mt-0.5">•</span>
                  <span><strong>Choose relevant examples:</strong> Pick stories that showcase skills the employer values (teamwork, problem-solving, leadership).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold mt-0.5">•</span>
                  <span><strong>Structure your answer:</strong> Follow the STAR format consistently.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold mt-0.5">•</span>
                  <span><strong>Keep it concise:</strong> Aim for 1–2 minutes per answer.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sky-600 font-bold mt-0.5">•</span>
                  <span><strong>Highlight learning:</strong> Add what you learned or how you'd apply it in future roles.</span>
                </li>
              </ul>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Benefits of STAR</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Clarity</h3>
                  <p className="text-slate-700 text-sm">Prevents rambling and keeps answers focused.</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Confidence</h3>
                  <p className="text-slate-700 text-sm">Gives you a repeatable formula for any behavioural question.</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">Impact</h3>
                  <p className="text-slate-700 text-sm">Ensures you always end with results, showing measurable value.</p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Disclaimer</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                These interview role scenarios and STAR-style answers are intended purely as examples to showcase effective structure, clarity, and reasoning. They aren't designed to be memorised verbatim. Your strongest interview performance will come from drawing on your own experiences, challenges, and accomplishments. Treat these examples as a framework to shape your stories, but tailor the details so your responses highlight your genuine impact and the unique strengths you offer.
              </p>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Sample STAR Answer Library for Common IT Roles</h2>
                <div className="flex gap-2">
                  <button
                    onClick={expandAll}
                    className="px-4 py-2 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors"
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
                  placeholder="Search for a role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-3">
                {filteredRoles.map((role) => {
                  const isExpanded = expandedRoles.includes(role.id);
                  return (
                    <div key={role.id} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleRole(role.id)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-8 h-8 bg-sky-100 text-sky-700 font-bold text-sm rounded-lg">
                            {role.id}
                          </span>
                          <h3 className="font-semibold text-slate-900">{role.title}</h3>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-6 space-y-6 bg-white">
                          {role.scenarios.map((scenario, index) => (
                            <div key={index} className="space-y-4">
                              <h4 className="font-semibold text-slate-900 text-lg">
                                Scenario {index + 1} — {scenario.title}
                              </h4>
                              <div className="space-y-3">
                                <div className="flex gap-3">
                                  <div className="flex-shrink-0 w-6 h-6 bg-sky-100 text-sky-700 font-bold text-sm rounded flex items-center justify-center">
                                    S
                                  </div>
                                  <p className="text-slate-700 text-sm leading-relaxed">
                                    {scenario.situation}
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 font-bold text-sm rounded flex items-center justify-center">
                                    T
                                  </div>
                                  <p className="text-slate-700 text-sm leading-relaxed">
                                    {scenario.task}
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <div className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-700 font-bold text-sm rounded flex items-center justify-center">
                                    A
                                  </div>
                                  <p className="text-slate-700 text-sm leading-relaxed">
                                    {scenario.action}
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 font-bold text-sm rounded flex items-center justify-center">
                                    R
                                  </div>
                                  <p className="text-slate-700 text-sm leading-relaxed">
                                    {scenario.result}
                                  </p>
                                </div>
                              </div>
                              {index < role.scenarios.length - 1 && (
                                <div className="border-t border-slate-200 pt-6"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredRoles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500">No roles found matching "{searchTerm}"</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
