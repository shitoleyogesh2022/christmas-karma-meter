# 🚀 Deployment Guide

## 📋 Pre-Deployment Setup

### 1. **Secure Credentials**
```bash
# Copy template to actual config
cp payment-config-template.js payment-config.js

# Add your actual Razorpay credentials to payment-config.js
# Never commit payment-config.js to GitHub!
```

### 2. **GitHub Repository Setup**
```bash
# Initialize Git
git init

# Add files (payment-config.js is ignored)
git add .

# Commit
git commit -m "Initial commit - Christmas Karma Meter"

# Add remote (replace with your repo)
git remote add origin https://github.com/shitoleyogesh2022/christmas-karma-meter.git

# Push to GitHub
git push -u origin main
```

### 3. **Netlify Deployment**
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub → Select your repository
4. **Build settings**: Leave empty (static site)
5. **Environment Variables** (Important!):
   - Add `RAZORPAY_KEY_ID` = your actual key
   - Add `RAZORPAY_KEY_SECRET` = your actual secret

### 4. **Environment Variables in Netlify**
- Site Settings → Environment Variables
- Add your Razorpay credentials securely
- These won't be exposed in public code

## 🔒 Security Checklist
- ✅ `.gitignore` prevents credential exposure
- ✅ Template file for public reference
- ✅ Actual credentials in Netlify environment
- ✅ No sensitive data in GitHub

## 🌐 Your Repository
`https://github.com/shitoleyogesh2022/christmas-karma-meter`