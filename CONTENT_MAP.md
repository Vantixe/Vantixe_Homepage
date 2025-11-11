# Vantixe Website - Content Location Map
## Your Guide to Editing Website Text Safely

**Last Updated:** 2025-01-11

---

## HOW TO USE THIS MAP

1. **Find the text** you want to edit in the sections below
2. **Check if it's LOCKED** (never change) or **EDITABLE** (safe to customize)
3. **Note the file and line numbers** to find it quickly
4. **Look for HTML comments** in the files marking locked/editable sections
5. **Edit carefully** - preserve HTML tags and structure

**Locked Content Symbol:** 🔒
**Editable Content Symbol:** ✏️

---

## LOCKED CONTENT - NEVER CHANGE THESE

### Brand Tagline
**Location:** Footer on all pages
**Files:** index.html, about.html, services.html, contact.html, insights.html
**Text:** "Procurement Excellence. Delivered."
**Why Locked:** Core brand messaging, consistent across all touchpoints

### Company Name
**Location:** Footer, contact pages, meta tags
**Files:** All HTML files
**Text:** "Vantixe Advisory Limited" / "Vantixe Advisory" / "VANTIXE"
**Why Locked:** Legal entity name

### Core Positioning Statement
**Location:** Homepage hero section
**File:** index.html (~line 65-70)
**Text:** "Expert-Led. AI-Enabled. Results-Driven."
**Why Locked:** Three-pillar positioning, central to brand identity

### Founder Information
**Location:** About page, homepage leadership
**Files:** about.html (~lines 228-231), index.html (~lines 280-285)
**Text:**
- Name: "Michael Seitz"
- Title: "Founder & Managing Director"
- Credentials: "Former KPMG Partner | Ex-GEP North Asia Leader"
**Why Locked:** Factual credentials, professional credibility

### Contact Information
**Location:** Footer and contact page
**Files:** All pages (footer), contact.html
**Text:**
- Email: "hello@vantixe.com"
- Phone: "(852) 5597 3898"
- Address: "Unit 1603, The L. Plaza, 367-375 Queen's Road Central, Sheung Wan, Hong Kong"
**Why Locked:** Accurate business contact details

### Disruption Story Headlines
**Location:** Homepage "Why Vantixe" section
**File:** index.html (~lines 118-180)
**Text:**
- "The Remote Work Revolution"
- "The AI Transformation"
**Why Locked:** Core narrative structure about industry disruption

### FT Banner Quote
**Location:** Homepage after trust signals
**File:** index.html (~lines 102-112)
**Text:** "Boutique advisory firms are proving that bigger isn't better. Focused is better..."
**Why Locked:** Strategic positioning validated by FT research

### Four Differentiators (Titles)
**Location:** Homepage "What Makes Us Different" section
**File:** index.html (~lines 195-237)
**Text:**
- "Specialist-Only Teams"
- "Senior-Led Engagements"
- "AI-Enhanced Delivery"
- "Compelling Value"
**Why Locked:** Four-pillar differentiation strategy

---

## LOCKED BUT CAN EDIT WITH CAREFUL REVIEW

### Four Differentiators (Descriptions)
**Location:** Homepage "What Makes Us Different" section
**File:** index.html (~lines 195-237)
**Why Partially Locked:** Core messaging, but descriptions can be refined if value prop needs sharpening
**⚠️ Caution:** Changes should maintain FT language ("fob clients off"), pricing positioning ("structurally lower cost base"), and specific AI applications

**Current Text:**
- **Specialist-Only Teams:** "Unlike Big Four firms that 'fob clients off with consultants lower down the ranks,' Vantixe lavishes senior-level time..."
- **Senior-Led Engagements:** "Your engagement partner isn't just a figurehead..."
- **AI-Enhanced Delivery:** "We've built custom apps for KYC automation, process triage, supplier risk monitoring..."
- **Compelling Value:** "Structurally lower cost base means better value for clients..."

### Service Descriptions
**Location:** Services page
**File:** services.html (~lines 62-180)
**Why Partially Locked:** Service offerings define what you do, changes should align with actual capabilities
**⚠️ Caution:** Titles are locked, descriptions can be enhanced as services evolve

**Service Titles (LOCKED):**
1. Cost Optimization
2. Procurement Transformation
3. Capability Building & Training
4. Category Management & Strategy
5. Supplier Management
6. Risk Management
7. Digital Procurement

### Core Narrative Elements
**Location:** About page "Our Story" section
**File:** about.html (~lines 62-91)
**Why Partially Locked:** Founding story and strategic positioning, should only change with major strategic shifts
**⚠️ Caution:** Maintains firm-focused positioning (not one-man band)

---

