# Claude Code Plugins Workshop - Facilitator Guide

**Duration:** 45 minutes
**Format:** Hands-on workshop with live facilitation
**Prerequisites:** Participants have Claude Code access (Pro/Max subscription)

---

## Workshop Overview

This workshop introduces Learning Experience Designers to Claude Code plugins through hands-on practice with the Education Toolkit plugin. Participants will experience the complete course development workflow: strategic planning → detailed design → quality assurance.

**Key Outcome:** Participants leave with 3 real deliverables they can immediately use in their work.

---

## Materials Needed

### Facilitator Setup
- [ ] Projector/screen share capability for live demonstrations
- [ ] Own Claude Code window open for demonstrations
- [ ] Education Toolkit plugin installed (`/plugin install education-toolkit`)
- [ ] Sample files downloaded and ready to demonstrate
- [ ] Backup: Screenshots of expected outputs in case of technical issues

### Participant Requirements
- [ ] Laptop with internet connection
- [ ] Claude Code access (verify in advance!)
- [ ] Sample file available for download from workshop website:
  - `sample-course-brief.md`

### Distribution Options
- **Workshop website:** Download link on plugins-setup.html page
- **Email backup:** Send sample-course-brief.md 24 hours before workshop
- **GitHub Pages:** https://jameskruck.github.io/claude-code-workshop/plugins-setup.html

---

## Detailed Session Plan

### Part 1: Introduction to Plugins (10 minutes)

**1.1 Hook with Before/After Comparison (3 min)**

*Show slide or live demonstration comparing task times*

**Script:**
> "Raise your hand if you've spent 30 minutes creating an assessment rubric, checking QM standards, making sure you have the right Bloom's verbs, calculating point totals... We've all been there. What if I told you we could do that in 2 minutes with the same quality? That's what plugins give us."

**Live Demo:**
- Open Claude Code on screen
- Type "Use the rubric-generator agent to create a rubric" and show immediate response asking for assignment details
- Contrast with: "Without plugins, I'd have to explain QM standards, describe rubric structure, provide examples..."

**Key Message:** Plugins are domain experts that know your institutional standards automatically.

---

**1.2 What Are Plugins? (4 min)**

**Talking Points:**
- Plugins = specialized AI agents with built-in expertise
- Education Toolkit knows: QM, WCAG 2.2 AA, UDL, Bloom's, Ivey's 6-phase process
- 13 agents + 10 slash commands
- 614 KB bundled knowledge base (frameworks + research)

**Visual Aid:** Show plugins-intro.html comparison table on screen

**Common Questions to Address:**
- *"Do I need to pay extra?"* - No, included with Claude Code subscription
- *"Can I make my own plugins?"* - Yes! Advanced topic for future workshop
- *"Do plugins work across all my courses?"* - Yes, once installed they're available in all projects

---

**1.3 Workshop Roadmap (3 min)**

**Script:**
> "Today you'll experience the complete course development workflow. We'll start with rough SME notes, create a strategic outline, then build detailed module content. You'll leave with 3 real deliverables you can use in your actual work."

