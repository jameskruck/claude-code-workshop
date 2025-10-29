CLAUDE CODE PLUGINS WORKSHOP - STARTER PACK
===========================================

This starter pack contains three sample files for hands-on practice with the education-toolkit plugin.

📁 FILES INCLUDED:
-----------------

1. sample-course-brief.md
   PURPOSE: Practice using course-outline-creator agent
   SCENARIO: Transform rough SME notes into structured course outline
   TOPIC: Strategic Pricing for B2B SaaS (5-week MBA course)
   WHAT YOU'LL DO:
   - Create Course Learning Outcomes (CLOs) using QM standards
   - Design weekly structure with Module Learning Outcomes (MLOs)
   - Plan assessment strategy with alignment matrix
   - Build concept threading map to prevent orphaned topics

2. assignment-description.md
   PURPOSE: Practice using rubric-generator agent
   TASK: Generate QM-aligned rubric for case analysis assignment
   TOPIC: Slack pricing strategy analysis memo
   WHAT YOU'LL DO:
   - Create 100-point rubric with clear evaluation criteria
   - Define performance levels (Exemplary/Proficient/Developing/Needs Improvement)
   - Ensure alignment with assignment learning objectives
   - Add student-facing and faculty-facing versions

3. module-draft.html
   PURPOSE: Practice using accessibility-auditor agent
   SCENARIO: Module content with 16 intentional WCAG violations
   WHAT YOU'LL FIX:
   - Low contrast text (fails WCAG 2.2 AA 4.5:1 ratio)
   - Missing alt text on images
   - Improper heading hierarchy (skipping levels)
   - Missing table headers (<th> elements)
   - Non-semantic interactive elements (div instead of button)
   - Tiny text (8px - fails minimum 12px requirement)
   - Color-only information conveyance (red = important)
   - Missing form labels
   - "Click here" non-descriptive links


🚀 HOW TO USE THESE FILES:
--------------------------

STEP 1: Install the plugin (if you haven't already)
   - Open Claude Code: https://claude.ai/code
   - Type: /plugin marketplace add jameskruck/education-toolkit
   - Type: /plugin install education-toolkit

STEP 2: Upload sample files to Claude Code
   - Drag and drop each file into your Claude Code project
   OR
   - Copy-paste file contents into new files

STEP 3: Follow workshop exercises

   EXERCISE 1: Create Course Outline (15 min)
   - Open sample-course-brief.md in Claude Code
   - Say: "Use the course-outline-creator agent to transform this brief into a complete 5-week course outline with CLOs, MLOs, weekly structure, assessment strategy, and concept threading."
   - Review the structured outline Claude creates
   - Notice how it references the bundled knowledge base (Ivey 6-phase process, concept threading patterns)

   EXERCISE 2: Generate Assessment Rubric (10 min)
   - Open assignment-description.md in Claude Code
   - Say: "/generate-rubric for this assignment"
   - Review the QM-aligned rubric with evaluation criteria
   - Ask: "Add a student-facing version without point breakdowns"
   - Notice automatic QM validation (proactive quality checks)

   EXERCISE 3: Audit Accessibility (10 min)
   - Open module-draft.html in Claude Code
   - Say: "/audit-module for WCAG 2.2 AA compliance"
   - Review the 16 violations identified with line numbers
   - Ask: "Fix all critical violations"
   - Compare before/after - see how plugin provides copy-paste fixes


💡 TIPS FOR SUCCESS:
--------------------

- TAKE YOUR TIME: Read Claude's responses carefully - they include rationale, not just outputs
- ASK FOLLOW-UP QUESTIONS: "Why did you structure MLOs this way?" or "How did you determine these rubric criteria?"
- EXPERIMENT: Try requesting changes - "Make this rubric more focused on critical thinking" or "Add a diagnostic pre-assessment section"
- USE SLASH COMMANDS: They're shortcuts to common workflows (/generate-rubric, /audit-module, /check-consistency)
- REFERENCE KNOWLEDGE BASE: The plugin has 614 KB of bundled frameworks - agents cite them automatically


🎯 LEARNING OUTCOMES:
---------------------

After completing these exercises, you will be able to:
✅ Transform rough course ideas into QM-compliant outlines in 5 minutes (vs. 30+ minutes manual)
✅ Generate comprehensive assessment rubrics aligned with learning outcomes
✅ Identify and fix WCAG 2.2 AA accessibility violations with specific line-number guidance
✅ Understand when to use specialized agents vs. slash commands
✅ Leverage bundled knowledge bases for institutional standards (Ivey process, QM, WCAG, UDL)


📚 ADDITIONAL RESOURCES:
------------------------

Plugin Documentation: https://github.com/jkruckivey/education-toolkit
All 13 Agents Available:
  - course-outline-creator (strategic planning)
  - uplimit-storyboard-builder (detailed module design)
  - assessment-designer (PAIRR, AI roleplay, comprehensive assessments)
  - rubric-generator (quick QM-aligned rubrics)
  - accessibility-auditor (WCAG 2.2 AA compliance)
  - consistency-checker (cross-module validation)
  - peer-review-simulator (6-specialist design review)
  - widget-tester (3-persona UX testing)
  - student-journey-simulator (4-persona experience testing)
  - backend-reviewer (FastAPI/Python code review)
  - frontend-reviewer (React/JSX accessibility review)
  - branding-checker (Canvas/Uplimit platform compliance)
  - udl-content-generator (multimodal content transformation)

10 Slash Commands for Quick Workflows:
  /audit-module, /build-storyboard, /check-branding, /check-consistency,
  /design-assessment, /generate-rubric, /peer-review, /review-content,
  /simulate-journey, /test-widget


❓ TROUBLESHOOTING:
-------------------

ISSUE: Plugin commands not recognized
FIX: Type /plugin list to verify education-toolkit is installed
     If not listed, reinstall: /plugin install education-toolkit

ISSUE: Agent doesn't reference knowledge base
FIX: Agents auto-reference when relevant - try asking: "What does the Ivey 6-phase process recommend for this stage?"

ISSUE: Rubric doesn't match my institution's standards
FIX: Specify requirements: "Generate rubric using [your institution]'s standards with [specific criteria]"

ISSUE: Accessibility audit too detailed
FIX: Ask for prioritized list: "Show me only critical violations that would block launch"


🎉 WHAT'S NEXT:
---------------

After mastering these basics, explore:
- Creating PAIRR (Peer and AI Review + Reflection) assignments
- Designing AI Roleplay exercises for conversational assessment
- Building complete week-by-week course storyboards
- Running multi-perspective peer design reviews
- Simulating student journeys through your courses


Built for Ivey EdTech Lab
Workshop created: January 2025
Questions? Contact jkruck@ivey.ca