## EDITABLE CONTENT - SAFE TO CUSTOMIZE

### Hero Titles (Non-positioning)
**Location:** Top of each page
**Files:**
- index.html (~line 66): "Procurement Advisory for a New Era"
- about.html (~line 51): "About Vantixe"
- services.html (~line 51): "Our Services"
- contact.html (~line 51): "Get In Touch"

**Why Editable:** Descriptive headlines, can be adjusted for tone/emphasis

### Hero Descriptions
**Location:** Below hero titles on each page
**Files:** All main pages
**Example (index.html ~lines 75-80):**
"Vantixe delivers senior-level procurement expertise without the Big Four overhead. Our specialist teams bring 18+ years of experience to transform your procurement function—delivering measurable results at a fair price."

**Why Editable:** Supporting copy, can be refined for clarity or impact

### Call-to-Action Text
**Location:** Buttons throughout site
**Files:** All pages
**Current Text:**
- "Schedule Consultation"
- "Learn More"
- "Get In Touch"
- "Email Us"
- "Call Now"

**Why Editable:** CTA copy can be A/B tested for conversion optimization

### Service Descriptions (Body Text)
**Location:** Services page
**File:** services.html (~lines 62-180)
**Why Editable:** Detailed descriptions of what each service includes, can be enhanced as offerings evolve

### Body Paragraphs
**Location:** Throughout all pages
**Files:** All pages
**Examples:**
- About page company values descriptions
- Homepage explanatory paragraphs
- Contact page guidance text

**Why Editable:** Supporting content that explains and persuades

### Contact Page Instructions
**Location:** Contact page
**File:** contact.html (~lines 82-104)
**Text:** "What to Include in Your Message" checklist
**Why Editable:** Helpful guidance, can be adjusted based on inquiry quality

### Leadership Bio Details
**Location:** About page leadership section
**File:** about.html (~lines 240-284)
**Why Editable:** Career highlights and expertise details can be expanded/updated
**⚠️ Note:** Keep factual accuracy, don't exaggerate credentials

---

## QUICK REFERENCE - COMMON EDITS

### Change: Homepage Hero Description
**File:** index.html
**Line:** ~75-80
**Current:** "Vantixe delivers senior-level procurement expertise without the Big Four overhead..."
**Type:** ✏️ EDITABLE
**Look for HTML comment:** `<!-- ✏️ EDITABLE - Hero description -->`

### Change: Service Descriptions
**File:** services.html
**Lines:** ~62-180
**Type:** ⚠️ PARTIALLY LOCKED (titles locked, descriptions editable)
**Look for HTML comments:** `<!-- 🔒 LOCKED - Service title -->` and `<!-- ✏️ EDITABLE - Service description -->`

### Change: Call-to-Action Buttons
**Files:** All pages
**Type:** ✏️ EDITABLE
**Search for:** `class="btn btn-primary"` or `class="btn btn-secondary"`
**Change:** Text between `<a>` tags

### Change: Contact Email
**Files:** All pages (footer, contact page)
**Type:** 🔒 LOCKED
**Current:** hello@vantixe.com
**Warning:** Only change if email address actually changes

### Change: Phone Number
**Files:** All pages (footer, contact page)
**Type:** 🔒 LOCKED
**Current:** (852) 5597 3898
**Warning:** Only change if business number changes

---

## EDITING WORKFLOW - STEP BY STEP

### To Edit Text:

1. **Identify what you want to change** (use this map)
2. **Check if it's EDITABLE** (not locked)
3. **Open the file** in VS Code, Notepad++, or any text editor
4. **Find the text** (Ctrl+F to search)
5. **Look for HTML comments** marking the section
6. **Edit the text carefully** - don't delete HTML tags like `<p>`, `<h1>`, `<div>`, etc.
7. **Save the file**
8. **Test locally** if possible (open in browser)
9. **Upload to GitHub** (changes go live in 2-3 minutes)

### Example Edit:

**Want to change:** Hero description on homepage

**Step 1:** Open `index.html`

**Step 2:** Search for "Vantixe delivers senior-level"

**Step 3:** You'll see:
```html
<!-- ✏️ EDITABLE - Hero description -->
<p class="hero-description">
    Vantixe delivers senior-level procurement expertise without the Big Four overhead.
    Our specialist teams bring 18+ years of experience to transform your procurement
    function—delivering measurable results at a fair price.
</p>
<!-- ✏️ END EDITABLE -->
```

**Step 4:** Change ONLY the text between the `<p>` tags:
```html
<!-- ✏️ EDITABLE - Hero description -->
<p class="hero-description">
    Your new description goes here. Keep it concise and compelling.
</p>
<!-- ✏️ END EDITABLE -->
```

**Step 5:** Save, upload, done!

