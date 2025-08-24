# cPanel Deployment Guide for MODZY

## Pre-deployment Checklist

### 1. Environment Setup
- Update `.env.production` with your actual Firebase configuration
- Ensure native ad network account is configured
- Test the production build locally

### 2. Build for Production
```bash
npm run build:prod
```

### 3. cPanel Deployment Steps

#### Step 1: Upload Files
1. Compress the `build` folder contents (not the folder itself)
2. Upload to your cPanel File Manager
3. Extract files to the `public_html` directory

#### Step 2: Verify Files
Ensure these files are in your `public_html` root:
- `index.html`
- `.htaccess`
- `ads.txt`
- `static/` folder
- `manifest.json`
- `favicon.ico`

#### Step 3: Domain Configuration
1. Point your domain to the cPanel hosting
2. Enable SSL certificate in cPanel
3. Test HTTPS redirect functionality

### 4. Post-Deployment Verification

#### Check These URLs:
- `https://modzy.in/` - Main site
- `https://modzy.in/ads.txt` - Native ads verification
- `https://modzy.in/manifest.json` - PWA manifest

#### Test Functionality:
- [ ] Site loads correctly
- [ ] React routing works (try direct URLs)
- [ ] Firebase connection established
- [ ] Native banner ads display
- [ ] Mobile responsiveness
- [ ] HTTPS redirect working

### 5. Performance Optimization

#### cPanel Settings:
1. Enable Gzip compression (if not handled by .htaccess)
2. Set up CloudFlare (optional but recommended)
3. Enable browser caching
4. Configure CDN for static assets

### 6. Monitoring

#### Set up monitoring for:
- Google Analytics
- Native ads performance
- Site uptime
- Core Web Vitals

### 7. Troubleshooting

#### Common Issues:

**404 Errors on Direct URLs:**
- Verify `.htaccess` is uploaded and working
- Check cPanel mod_rewrite is enabled

**Native Ads Not Showing:**
- Verify domain is configured in ad network
- Check ad network account status
- Ensure meta tag is present in HTML

**Firebase Connection Issues:**
- Update `.env.production` with correct config
- Check Firebase project settings
- Verify domain is authorized in Firebase

**Performance Issues:**
- Enable Gzip compression
- Optimize images
- Use CloudFlare CDN

### 8. Security Considerations

- SSL certificate is mandatory
- Security headers are configured in `.htaccess`
- Sensitive files are protected
- Regular backups recommended

### 9. Maintenance

#### Regular Tasks:
- Monitor native ads earnings
- Update dependencies monthly
- Check for broken links
- Monitor site performance
- Update content regularly

---

**Note:** This guide assumes you're using standard cPanel hosting. Some shared hosting providers may have specific requirements or limitations.