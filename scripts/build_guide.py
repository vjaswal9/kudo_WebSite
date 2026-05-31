#!/usr/bin/env python3
"""Build the Kudo Advisory lead-magnet PDF: 'The 5 Reasons Enterprise AI Pilots Fail'."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    Frame, PageTemplate, NextPageTemplate, FrameBreak,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER

# ── Brand palette ──
NAVY      = colors.HexColor("#1a2332")
NAVY_DK   = colors.HexColor("#131a26")
GOLD      = colors.HexColor("#d4a853")
LIGHT     = colors.HexColor("#e2e8f0")
MUTED     = colors.HexColor("#94a3b8")
WHITE     = colors.HexColor("#ffffff")
CARD      = colors.HexColor("#222d3d")

OUT = "/Users/vijayjaswal/AI/kudo_WebSite/public/guides/5-reasons-enterprise-ai-pilots-fail.pdf"

import os
os.makedirs(os.path.dirname(OUT), exist_ok=True)

PAGE_W, PAGE_H = A4

# ── Styles ──
styles = getSampleStyleSheet()

def S(name, **kw):
    return ParagraphStyle(name, parent=styles["Normal"], **kw)

st_kicker = S("kicker", fontName="Helvetica-Bold", fontSize=10, textColor=GOLD, leading=14, spaceAfter=6, tracking=2)
st_h1     = S("h1", fontName="Helvetica-Bold", fontSize=30, textColor=WHITE, leading=36, spaceAfter=14)
st_h2     = S("h2", fontName="Helvetica-Bold", fontSize=17, textColor=NAVY, leading=22, spaceBefore=18, spaceAfter=8)
st_num    = S("num", fontName="Helvetica-Bold", fontSize=40, textColor=GOLD, leading=42)
st_body   = S("body", fontName="Helvetica", fontSize=10.5, textColor=colors.HexColor("#33404f"), leading=16, spaceAfter=10)
st_body_l = S("bodyl", fontName="Helvetica", fontSize=11, textColor=LIGHT, leading=17, spaceAfter=10)
st_lead   = S("lead", fontName="Helvetica", fontSize=13, textColor=LIGHT, leading=20, spaceAfter=12)
st_quote  = S("quote", fontName="Helvetica-Oblique", fontSize=12.5, textColor=NAVY, leading=19, leftIndent=14, spaceBefore=6, spaceAfter=6)
st_small  = S("small", fontName="Helvetica", fontSize=8.5, textColor=MUTED, leading=12)
st_foot   = S("foot", fontName="Helvetica", fontSize=8, textColor=MUTED, leading=11, alignment=TA_CENTER)
st_cta_h  = S("ctah", fontName="Helvetica-Bold", fontSize=20, textColor=WHITE, leading=26, spaceAfter=10)
st_cta_b  = S("ctab", fontName="Helvetica", fontSize=11, textColor=LIGHT, leading=17, spaceAfter=8)
st_fix    = S("fix", fontName="Helvetica-Bold", fontSize=10.5, textColor=GOLD, leading=15, spaceBefore=4, spaceAfter=4)


def cover_bg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # gold accent bar
    canvas.setFillColor(GOLD)
    canvas.rect(0, PAGE_H - 8, PAGE_W, 8, fill=1, stroke=0)
    # footer
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(20*mm, 15*mm, "Kudo Advisory  ·  AI Advisory Dubai, UAE & Middle East")
    canvas.drawRightString(PAGE_W - 20*mm, 15*mm, "kudoadvisory.com")
    canvas.restoreState()


def content_bg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#f7f8fa"))
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(GOLD)
    canvas.rect(0, PAGE_H - 5, PAGE_W, 5, fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8)
    canvas.drawString(20*mm, 12*mm, "The 5 Reasons Enterprise AI Pilots Fail")
    canvas.drawRightString(PAGE_W - 20*mm, 12*mm, "kudoadvisory.com")
    canvas.restoreState()


def cta_bg(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(GOLD)
    canvas.rect(0, PAGE_H - 8, PAGE_W, 8, fill=1, stroke=0)
    canvas.restoreState()


doc = SimpleDocTemplate(OUT, pagesize=A4,
                        leftMargin=20*mm, rightMargin=20*mm,
                        topMargin=24*mm, bottomMargin=22*mm,
                        title="The 5 Reasons Enterprise AI Pilots Fail",
                        author="Vijay Jaswal, Kudo Advisory")

frame = Frame(doc.leftMargin, doc.bottomMargin,
              PAGE_W - doc.leftMargin - doc.rightMargin,
              PAGE_H - doc.topMargin - doc.bottomMargin, id="main")

doc.addPageTemplates([
    PageTemplate(id="cover", frames=[frame], onPage=cover_bg),
    PageTemplate(id="content", frames=[frame], onPage=content_bg),
    PageTemplate(id="cta", frames=[frame], onPage=cta_bg),
])

story = []

# ── COVER ──
story.append(Spacer(1, 70))
story.append(Paragraph("KUDO ADVISORY  ·  ENTERPRISE AI", st_kicker))
story.append(Spacer(1, 10))
story.append(Paragraph("The 5 Reasons Enterprise AI Pilots Fail", st_h1))
story.append(Spacer(1, 6))
story.append(Paragraph("And what the organisations that succeed do differently.", st_lead))
story.append(Spacer(1, 30))
story.append(Paragraph(
    "Up to 80% of enterprise AI initiatives never scale beyond the pilot stage. "
    "The cause is rarely the technology. This short guide sets out the five root "
    "causes we see most often across the UAE and Middle East, and the practical "
    "moves that separate stalled experiments from AI that delivers.", st_body_l))
story.append(Spacer(1, 40))

byline = Table([[
    Paragraph("<b>Vijay Jaswal</b><br/><font color='#94a3b8' size=9>Founder &amp; CEO, Kudo Advisory</font><br/>"
              "<font color='#94a3b8' size=9>Ex-CTO IFS (APJMEA) · Ex-CTO Software AG (ME &amp; Turkey)</font>",
              S("by", fontName="Helvetica", fontSize=11, textColor=LIGHT, leading=16))
]], colWidths=[150*mm])
byline.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),0),("TOPPADDING",(0,0),(-1,-1),0)]))
story.append(byline)

story.append(NextPageTemplate("content"))
story.append(PageBreak())

# ── INTRO ──
story.append(Paragraph("The pattern is always the same", st_h2))
story.append(Paragraph(
    "I've spent the better part of three decades sitting across the table from CIOs, CDOs and boards "
    "making significant bets on technology. In recent years, that technology is almost always AI. And I "
    "hear a version of the same story again and again.", st_body))
story.append(Paragraph(
    "The pilot was impressive. The vendor demo was compelling. The proof of concept showed real promise. "
    "And then nothing. The initiative stalled, the budget was quietly reallocated, and the organisation "
    "moved on, carrying the unspoken sense that perhaps AI just wasn't ready for them yet.", st_body))
story.append(Paragraph(
    "This isn't a Middle East problem. It's a global one. But it's felt acutely here, where ambition is "
    "high, investment is significant, and the pressure on leadership to show results is intense. When an "
    "AI pilot fails, it is almost never because the model wasn't good enough. What kills AI initiatives is "
    "almost always organisational. Here are the five root causes, and what to do about each.", st_body))

# ── The 5 reasons ──
reasons = [
    ("01", "The pilot was never connected to a business outcome",
     "Teams get excited about what AI can do, summarise documents, predict churn, generate code, and build "
     "a pilot around the capability rather than the outcome. The result is a technically successful pilot "
     "that leadership doesn't know how to value. \"It works\" is not a business case. \"It reduces "
     "time-to-decision in credit approval by 40%\" is.",
     "Start every initiative with one question: what measurable business result are we trying to move? "
     "If you can't answer that in a single sentence, you are not ready to build a pilot."),
    ("02", "No single accountable owner",
     "AI initiatives involve IT, data science, the business unit, legal, compliance, procurement, and "
     "sometimes the board. Everyone has a stake. Very few have accountability. When something goes wrong, "
     "decisions slow to a crawl, escalations bounce between functions, and momentum dies.",
     "Name one person who owns the outcome, has the authority to make decisions, and is measured on "
     "delivery. They don't need to be the most senior person in the room, but they must be empowered "
     "and accountable."),
    ("03", "Governance added at the end, not built from the start",
     "The team builds something promising, and then legal or the CISO's office asks what controls are in "
     "place. The answer is usually \"not many\", and the initiative stalls while the organisation works "
     "out what responsible deployment looks like. In the UAE, with TDRA, ADGM and DIFC expectations "
     "tightening, this is increasingly costly.",
     "Design governance, data provenance, explainability, bias assessment, human oversight, into the "
     "initiative from day one. Governance-first organisations move faster, not slower, because they've "
     "removed the late-stage blockers."),
    ("04", "The operating model wasn't ready",
     "A successful pilot still fails to scale if the organisation isn't structured to absorb it. AI changes "
     "how decisions get made, where human judgment is required, and what skills teams need. If the operating "
     "model hasn't been redesigned to work with AI rather than alongside it, the initiative delivers a "
     "fraction of its potential.",
     "Redesign the workflows, roles and decision structures around the AI system before you scale. Embed "
     "it into how people actually work, don't just deploy it next to them."),
    ("05", "Leadership bought the vision but not the execution",
     "Senior leaders are often genuinely excited about AI. They attend conferences, follow the discourse, "
     "approve the budget. What they're sometimes less equipped for is the hard, unglamorous work of driving "
     "execution: difficult prioritisation calls, clearing organisational blockers, and holding people "
     "accountable to timelines.",
     "Invest in leadership enablement so your executives understand AI deeply enough to drive it, not just "
     "sponsor it. Put AI outcomes into executive performance frameworks, accountability changes behaviour."),
]

for num, title, problem, fix in reasons:
    row = Table([[
        Paragraph(num, st_num),
        Paragraph(title, S("rt", fontName="Helvetica-Bold", fontSize=15, textColor=NAVY, leading=19)),
    ]], colWidths=[20*mm, 130*mm])
    row.setStyle(TableStyle([
        ("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("LEFTPADDING",(0,0),(-1,-1),0),
        ("TOPPADDING",(0,0),(-1,-1),14),
        ("BOTTOMPADDING",(0,0),(-1,-1),4),
        ("LINEABOVE",(0,0),(-1,0),0.6, colors.HexColor("#d8dde4")),
    ]))
    story.append(row)
    story.append(Paragraph(problem, st_body))
    story.append(Paragraph("&rarr;&nbsp; <b>What to do:</b>&nbsp; " + fix, st_fix))
    story.append(Spacer(1, 4))

# ── What success looks like ──
story.append(PageBreak())
story.append(Paragraph("What the organisations that succeed do differently", st_h2))
checklist = [
    ("Start with a portfolio, not a single bet", "Run three to five prioritised use cases with different risk profiles and time horizons."),
    ("Instrument for value from the start", "Define the business metrics, revenue, cost, time, quality, before a line of code is written."),
    ("Treat governance as an enabler", "Explainable, auditable, compliant AI deploys faster and with more board confidence."),
    ("Embed, rather than deploy", "Redesign workflows and train the people who work alongside the AI, not just those who built it."),
    ("Hold leadership accountable for outcomes", "When AI outcomes appear in executive performance frameworks, the pace of delivery accelerates."),
]
data = [[Paragraph(f"<font color='#d4a853'><b>&#10003;</b></font>", st_body),
         Paragraph(f"<b>{h}</b><br/><font size=9 color='#5a6573'>{d}</font>", st_body)] for h, d in checklist]
tbl = Table(data, colWidths=[10*mm, 140*mm])
tbl.setStyle(TableStyle([
    ("VALIGN",(0,0),(-1,-1),"TOP"),
    ("LEFTPADDING",(0,0),(-1,-1),0),
    ("TOPPADDING",(0,0),(-1,-1),7),
    ("BOTTOMPADDING",(0,0),(-1,-1),7),
]))
story.append(Spacer(1, 4))
story.append(tbl)

story.append(Spacer(1, 16))
qbar = Table([[Paragraph(
    "“AI doesn't fail because it isn't good enough. It fails because organisations "
    "aren't yet built to make it succeed. That is a solvable problem.”", st_quote)]],
    colWidths=[150*mm])
qbar.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,-1), colors.HexColor("#f0ede4")),
    ("LINEBEFORE",(0,0),(0,-1), 3, GOLD),
    ("LEFTPADDING",(0,0),(-1,-1),16),
    ("RIGHTPADDING",(0,0),(-1,-1),16),
    ("TOPPADDING",(0,0),(-1,-1),14),
    ("BOTTOMPADDING",(0,0),(-1,-1),14),
]))
story.append(qbar)

# ── CTA PAGE ──
story.append(NextPageTemplate("cta"))
story.append(PageBreak())
story.append(Spacer(1, 90))
story.append(Paragraph("KUDO ADVISORY", st_kicker))
story.append(Spacer(1, 8))
story.append(Paragraph("Where is your AI programme stalling?", st_cta_h))
story.append(Paragraph(
    "Kudo Advisory is an independent AI advisory firm based in Dubai. We help enterprise leaders across "
    "the UAE and Middle East fix the foundations, strategy, governance, operating model and delivery, so "
    "AI actually delivers measurable business outcomes.", st_cta_b))
story.append(Spacer(1, 14))
story.append(Paragraph(
    "Take our free AI Readiness Assessment, 10 questions, instant score:", st_cta_b))
story.append(Paragraph("<b><font color='#d4a853'>kudoadvisory.com/ai-readiness-assessment</font></b>",
                       S("link", fontName="Helvetica-Bold", fontSize=12, textColor=GOLD, leading=18)))
story.append(Spacer(1, 18))
story.append(Paragraph(
    "Or book a free 30-minute discovery call with Vijay Jaswal:", st_cta_b))
story.append(Paragraph("<b><font color='#ffffff'>kudoadvisory.com</font></b>  &nbsp;·&nbsp;  "
                       "<font color='#94a3b8'>info@kudoadvisory.com</font>",
                       S("link2", fontName="Helvetica", fontSize=11, textColor=WHITE, leading=18)))
story.append(Spacer(1, 50))
story.append(Paragraph(
    "Vijay Jaswal is the Founder &amp; CEO of Kudo Advisory, with 25+ years advising boards and C-suite "
    "leaders across Europe, Asia-Pacific and the Middle East. He has been named one of the Top 50 "
    "Technology Leaders in the Middle East.", st_small))

doc.build(story)
print("Built:", OUT)