---

## HTML COMMENTS LEGEND

You'll see these comments throughout the HTML files:

### Locked Content:
```html
<!-- 🔒 LOCKED CONTENT - CORE BRAND MESSAGING -->
<p>Procurement Excellence. Delivered.</p>
<!-- 🔒 END LOCKED CONTENT -->
```
**Meaning:** DO NOT change this text without strategic review

### Editable Content:
```html
<!-- ✏️ EDITABLE - Feel free to customize -->
<p>Ready to transform your procurement function?</p>
<!-- ✏️ END EDITABLE -->
```
**Meaning:** Safe to change this text

### Partially Locked:
```html
<!-- ⚠️ PARTIALLY LOCKED - Title locked, description editable -->
<h3>Digital Procurement</h3> <!-- LOCKED -->
<p>Leverage technology and AI...</p> <!-- EDITABLE -->
<!-- ⚠️ END PARTIALLY LOCKED -->
```
**Meaning:** Some parts locked, some editable - read carefully

---

## FILE-BY-FILE SUMMARY

### index.html (Homepage)
- **LOCKED:** Tagline, core positioning, founder credentials, disruption headlines, differentiator titles, FT banner, contact info
- **EDITABLE:** Hero description, body paragraphs, CTA text, service previews
- **LINES TO AVOID:** 48-52 (tagline), 102-112 (FT banner), 118-180 (disruption stories), 195-237 (differentiator titles), 280-285 (founder info)

### about.html (About Page)
- **LOCKED:** Founder name/title/credentials, company name, core values titles
- **EDITABLE:** Story paragraphs, approach descriptions, values descriptions, career highlights details
- **LINES TO AVOID:** 228-231 (founder basic info), 306-311 (footer tagline)

### services.html (Services Page)
- **LOCKED:** 7 service titles
- **EDITABLE:** All service descriptions
- **SAFE TO EDIT:** Lines 62-180 (descriptions only, not titles)

### contact.html (Contact Page)
- **LOCKED:** Email (hello@vantixe.com), phone, address
- **EDITABLE:** Instructions, CTA text, guidance paragraphs
- **LINES TO AVOID:** 75-78 (email button), 116 (phone), 124 (email), 132-137 (address)

### insights.html (Insights Page)
- **FULLY EDITABLE:** Placeholder page for future content
- **No locked elements** (page is minimal)

---

## PROTECTING LOCKED CONTENT

### If Someone Changes Locked Content by Accident:

1. **Check Git history** (if using GitHub)
2. **Compare with previous version**
3. **Restore original text** from this map or Git
4. **Re-upload corrected version**

### Backup Strategy:

- **GitHub automatically saves all versions** (built-in version control)
- **Download a backup copy** of website folder monthly
- **Keep this CONTENT_MAP.md** as reference for original locked content

---

## LOCKED CONTENT REFERENCE - EXACT TEXT

### Core Brand Elements:
- **Company Name:** Vantixe Advisory Limited
- **Tagline:** Procurement Excellence. Delivered.
- **Positioning:** Expert-Led. AI-Enabled. Results-Driven.

### Founder Information:
- **Name:** Michael Seitz
- **Title:** Founder & Managing Director
- **Credentials:** Former KPMG Partner | Ex-GEP North Asia Leader

### Contact Details:
- **Email:** hello@vantixe.com
- **Phone:** (852) 5597 3898
- **Address:** Unit 1603, The L. Plaza, 367-375 Queen's Road Central, Sheung Wan, Hong Kong

### Disruption Headlines:
- **Story 1:** The Remote Work Revolution
- **Story 2:** The AI Transformation

### Four Differentiators:
1. Specialist-Only Teams
2. Senior-Led Engagements
3. AI-Enhanced Delivery
4. Compelling Value

### Seven Services:
1. Cost Optimization
2. Procurement Transformation
3. Capability Building & Training
4. Category Management & Strategy
5. Supplier Management
6. Risk Management
7. Digital Procurement

---

## QUESTIONS?

**Want to change something but not sure if it's safe?**
- Check this map first
- Look for HTML comments in the file
- When in doubt, ask before changing locked content

**Need to update locked content for legitimate reasons?**
- Update carefully
- Document why you changed it
- Update this CONTENT_MAP.md to reflect the change
- Communicate changes to team/contractors

**Want to add new content?**
- ✅ Safe to add new sections, pages, blog posts
- ✅ Safe to expand editable areas
- ⚠️ Don't duplicate or contradict locked messaging

---

**Remember:** Locked content protects your core brand identity and strategic positioning. Editable content gives you flexibility to optimize messaging, test different copy, and evolve as your business grows.

**This map ensures:** You can edit confidently while protecting what matters most.
