# EmailJS Setup Guide

Follow these steps to configure email sending for your contact form:

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions:
   - For Gmail: You'll need to enable "Less secure app access" or use an App Password
   - For Outlook: Use your regular credentials
5. After setup, copy your **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
Hello,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. Set the **To Email** field to: `syamsundar662@gmail.com`
5. Set the **From Name** field to: `{{from_name}}`
6. Set the **Reply To** field to: `{{from_email}}`
7. Click **Save**
8. Copy your **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxx`)
3. Copy it

## Step 5: Create .env File

1. In your project root directory, create a file named `.env`
2. Add the following content (replace with your actual values):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Example:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
```

## Step 6: Restart Development Server

After creating the `.env` file:
1. Stop your current dev server (Ctrl+C)
2. Start it again: `npm run dev`

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox at `syamsundar662@gmail.com`
4. You should receive the message!

## Troubleshooting

- **"Email service not configured"**: Make sure your `.env` file exists and has all three variables set
- **"Failed to send message"**: Check that your EmailJS service is properly connected and your template is saved
- **No email received**: Check spam folder and verify the "To Email" in your template is correct

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Perfect for portfolio websites!

Need help? Visit https://www.emailjs.com/docs/