**Timeline Preview:**
- 5 min: Installation (we'll do together)
- 10 min: Exercise 1 - Create course outline
- 15 min: Exercise 2 - Build Week 1 storyboard
- 5-10 min: Exercise 3 - Choose your tool (rubric or accessibility)
- 5 min: Wrap-up and next steps

**Expectation Setting:**
- "I'll demo each exercise first, then you try"
- "Ask questions anytime - everyone is learning together"
- "If you get an error, raise your hand - we'll troubleshoot together"

---

### Part 2: Installation (5 minutes)

**2.1 Live Walk-Through**

**Script:**
> "Everyone open claude.ai/code in your browser. We'll install the plugin together step by step. Don't rush - I'll wait for everyone at each checkpoint."

**Step-by-Step (Type on screen as you instruct):**

```
Step 1: /plugin marketplace add jameskruck/education-toolkit
[Wait for confirmations from participants]

Step 2: /plugin install education-toolkit
[Wait for confirmations]

Step 3: /plugin list
[Everyone should see education-toolkit with checkmark]
```

**Checkpoint Questions:**
- "Raise your hand when you see the confirmation message"
- "Anyone seeing an error? Let's troubleshoot now before moving on"

**Common Issues & Fixes:**
| Issue | Fix |
|-------|-----|
| "Command not found" | Typo in plugin name - check spelling: jameskruck |
| "Plugin not found" | Check internet connection, try again |
| Claude Code won't load | Clear cache, try incognito mode |

---

**2.2 Test Installation (2 min)**

**Everyone Together:**
```
Type: Use the rubric-generator agent to create a rubric
```

**Expected Result:** Claude Code asks "What assignment would you like to create a rubric for?"

**Script:**
> "Perfect! If you see Claude asking about your assignment, you're all set. If not, raise your hand now."

---

### Part 3: Hands-On Exercises (30 minutes)

#### Exercise 1: Create Course Outline (10 minutes)

**3.1 Facilitator Demonstration (3 min)**

**Setup:**
> "Open sample-course-brief.md. This is what real SME notes look like - messy, incomplete, lots of questions. Our job as LEDs is to transform this into a structured course outline."

**Live Demo on Screen:**
1. Upload `sample-course-brief.md` to Claude Code
2. Type the prompt (show from plugins-activities.html)
3. Answer agent's questions:
   - Course format? "cohort-based"
   - Duration? "5 weeks"
   - Other details? Answer from the brief
4. Show the output as it generates

**Point Out:**
- "Notice it's asking about course format first - this was added in v2.6.2 because it affects every design decision"
- "See how it references the Ivey 6-phase process? That's the bundled knowledge base"
- "Look at the concept threading map - this prevents orphaned topics that are taught once and never revisited"

---

**3.2 Participants Try It (7 min)**

**Instructions:**
> "Your turn! Upload the course brief file and use the same prompt. Take 7 minutes. I'll walk around to help."

**Facilitation Tips:**
- Circulate the room checking screens
- Watch for common issues:
  - File not uploaded before prompting
  - Rushing through agent questions
  - Uncertainty about answers (encourage: "make your best judgment - this is practice!")

**Early Finisher Activity:**
> "Done early? Try asking: 'Can you add more detail to the Week 3 structure?' or 'What would change if this was self-paced instead?'"

**Time Warning:**
- At 5 min: "Two minutes left everyone!"
- At 7 min: "Let's come back together"

---

**3.3 Debrief (1-2 min)**

**Ask Group:**
- "Who got a complete outline? Quick thumbs up"
- "What surprised you about what the agent created?"
- "How long would this normally take you? [Answers typically: 30-60 min] This took us 7 minutes."

---

#### Exercise 2: Build Week 1 Storyboard (15 minutes)

**3.4 Facilitator Demonstration (4 min)**

**Setup:**
> "Now comes the magic - we're going to take that outline and build detailed Week 1 content. Copy-paste-ready for your LMS. This is where the workflow power becomes clear."

**Live Demo:**
1. In the same Claude Code session (outline is already there)
2. Type the storyboard prompt (show from plugins-activities.html)
3. Let it generate - this takes 2-3 minutes (can fast-forward if needed)

**Point Out While Generating:**
- "It's creating 7-8 modules for Week 1"
- "Each module has element tables, full text blocks, widget specs, assessments"
- "Notice it references the varied content delivery guide - breaking long text into interactive elements"

**Show Key Outputs:**
- Module 0 (Bridge-In) with hook
- Module 1 (Welcome) with learning outcomes
- Module 3 (Core Content) with widget specifications
- Module 6 (Assessment) with rubric

**Emphasize:**
> "This would normally take me 3-4 hours to write. We're getting 90% of it in 3 minutes. Then I spend 30 minutes customizing, not 4 hours starting from scratch."

---

**3.5 Participants Try It (11 min)**

**Instructions:**
> "Your turn! Use the outline already in your session and ask for a Week 1 storyboard. This generates a LOT of content - take your time reading through it. You have 10 minutes."

**Facilitation Tips:**
- This exercise generates 1,500-2,000 lines of content
- Participants may feel overwhelmed - that's normal
- Encourage skimming: "Don't read every word - scan the structure, notice the patterns"
- Watch for:
  - Participants trying to read everything (coach: "scroll through, spot-check modules")
  - Confusion about what to do with output (answer: "this would go into your LMS, usually in sections")

**Mid-Exercise Prompt (at 5 min):**
> "Everyone, pause for a second. Scroll to Module 3 or Module 4. Notice the widget specifications? See how detailed they are - interaction flows, success states, what happens when students click. That level of detail is what makes this build-ready."

**Early Finisher Activity:**
> "Done reviewing? Try asking: 'Add more knowledge checks to Module 3' or 'Expand the assessment rubric with more detailed criteria'"

**Time Warning:**
- At 8 min: "Three minutes left to review"
- At 11 min: "Let's come back together"

---

**3.6 Debrief (2-3 min)**

**Ask Group:**
- "What did you notice about the storyboard structure?"
- "Who found the widget specifications helpful?"
- "Big question: Could you actually use this in a real course build? [Most will say yes with minor edits]"

**Key Teaching Point:**
> "You just experienced the course development pipeline: strategic outline → detailed storyboard. This is how the agents work together. Most educational developers do these steps separately over days or weeks. We did it in 25 minutes."

---

#### Exercise 3: Choose Your Tool (5-10 minutes)

**3.7 Choice Setup (1 min)**

**Script:**
> "For our last exercise, you choose based on what you need right now. Option A: Generate an assessment rubric. Option B: Audit a module for accessibility. Both take 5-10 minutes. Pick whichever is more relevant to your current work. If you have time, do both!"

**Show on Screen:** plugins-activities.html with both options side-by-side

---

**3.8 Facilitator Quick Demos (2 min total)**

**Option A Demo (1 min):**
1. Say: "We already have the storyboard from Exercise 2"
2. Type: "Use the rubric-generator agent to create a detailed rubric for the Week 1 assessment in the storyboard"
3. Show the 100-point rubric output
4. Point out: "QM-aligned, 4 performance levels, aligned to learning objectives from the storyboard"

**Option B Demo (1 min):**
1. Type: "Create a simple HTML page with an h1 heading, a paragraph, an image, and a button"
2. Then type: "Use the accessibility-auditor agent to check this HTML for WCAG 2.2 AA compliance"
3. Show the violations found (missing alt text, button labels)
4. Point out: "Line numbers, specific fixes, prioritized by severity"

---

**3.9 Participants Choose & Work (7 min)**

**Instructions:**
> "Pick your exercise and go! I'll circulate to help. If you finish one quickly, try the other."

**Facilitation:**
- Split attention between both groups
- Option A participants: Watch for confusion about rubric customization
- Option B participants: Watch for overwhelm at number of violations (coach: "this is intentionally broken for practice - real modules usually have 2-3 issues, not 16")

**Time Warning:**
- At 5 min: "Two minutes if you want to try the other option!"
- At 7 min: "Wrap up your current exercise"

---

### Part 4: Wrap-Up & Next Steps (5 minutes)

**4.1 Group Reflection (2 min)**

**Ask:**
- "What agent would save you the most time in your actual work?"
- "What surprised you most about using plugins?"
- "Who plans to use this for a real course they're developing?"

**Facilitate Quick Discussion:**
- Let 2-3 people share specific use cases
- Affirm each response: "Yes, that's exactly what [agent-name] was designed for"

---

**4.2 Next Steps (2 min)**

**Provide:**
1. **Try with your own content:**
   - "Bring a course you're developing and use the same workflow"
   - "Start with outline → storyboard, then try other agents"

2. **Explore all 13 agents:**
   - Show command: `/plugin help education-toolkit`
   - "peer-review-simulator for design feedback"
   - "consistency-checker for cross-module validation"
   - "assessment-designer for PAIRR and AI Roleplay"

3. **Get help:**
   - Office hours: [Your schedule]
   - Email: jkruck@ivey.ca
   - Documentation: github.com/jkruckivey/education-toolkit

**Resources to Share:**
- Workshop site URL (for referencing later)
- Download link for sample-course-brief.md (if needed)
- Cheat sheet with most-used commands

---

**4.3 Final Message (1 min)**

**Script:**
> "You just learned a workflow that will save you hours every week. But more importantly, you learned that AI can be a thought partner, not just a faster word processor. The agents ask good questions, reference best practices, and produce professional-quality outputs. Use this to spend less time on structure and more time on the creative instructional design that only you can do."

---

## Post-Workshop Follow-Up

### Immediate (Same Day)
- [ ] Send thank-you email with:
  - Workshop site link
  - Download link for sample-course-brief.md (if needed)
  - Office hours schedule
  - Quick reference card (agent invocations)

### Week 1
- [ ] Check in with participants via email:
  - "Have you tried it with your own course yet?"
  - "What questions came up?"
  - "Would a follow-up session help?"

### Month 1
- [ ] Track adoption:
  - How many are using the plugin regularly?
  - What agents are most popular?
  - What pain points remain?

### Future Workshops
- **Advanced Topics:**
  - PAIRR assignment design
  - AI Roleplay exercise creation
  - Multi-week consistency checking
  - Creating custom plugins

---

## Troubleshooting Guide

### Common Technical Issues

**Issue:** Participant can't access Claude Code
- **Fix:** Verify Claude Pro/Max subscription active
- **Backup:** Pair with another participant to observe

**Issue:** Plugin installation fails
- **Fix:** Check spelling (jameskruck not jameskruk)
- **Fix:** Try `/plugin uninstall education-toolkit` then reinstall
- **Backup:** Use facilitator's screen to continue, troubleshoot offline

**Issue:** Agent responses are slow/timeout
- **Fix:** Claude Code can be slow during peak times (10am-2pm ET)
- **Backup:** Have screenshots of expected outputs to keep workshop moving

**Issue:** Participants rush through exercises
- **Fix:** Provide "early finisher" activities (deeper questions, customization requests)
- **Fix:** Encourage helping neighbors

**Issue:** Participants get stuck/overwhelmed
- **Fix:** "You're not expected to read every line - focus on understanding the structure"
- **Fix:** Pair them with a faster participant as buddy

---

## Facilitator Self-Reflection

### After Workshop, Ask Yourself:

- What exercises worked well?
- Where did participants get stuck?
- What questions came up repeatedly? (Add to FAQ)
- What would you change about timing?
- Did everyone leave with 3 deliverables?
- What follow-up support is needed?

### Metrics to Track:

- % of participants who completed all 3 exercises
- Most common errors encountered
- Most popular "choose your tool" option (A or B)
- Attendance at follow-up office hours
- Adoption rate (are they using it in real work?)

---

## Quick Reference Card (Print for Participants)

```
EDUCATION TOOLKIT PLUGIN - QUICK REFERENCE
==========================================

INSTALLATION:
/plugin marketplace add jameskruck/education-toolkit
/plugin install education-toolkit

TOP 5 MOST-USED AGENTS (invoke with natural language):
Use the rubric-generator agent to... - Create assessment rubrics
Use the accessibility-auditor agent to... - Check WCAG 2.2 AA
Use the uplimit-storyboard-builder agent to... - Detailed module content
Use the consistency-checker agent to... - Validate across modules
Use the peer-review-simulator agent to... - 6-specialist design review

OTHER AGENTS:
course-outline-creator - Strategic course planning
uplimit-storyboard-builder - Detailed module design
assessment-designer - PAIRR, AI Roleplay, advanced assessments
rubric-generator - Quick rubric-only tasks
accessibility-auditor - WCAG compliance checking

HELP:
/plugin help education-toolkit - See all agents
Office Hours: [Your schedule]
Email: jkruck@ivey.ca
Docs: github.com/jkruckivey/education-toolkit
```

---

**Facilitator:** James Kruck (jkruck@ivey.ca)
**Last Updated:** January 2025
**Version:** 1.0 (for v2.6.2 of education-toolkit plugin)
