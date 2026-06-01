# Kudo Advisory , Google Analytics (GA4) cheat sheet

Your GA4 ID: **G-Y1CTGWRYFR**
Log in at **analytics.google.com** with the Google account you set it up with,
then pick the Kudo Advisory property.

---

## What GA4 tells you (and what it doesn't)

| Question | Where to look |
|----------|----------------|
| How many people visited? | Reports > Engagement > Pages and screens |
| Where did they come from? (LinkedIn, Google, direct) | Reports > Acquisition > Traffic acquisition |
| How many became leads? | Reports > Engagement > Events > `generate_lead` |
| Which lead source converted best? | Events > `generate_lead` > break down by `lead_source` |
| Who is happening right now? | Reports > Realtime |

GA4 does NOT store names/emails. That is MailerLite's job. GA4 tells you the
volume and the source; MailerLite tells you who to follow up with.

---

## Your three lead events

Every time someone converts, the site sends GA4 a `generate_lead` event tagged
with where it came from:

- **contact_form** , someone submitted the contact form on the homepage
- **assessment** , someone completed the AI Readiness Assessment (also sends the score % and tier)
- **guide_download** , someone downloaded the free guide

So in GA4 you can answer: "This week the assessment drove 6 leads, the contact
form 2, and most came from LinkedIn."

---

## ONE-TIME SETUP (2 minutes, do this once)

Mark your leads as conversions so they show up in conversion reports:

1. Click **Admin** (gear icon, bottom left)
2. Under "Property", click **Events**
3. Wait for **`generate_lead`** to appear in the list
   (it only appears AFTER the first real submission since go-live)
4. Toggle **"Mark as key event"** ON

Done. From then on GA4 treats every lead as a key event.

---

## How to confirm tracking works (1 minute)

1. Open GA4 > Reports > **Realtime**
2. On a different tab, go to the live site and accept the cookie banner
3. Submit the contact form (or complete the assessment)
4. Within about 30 seconds, the `generate_lead` event appears in Realtime

Note: if you DECLINE the cookie banner, GA4 will not track you. That is correct
and intended (privacy compliance). To test, accept the banner.

---

## A simple weekly routine

Once a week, 5 minutes:
1. Reports > Acquisition > Traffic acquisition , did LinkedIn send a spike? (matches your posting)
2. Events > `generate_lead` , how many leads, and from which source?
3. Realtime after you publish a LinkedIn post , see the live traffic land

That is enough to learn which posts and channels actually produce leads, so you
double down on what works.
