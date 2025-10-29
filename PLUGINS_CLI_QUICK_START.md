# Claude Code Plugins Workshop - CLI Quick Start

**For:** Workshop participants using Claude Code CLI
**Duration:** 45 minutes
**You already have:** Claude Code CLI running

---

## Before Workshop Starts

**You should already have:**
- Claude Code CLI running in your terminal
- Sample file downloaded: `sample-course-brief.md` in your current directory

---

## Part 1: Install Plugin (5 minutes)

**In Claude Code, follow these steps:**

### Step 1: Open plugin menu
```
/plugin
```

### Step 2: Add Marketplace
Select **"Add Marketplace"**, then enter:
```
https://github.com/jkruckivey/education-toolkit
```
✓ Wait for "Marketplace added successfully"

### Step 3: Install the plugin
Open plugin menu again:
```
/plugin
```
Select **"Browse and install plugins"**, then choose **"education-toolkit"**
✓ Wait for "installed successfully" message

### Step 4: Verify installation
```
/plugin list
```
✓ You should see `education-toolkit (v2.6.2)` with checkmark

### Step 5: Test it works
```
Use the rubric-generator agent to create a rubric
```
✓ Claude should ask "What assignment would you like to create a rubric for?"

---

## Part 2: Exercise 1 - Create Course Outline (10 minutes)

### Step 1: Read the sample file
```
Read the file sample-course-brief.md
```
Claude will show you the SME notes

### Step 2: Invoke the agent
```
Use the course-outline-creator agent to transform this course brief into a complete 5-week MBA course outline. Include: CLOs using QM standards, weekly structure with MLOs, assessment strategy with alignment matrix, concept threading map, and practitioner integration plan. Ask me about course format (cohort vs self-paced) and any other details you need.
```

### Step 3: Answer questions
- **Course format?** Say "cohort-based"
- **Duration?** Confirm "5 weeks"
- Answer other clarifications from the brief

### ✅ What You'll Get
- 5 Course Learning Outcomes (CLOs)
- Weekly structure with themes and MLOs
- Assessment strategy with alignment matrix
- Concept threading map
- Practitioner integration plan

---

## Part 3: Exercise 2 - Build Week 1 Storyboard (15 minutes)

### The outline is already in your session - no need to re-read!

### Type this prompt:
```
Use the uplimit-storyboard-builder agent to create a detailed Week 1 storyboard based on the course outline we just created. I need copy-paste-ready content for all modules including: element tables, text blocks written in full, infoboxes, widget specifications, video scripts, assessment instructions, and design rationale for each choice. Use the varied content delivery principles to ensure interactive, engaging design.
```

### Review the output (takes 2-3 minutes to generate)
- 7-8 modules for Week 1
- Element tables showing structure
- Complete text blocks
- Widget specifications
- Assessment instructions with rubrics
- Design rationale

### ✅ This demonstrates agent integration
Outline (strategic) → Storyboard (detailed) = complete workflow

---

## Part 4: Exercise 3 - Choose Your Tool (5-10 minutes)

### Option A: Generate Assessment Rubric

**Step 1:** Use the storyboard's assessment from Exercise 2 (already in your session)

**Step 2:** Generate rubric
```
Use the rubric-generator agent to create a detailed rubric for the Week 1 assessment in the storyboard
```

**✅ You'll Get:** QM-aligned rubric with 4 performance levels, evaluation criteria, point distribution

---

### Option B: Audit Accessibility

**Step 1:** Ask Claude to create sample HTML
```
Create a simple HTML page with an h1 heading, a paragraph, an image, and a button
```

**Step 2:** Audit for WCAG violations
```
Use the accessibility-auditor agent to check this HTML for WCAG 2.2 AA compliance
```

**✅ You'll Get:** Violations identified with line numbers and specific fixes

---

## Troubleshooting

### Can't find sample-course-brief.md
- Check current directory: `pwd` (Mac) or `cd` (Windows)
- Download the file from the workshop website to your current directory
- Verify file exists with `ls` (Mac) or `dir` (Windows)

### Plugin commands not working
- Verify plugin installed: `/plugin list`
- Check spelling: `jameskruck` (not jameskruk)
- Try reinstalling: `/plugin uninstall education-toolkit` then `/plugin install education-toolkit`

---

## After Workshop

### Try with your own content
- Bring a course you're developing
- Use same workflow: outline → storyboard
- Try other agents based on your needs

### Explore all 13 agents
```
/plugin help education-toolkit
```

**Popular agents:**
- `course-outline-creator` - Strategic course planning
- `uplimit-storyboard-builder` - Detailed module design
- `rubric-generator` - Quick rubric-only tasks
- `accessibility-auditor` - WCAG compliance checking
- `peer-review-simulator` - 6-specialist design review
- `consistency-checker` - Cross-module validation

### Get help
- **Office hours:** [Your schedule]
- **Email:** jkruck@ivey.ca
- **Docs:** github.com/jkruckivey/education-toolkit

---

## Quick Reference Commands

```bash
# Plugin management
/plugin list                        # See installed plugins
/plugin help education-toolkit      # See all agents

# Most-used agent invocations (use natural language)
Use the rubric-generator agent to...           # Create assessment rubrics
Use the accessibility-auditor agent to...      # Check accessibility
Use the uplimit-storyboard-builder agent to... # Detailed module content
Use the consistency-checker agent to...        # Validate across modules
Use the peer-review-simulator agent to...      # 6-specialist review

# File handling
Read [filename]                     # Have Claude read a file in current directory
```

---

**Built for Ivey EdTech Lab**
**Workshop Date:** [Your date]
**Facilitator:** James Kruck (jkruck@ivey.ca)
