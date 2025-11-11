# Quick Edit Guide
## How to Change Text on Your Vantixe Website

**Last Updated:** 2025-01-11

---

## STEP-BY-STEP: EDITING TEXT

### 1. Find What You Want to Change

**Use the Content Map:**
- Open `CONTENT_MAP.md`
- Search (Ctrl+F) for the text you want to edit
- Check if it's **LOCKED** 🔒 or **EDITABLE** ✏️
- Note the file name and approximate line numbers

### 2. Open the File

**Tools you can use:**
- **VS Code** (recommended - free, easy to use)
- **Notepad++** (free, simple)
- **Sublime Text** (free version available)
- **Regular Notepad** (works, but no line numbers)

**Download VS Code:** https://code.visualstudio.com/

### 3. Look for HTML Comments

When you open the file, you'll see comments like this:

```html
<!-- ✏️ EDITABLE - Hero description -->
<p class="hero-description">
    This text is safe to change!
</p>
<!-- ✏️ END EDITABLE -->
```

Or:

```html
<!-- 🔒 LOCKED CONTENT - Core brand messaging -->
<p>Procurement Excellence. Delivered.</p>
<!-- 🔒 END LOCKED CONTENT -->
```

### 4. Edit the Text

**✅ DO:**
- Change text between HTML tags
- Keep HTML tags intact (like `<p>`, `<h1>`, etc.)
- Save the file when done

**❌ DON'T:**
- Delete HTML tags (things in `< >` brackets)
- Change text marked as 🔒 LOCKED
- Remove the HTML comments (they're your guide!)

---

## COMMON EDITS - EXAMPLES

### Example 1: Change Homepage Hero Description

**What you want:** Change the main description on homepage

**Steps:**

1. **Open:** `index.html`
2. **Search for:** "Vantixe delivers senior-level"
3. **You'll find:**

```html
<!-- ✏️ EDITABLE - Hero description -->
<p class="hero-description">
    Vantixe delivers senior-level procurement expertise without the Big Four overhead.
    Our specialist teams bring 18+ years of experience to transform your procurement
    function—delivering measurable results at a fair price.
</p>
<!-- ✏️ END EDITABLE -->
```

4. **Change ONLY the text inside the `<p>` tags:**

```html
<!-- ✏️ EDITABLE - Hero description -->
<p class="hero-description">
    Your new description goes here. Make it compelling and concise.
</p>
<!-- ✏️ END EDITABLE -->
```

5. **Save the file**

---

### Example 2: Update a Service Description

**What you want:** Change description for "Cost Optimization" service

**Steps:**

1. **Open:** `services.html`
2. **Search for:** "Cost Optimization"
3. **You'll find:**

```html
<!-- 🔒 LOCKED - Service title -->
<h2>Cost Optimization</h2>
<!-- 🔒 END LOCKED -->
<!-- ✏️ EDITABLE - Service description -->
<p class="leader-bio">
    Vantixe's cost optimization services help organizations...
</p>
```

4. **Change ONLY the text inside the `<p class="leader-bio">` tags**
5. **DON'T change** the `<h2>Cost Optimization</h2>` (it's locked!)
6. **Save the file**

---

### Example 3: Change a Call-to-Action Button

**What you want:** Change "Schedule Consultation" to "Get Started"

**Steps:**

1. **Open:** `index.html` (or any page with the button)
2. **Search for:** "Schedule Consultation"
3. **You'll find:**

```html
<!-- ✏️ EDITABLE - CTA button text -->
<div class="hero-cta">
    <a href="contact.html" class="btn btn-primary btn-lg">Schedule Consultation</a>
    <a href="#about" class="btn btn-white btn-lg">Learn More</a>
</div>
<!-- ✏️ END EDITABLE -->
```

4. **Change the text between the `<a>` tags:**

```html
<!-- ✏️ EDITABLE - CTA button text -->
<div class="hero-cta">
    <a href="contact.html" class="btn btn-primary btn-lg">Get Started</a>
    <a href="#about" class="btn btn-white btn-lg">Learn More</a>
</div>
<!-- ✏️ END EDITABLE -->
```

5. **Save the file**

---

## WHAT YOU CAN'T BREAK

As long as you:
- ✅ Only change text inside tags
- ✅ Keep HTML tags intact
- ✅ Don't delete the comment markers

**Your site will work perfectly!**

Even if you make a mistake, you can:
- Undo (Ctrl+Z)
- Or restore from GitHub (every change is saved)

---

## FILES AND WHAT THEY CONTAIN

### `index.html` (Homepage)
**Editable:**
- Hero title and description
- Body paragraphs
- Service preview descriptions
- CTA button text
- Leadership bio details

**Locked:**
- "Expert-Led. AI-Enabled. Results-Driven."
- FT Banner text
- Disruption story headlines and content
- Four differentiator titles
- Michael Seitz name and credentials
- Contact information (email, phone, address)
- Brand tagline

### `services.html` (Services Page)
**Editable:**
- All service descriptions (the paragraphs explaining each service)
- Body text

**Locked:**
- 7 service titles (Cost Optimization, Procurement Transformation, etc.)
- Contact information
- Brand tagline

### `about.html` (About Page)
**Editable:**
- Company story paragraphs
- Approach descriptions
- Values descriptions
- Career highlights details
- Expertise list

**Locked:**
- Michael Seitz name
- "Founder & Managing Director"
- "Former KPMG Partner | Ex-GEP North Asia Leader"
- Contact information
- Brand tagline

### `contact.html` (Contact Page)
**Editable:**
- Contact CTA text
- Instructions and guidance text

