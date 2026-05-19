# IUMS Result Notifier

Automates IUMS result checks and sends email notifications when new results are published.

## Features

- Scheduled result checks every 10 minutes
- Gmail notifications via Nodemailer
- Playwright-based login and scraping
- Debug tools for selector discovery
- PM2 process management for 24/7 uptime

## Requirements

- Node.js 20+
- A Gmail account with an app password

## Render Deployment (Ubuntu)

1. Push this repo to GitHub.

2. In Render, create a new **Background Worker**.

3. Connect your GitHub repo and set:

  Build Command:
  npm install && npx playwright install --with-deps

  Start Command:
  npm run start

4. Add environment variables in the Render dashboard:

  EMAIL_USER=
  EMAIL_PASS=
  MAIL_FROM=
  IUMS_URL=
  IUMS_RESULTS_URL=
  IUMS_USER=
  IUMS_PASS=
  IUMS_USERNAME_SELECTOR=
  IUMS_PASSWORD_SELECTOR=
  IUMS_LOGIN_BUTTON_SELECTOR=
  IUMS_SEMESTER_SELECTOR=
  IUMS_SHOW_RESULT_SELECTOR=
  IUMS_SUBJECT_SELECTOR=

5. Deploy the service. It will run 24/7 as long as the Render service is active.

## GitHub Actions (Free Scheduler)

This project includes a GitHub Actions workflow that runs checker.js every 10 minutes.

### Add GitHub Secrets

1. Go to your repo on GitHub.
2. Open Settings -> Secrets and variables -> Actions.
3. Click New repository secret and add the following keys:

  EMAIL_USER
  EMAIL_PASS
  IUMS_URL
  IUMS_RESULTS_URL
  IUMS_USER
  IUMS_PASS
  IUMS_USERNAME_SELECTOR
  IUMS_PASSWORD_SELECTOR
  IUMS_LOGIN_BUTTON_SELECTOR
  IUMS_SEMESTER_SELECTOR
  IUMS_SHOW_RESULT_SELECTOR
  IUMS_SUBJECT_SELECTOR

### Manual Trigger

1. Go to the Actions tab in GitHub.
2. Select IUMS Result Checker.
3. Click Run workflow.

### View Logs

1. Go to Actions.
2. Click the latest run.
3. Open the Run checker step to view logs.

### Confirm Scheduler Works

- The workflow runs every 10 minutes via cron.
- GitHub schedules are best-effort and may run a few minutes late.

### Persistence Notes

- results.json is cached between runs using GitHub Actions cache.
- This prevents duplicate notifications across runs.

## Configure Recipients

Update `MAILING_LIST` in sendMail.js with a comma-separated list of email addresses.

## Run Locally

- Start the checker:

  npm run start

- Debug selectors:

  npm run debug

## Local PM2 Setup (Optional)

If you want to run this on your own server instead of Render:

sudo npm install -g pm2

pm2 start ecosystem.config.js

pm2 save

pm2 startup

The command returned by pm2 startup must also be executed.

## PM2 Commands (Local)

pm2 list
pm2 logs iums-bot
pm2 restart iums-bot
pm2 stop iums-bot
pm2 delete iums-bot

## NPM Scripts

- npm run start - start checker
- npm run debug - run debugSelectors
- npm run pm2:start - start PM2 process
- npm run pm2:stop - stop PM2 process
- npm run pm2:restart - restart PM2 process
- npm run pm2:logs - tail PM2 logs

## Logs & Screenshots

- Logs: ./logs/activity.log, ./logs/error.log
- Debug HTML: ./logs/debug.html
- Screenshots: ./debug-screenshots/

## Important Notes

- Render service must remain active 24/7.
- Playwright runs headless on the server.
- results.json stores previously detected courses.
- Emails are only sent for newly detected courses.
# IUMS-Result-Notifier
