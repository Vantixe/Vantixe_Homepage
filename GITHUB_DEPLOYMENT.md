# GitHub Pages Deployment Guide
## Deploy www.vantixe.com for FREE (Cancel WordPress!)

---

## Why GitHub Pages?

✅ **FREE** hosting (save $120-360/year vs WordPress)
✅ **Fast & reliable** (GitHub's infrastructure)
✅ **Automatic SSL/HTTPS** (secure, professional)
✅ **Easy updates** (just push changes)
✅ **Custom domain** (www.vantixe.com)
✅ **No database or server needed** (static site)

---

## STEP 1: Create GitHub Account (If you don't have one)

1. Go to https://github.com
2. Click "Sign up"
3. Choose a username (e.g., "mseitz" or "vantixe")
4. Verify your email

---

## STEP 2: Create Repository

1. **Click "New repository"** (green button)

2. **Name it:** `vantixe-website` (or any name you like)

3. **Set to Public** (required for free GitHub Pages)

4. **Don't add README, .gitignore, or license** (we already have files)

5. **Click "Create repository"**

---

## STEP 3: Upload Your Website Files

### Option A: Upload via GitHub Web Interface (Easiest)

1. On the repository page, click **"uploading an existing file"**

2. **Drag and drop ALL files and folders:**
   - index.html
   - about.html
   - services.html
   - contact.html
   - insights.html
   - robots.txt
   - sitemap.xml
   - css/ folder (entire folder)
   - js/ folder (entire folder)
   - images/ folder (entire folder)

3. **Add commit message:** "Initial Vantixe website"

4. **Click "Commit changes"**

### Option B: Upload via Git Command Line (If you're comfortable with Git)

```bash
cd C:\Claude_Apps\Vantixe_Homepage

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial Vantixe website"

# Connect to GitHub (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/vantixe-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## STEP 4: Enable GitHub Pages

1. **Go to repository Settings** (gear icon)

2. **Click "Pages"** in left sidebar

3. **Under "Source":**
   - Branch: `main`
   - Folder: `/ (root)`

4. **Click "Save"**

5. **Wait 2-3 minutes** for GitHub to build your site

6. **You'll see:** "Your site is live at https://USERNAME.github.io/vantixe-website/"

7. **Test it!** Click the link to see your live site

---

## STEP 5: Connect Your Custom Domain (www.vantixe.com)

### A. In GitHub Settings:

1. Still in **Settings > Pages**

2. **Under "Custom domain":**
   - Enter: `www.vantixe.com`
   - Click "Save"

3. **Check "Enforce HTTPS"** (after DNS propagates)

### B. Update Your Domain DNS:

You need to add a CNAME record with your domain registrar (wherever you bought vantixe.com):

**DNS Settings to Add:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | USERNAME.github.io | 3600 |

**Where to do this:**
- Log into your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
- Find "DNS Management" or "DNS Settings"
- Add the CNAME record above
- Save changes

**Example for common registrars:**

**GoDaddy:**
1. Log in → My Products → DNS
2. Add → CNAME
3. Name: www
4. Value: USERNAME.github.io
5. Save

**Namecheap:**
1. Domain List → Manage → Advanced DNS
2. Add New Record → CNAME
3. Host: www
4. Value: USERNAME.github.io
5. Save

**Google Domains:**
1. My Domains → Manage → DNS
2. Custom records → CNAME
3. Name: www
4. Data: USERNAME.github.io
5. Save

### C. Wait for DNS Propagation:

- DNS changes take **15 minutes to 48 hours** to propagate
- Usually works within 1-2 hours
- Check status at: https://www.whatsmydns.net/

### D. Verify:

1. Visit **www.vantixe.com** (should show your site!)
2. Back in GitHub Settings > Pages, **check "Enforce HTTPS"**
3. Done! Your site is live with SSL

---

## STEP 6: Cancel WordPress

Once your GitHub Pages site is live:

1. **Export any data** you need from WordPress (if any)
2. **Cancel your WordPress hosting subscription**
3. **Save $10-30/month** ($120-360/year)

**Important:** Keep your domain registration! You need the domain, just not the WordPress hosting.

---

## UPDATING YOUR WEBSITE (Future Changes)

### Option A: Edit via GitHub Web Interface

1. Go to your repository
2. Click on the file you want to edit (e.g., `index.html`)
3. Click the pencil icon (Edit)
4. Make your changes
5. Scroll down, add commit message
6. Click "Commit changes"
7. **Changes go live in 2-3 minutes automatically!**

### Option B: Edit Locally and Push

1. Edit files in `C:\Claude_Apps\Vantixe_Homepage\`
2. Use GitHub Desktop or Git command line:
   ```bash
   git add .
   git commit -m "Updated services page"
   git push
   ```
3. Changes go live in 2-3 minutes

---

## COMMON ISSUES & SOLUTIONS

### Issue: "404 - Page not found"
**Solution:**
- Wait 5 minutes after pushing
- Check Settings > Pages shows "Your site is published"
- Ensure `index.html` is in root directory (not in a subfolder)

### Issue: "Custom domain not working"
**Solution:**
- DNS takes time (wait up to 24 hours)
- Check CNAME record is correct
- Use www.whatsmydns.net to verify DNS propagation
- Ensure you entered `www.vantixe.com` in GitHub settings

### Issue: "Not Secure" warning
**Solution:**
- Wait for DNS to fully propagate
- Then check "Enforce HTTPS" in GitHub Settings > Pages
- May take a few hours after DNS is working

### Issue: "Email not working (hello@vantixe.com)"
**Solution:**
- Mailto links open email client automatically
- This is normal behavior (not a bug)
- Emails go to recipient's email client (Outlook, Gmail, etc.)
- You need to set up hello@vantixe.com email address with your email provider

---

## SETTING UP hello@vantixe.com EMAIL

Your website uses `hello@vantixe.com` for contact. You need to create this email address:

### Option 1: Google Workspace (Recommended - $6/month)
1. Go to https://workspace.google.com/
2. Sign up with your domain (vantixe.com)
3. Create email: hello@vantixe.com
4. Professional email with Gmail interface

### Option 2: Microsoft 365 Business ($6/month)
1. Go to https://www.microsoft.com/microsoft-365/business
2. Sign up with your domain
3. Create hello@vantixe.com
4. Outlook-based email

### Option 3: Your Domain Registrar (Often Free/Cheap)
- Many registrars (Namecheap, Google Domains) offer email forwarding
- Forward hello@vantixe.com → your personal email
- Often free or $1-2/month

**Recommendation:** Google Workspace. Professional, reliable, good interface.

---

## COST COMPARISON

| Service | WordPress | GitHub Pages |
|---------|-----------|--------------|
| **Hosting** | $10-30/month | **FREE** |
| **SSL Certificate** | $0-50/year | **FREE** (included) |
| **Domain** | $12-15/year | $12-15/year (same) |
| **Email** | Often included | $6/month (Google Workspace) |
| **Updates** | Via WordPress admin | Via GitHub (simple) |
| **Speed** | Slower (PHP/database) | **Very fast** (static) |
| **Security** | Requires updates/plugins | **Very secure** (static) |
| **TOTAL ANNUAL COST** | **$120-360+** | **$72-90** |

**Annual Savings: $50-290** by switching to GitHub Pages!

---

## ALTERNATIVE: Keep WordPress for Just Email

If you want to keep things simple:

1. **Cancel WordPress hosting** (the expensive part)
2. **Keep just email hosting** (often $5-10/month)
3. **Use GitHub Pages for website** (free)
4. **Best of both worlds** (professional email + free hosting)

---

## NEED HELP?

### GitHub Pages Documentation:
https://docs.github.com/en/pages

### DNS Propagation Checker:
https://www.whatsmydns.net/

### GitHub Support:
https://support.github.com/

### Contact Me:
If you encounter issues, I can help troubleshoot!

---

## QUICK START CHECKLIST

- [ ] Create GitHub account
- [ ] Create repository (vantixe-website)
- [ ] Upload all website files
- [ ] Enable GitHub Pages (Settings > Pages)
- [ ] Test at USERNAME.github.io/vantixe-website
- [ ] Add CNAME record to domain DNS (www → USERNAME.github.io)
- [ ] Wait for DNS propagation (1-24 hours)
- [ ] Test www.vantixe.com
- [ ] Enable "Enforce HTTPS" in GitHub settings
- [ ] Set up hello@vantixe.com email (Google Workspace)
- [ ] Cancel WordPress hosting
- [ ] Save $100-300/year!

---

**You're saving money while getting a faster, more secure website. Win-win!**