**Locked:**
- Email: hello@vantixe.com
- Phone: (852) 5597 3898
- Address
- Brand tagline

---

## AFTER YOU EDIT - UPLOADING CHANGES

### If Using GitHub Pages (Recommended):

**Option 1: GitHub Web Interface (Easiest)**

1. Go to your repository on GitHub.com
2. Click the file you edited (e.g., `index.html`)
3. Click the pencil icon (Edit)
4. Delete the old content
5. Copy/paste your edited content
6. Scroll down, add commit message: "Updated hero description"
7. Click "Commit changes"
8. **Changes go live in 2-3 minutes!**

**Option 2: GitHub Desktop**

1. Open GitHub Desktop
2. You'll see your changed files listed
3. Add a commit message (e.g., "Updated services page")
4. Click "Commit to main"
5. Click "Push origin"
6. **Changes go live in 2-3 minutes!**

**Option 3: Git Command Line**

```bash
cd C:\Claude_Apps\Vantixe_Homepage
git add .
git commit -m "Updated content"
git push
```

### If Using FTP (Traditional Hosting):

1. Open FileZilla (or your FTP client)
2. Connect to your hosting server
3. Navigate to `public_html` folder
4. Upload the file you changed
5. **Changes go live immediately!**

---

## TROUBLESHOOTING

### "I Changed Something and the Site Looks Broken"

**Cause:** Probably deleted an HTML tag accidentally

**Fix:**
1. Undo your changes (Ctrl+Z)
2. Or restore from GitHub (download previous version)
3. Try editing again, this time **only changing text inside tags**

### "I Can't Find the Text I Want to Change"

**Solution:**
1. Open `CONTENT_MAP.md`
2. Use Ctrl+F to search for keywords
3. Check which file and line numbers
4. Open that file and search for the text

### "Changes Aren't Showing on the Website"

**If using GitHub Pages:**
- Wait 3-5 minutes for GitHub to rebuild
- Clear your browser cache (Ctrl+Shift+R)
- Try viewing in incognito/private mode

**If using FTP:**
- Make sure you uploaded to the right folder
- Clear browser cache
- Check file permissions (should be 644)

### "I Want to Change Something That's Locked"

**If you have a good reason:**
1. It's your site - you CAN change locked content
2. But understand WHY it's locked (strategic positioning, brand identity, factual info)
3. Make changes carefully
4. Update `CONTENT_MAP.md` to reflect what you changed

**Why things are locked:**
- **Brand identity:** Tagline, company name, positioning statement
- **Factual info:** Your name, credentials, contact details
- **Strategic messaging:** FT banner, disruption stories, differentiators

Only change these if:
- Strategy shifts (rare)
- Contact info changes (new address, phone, etc.)
- Credentials update (new accomplishment)

---

## TIPS FOR EDITING

### Writing Good Copy

**Homepage Hero:**
- Keep it concise (2-3 sentences)
- Focus on benefits, not features
- Answer "Why should I care?"

**Service Descriptions:**
- Start with the outcome/benefit
- Explain your approach
- Include what's included (bullet points work)
- Keep it skimmable

**CTAs (Call-to-Action):**
- Use action verbs ("Schedule," "Get," "Start," "Discover")
- Create urgency without being pushy
- Be specific ("Schedule Consultation" > "Learn More")

### Maintaining Consistency

**Tone:**
- Professional but not stuffy
- Confident but not arrogant
- Specific but not jargony

**Voice:**
- We/our (firm-focused, not "I/my")
- Active voice ("We deliver results" > "Results are delivered")
- Direct and clear

**Style:**
- No em dashes (those long — dashes)
- Short paragraphs (3-4 sentences max)
- Bullet points for lists

---

## BEFORE YOU EDIT - CHECKLIST

- [ ] I checked `CONTENT_MAP.md` to confirm this is editable
- [ ] I have a backup (or know how to restore from Git)
- [ ] I know which file to edit
- [ ] I have a text editor ready (VS Code, Notepad++, etc.)
- [ ] I understand to only change text, not HTML tags

## AFTER YOU EDIT - CHECKLIST

- [ ] I saved the file
- [ ] I tested locally if possible (open HTML in browser)
- [ ] I uploaded to GitHub or via FTP
- [ ] I waited 3-5 minutes for changes to appear
- [ ] I checked the live site to confirm it looks good
- [ ] I cleared my browser cache if changes don't appear

---

## NEED HELP?

**Common Resources:**

1. **CONTENT_MAP.md** - Where is everything?
2. **This file (QUICK_EDIT_GUIDE.md)** - How do I edit?
3. **DEPLOYMENT_GUIDE.md** - How do I upload changes?
4. **GITHUB_DEPLOYMENT.md** - How does GitHub Pages work?

**HTML Basics:**

- `<h1>`, `<h2>`, `<h3>` = Headlines
- `<p>` = Paragraph
- `<a>` = Link
- `<ul>` and `<li>` = Bullet list
- `<strong>` = Bold text

**Rule of thumb:** If you see `< >` brackets, that's HTML. Don't change it. Change the text between the tags.

---

## QUICK REFERENCE - SYMBOLS

- 🔒 **LOCKED** = Don't change (brand identity, factual info, strategy)
- ✏️ **EDITABLE** = Safe to change (descriptions, body text, CTAs)
- ⚠️ **PARTIALLY LOCKED** = Titles locked, descriptions editable

---

**You're ready to edit your website! Start with small changes, test, and build confidence.**

**Remember:** Even if you make a mistake, GitHub has every previous version. You can always undo or restore.
