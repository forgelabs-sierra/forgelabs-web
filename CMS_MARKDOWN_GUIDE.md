# Forge Labs CMS — Markdown & Shortcode Guide

This guide covers everything you can use when editing content via the `/admin` CMS editor.

Content is written in a mix of standard **Markdown** and custom **shortcodes**. Shortcodes are special tags that render rich UI sections — hero banners, feature grids, team cards, etc. Everything else is plain Markdown.

---

## Table of Contents

1. [Markdown](#markdown)
2. [Shortcode Basics](#shortcode-basics)
3. [Hero](#hero)
4. [Features](#features)
5. [Services](#services)
6. [CTA Banner](#cta-banner)
7. [Team](#team)
8. [Testimonials](#testimonials)
9. [Carousel](#carousel)
10. [Contact](#contact)
11. [Images](#images)
12. [Tips & Gotchas](#tips--gotchas)

---

## Markdown

Standard Markdown works anywhere between shortcodes.

```markdown
# Heading 1
## Heading 2
### Heading 3

Regular paragraph text here.

**Bold text** and _italic text_.

- Bullet list item
- Another item

1. Numbered list
2. Second item

[Link text](https://example.com)

> Blockquote text
```

Use Markdown for text-only sections like blog-style content, descriptions, or anything that doesn't need a visual component.

---

## Shortcode Basics

Shortcodes come in two forms:

**Self-closing** (no body content):
```
{{shortcode_name attr1="value" attr2="value"}}
```

**Block** (with a body):
```
{{shortcode_name attr1="value"}}
body content here (YAML format)
{{/shortcode_name}}
```

- Attribute values must be wrapped in **double quotes**
- Block bodies use **YAML format** — indentation matters
- Shortcodes and Markdown can be mixed freely — just leave a blank line between them
- The toolbar in the editor inserts shortcode templates for you

---

## Hero

The full-width hero section at the top of the page. Self-closing shortcode.

### Syntax

```
{{hero title="Your Title Here" subtitle="Optional subtitle text." cta="Button Text|#anchor" cta2="Second Button|#anchor" image="https://..." overlay="dark"}}
```

### Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `title` | ✅ | Main heading — large, bold, prominent |
| `subtitle` | No | Smaller text below the title |
| `cta` | No | Primary button — format: `"Button Label\|#link"` |
| `cta2` | No | Secondary button — format: `"Button Label\|#link"` |
| `image` | No | Background image URL (Unsplash, or `/images/filename.jpg`) |
| `overlay` | No | `dark`, `light`, or `gradient` — controls image overlay |

### Example

```
{{hero title="Practical AI Solutions for Modern Businesses" subtitle="We help businesses adopt AI and automation to remain competitive." cta="Get Started|#contact" cta2="Our Services|#services" image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format" overlay="dark"}}
```

### Notes

- The hero is always full-height (92vh) with a dark background
- The image sits behind a dark gradient overlay — works best with wide landscape photos
- CTA buttons are separated by a pipe `|` — left side is the label, right side is the link
- Link can be an anchor (`#contact`), internal path (`/about`), or full URL

---

## Features

A 3-column grid of feature cards, typically used to highlight key strengths or capabilities.

### Syntax

```
{{features}}
- title: Feature Title
  description: Short description of this feature.
  icon: icon-name
{{/features}}
```

### Item Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Card heading |
| `description` | ✅ | 1–2 sentence description |
| `icon` | No | Lucide icon name (e.g. `brain`, `users`, `shield-check`) |
| `image` | No | Image URL to show instead of icon |

### Example

```
{{features}}
- title: Practical AI Strategies
  description: With deep research and real-world experience, we implement AI solutions that deliver measurable business value.
  icon: brain
- title: Human-Centered Automation
  description: We build intelligent systems that amplify human capabilities rather than replace them.
  icon: users
- title: Proven Implementation
  description: We help adopt AI safely and effectively, ensuring teams feel confident and empowered.
  icon: shield-check
{{/features}}
```

### Notes

- Any number of items supported, but 3 columns looks best with 3 or 6 items
- Icon names come from [Lucide Icons](https://lucide.dev/icons/) — use the kebab-case name
- If both `icon` and `image` are provided, `image` takes precedence

---

## Services

A detailed grid of service offerings. Similar structure to Features but styled for longer descriptions.

### Syntax

```
{{services}}
- title: Service Name
  description: Detailed description of this service.
  icon: icon-name
{{/services}}
```

### Item Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Service name |
| `description` | ✅ | Description — can be 2–3 sentences |
| `icon` | No | Lucide icon name |

### Example

```
{{services}}
- title: AI Strategy & Roadmap
  description: Map out where AI delivers the most value in your organisation. We assess readiness, identify high-impact opportunities, and build a practical roadmap from pilot to scale.
  icon: map
- title: Agentic AI Development
  description: Build autonomous AI agents that handle multi-step workflows end-to-end. From GCP ADK to custom agent architectures, we design, build, and deploy agents that work alongside your team.
  icon: bot
- title: Legacy Codebase Modernisation
  description: Unlock codebases that have outgrown their documentation. We use AI to reverse-engineer understanding, generate documentation, and chart a modernisation path.
  icon: file-search
{{/services}}
```

### Notes

- No limit on number of items — displays in a responsive grid
- Icon names from [Lucide Icons](https://lucide.dev/icons/)
- Designed for longer text than Features — descriptions of 2–3 sentences work well

---

## CTA Banner

A full-width call-to-action section — dark background, centred heading, optional button.

### Syntax

```
{{cta title="Your CTA Heading" subtitle="Optional supporting text."}}
button_text: Button Label
button_link: "#contact"
{{/cta}}
```

### Attributes & Body Fields

| Field | Where | Required | Description |
|-------|-------|----------|-------------|
| `title` | attribute | ✅ | Main heading |
| `subtitle` | attribute | No | Supporting text below heading |
| `button_text` | body (YAML) | No | Button label — omit to hide button |
| `button_link` | body (YAML) | No | Button link — anchor, path, or URL |

### Example

```
{{cta title="Ready to Transform Your Business?" subtitle="Let's discuss how AI and automation can help your organisation stay competitive."}}
button_text: Schedule a Consultation
button_link: "#contact"
{{/cta}}
```

### Notes

- Always renders with a dark gradient background — works as a strong visual break between sections
- If `button_text` is omitted, no button is shown
- `button_link` defaults to `#contact` if omitted

---

## Team

A card grid of team members with circular photos, roles, bios, and LinkedIn links.

### Syntax

```
{{team}}
- name: Full Name
  role: Job Title
  bio: Short bio sentence.
  image: /images/photo.jpg
  linkedin: https://www.linkedin.com/in/username/
{{/team}}
```

### Item Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | Full name — displayed as card heading |
| `role` | ✅ | Job title or role |
| `bio` | No | 1–2 sentence bio |
| `image` | No | Image path (`/images/filename.jpg`) or URL — circular crop |
| `linkedin` | No | LinkedIn profile URL — shows LinkedIn icon link |

### Example

```
{{team}}
- name: Cameron McEwing
  role: Co-Director & AI Solutions Architect
  bio: Helps businesses navigate AI adoption and automation strategies that deliver measurable results.
  image: /images/cameron_avatar.png
  linkedin: https://www.linkedin.com/in/coding-the-future/
- name: Matt McFedries
  role: Co-Director & Automation Specialist
  bio: Deep expertise in business process automation and AI integration.
  image: /images/matt_photo.jpg
  linkedin: https://www.linkedin.com/in/matmcf/
{{/team}}
```

### Notes

- If `image` is omitted, a placeholder avatar is auto-generated from the person's initials
- Cards are 256px wide and flex-wrap — looks best with 2–4 members
- `linkedin` can also be a GitHub URL — it renders a LinkedIn icon but links wherever you point it

---

## Testimonials

A grid of client quote cards with author attribution.

### Syntax

```
{{testimonials}}
- quote: The quote text goes here.
  author: Full Name
  role: Job Title, Company
  avatar: /images/headshot.jpg
{{/testimonials}}
```

### Item Fields

| Field | Required | Description |
|-------|----------|-------------|
| `quote` | ✅ | The testimonial text |
| `author` | ✅ | Person's name |
| `role` | No | Job title and/or company |
| `avatar` | No | Headshot image path or URL — circular |

### Example

```
{{testimonials}}
- quote: Forge Labs transformed how our team works. The AI tooling they implemented cut our development time in half within the first month.
  author: Jane Smith
  role: CTO, Acme Corp
  avatar: /images/jane_smith.jpg
- quote: Practical, no-nonsense AI advice that actually translated into business results. Highly recommended.
  author: John Doe
  role: CEO, StartupCo
- quote: The agentic workflow they built for us handles tasks that used to take three people. It just works.
  author: Sarah Johnson
  role: Head of Ops, TechFirm Ltd
{{/testimonials}}
```

### Notes

- If `avatar` is omitted, initials are shown in the avatar fallback
- Displays in a 3-column grid on large screens, 2-column on medium, 1-column on mobile
- Keep quotes concise — 1–3 sentences work best

---

## Carousel

A full-width image slider with optional title/subtitle overlaid on each slide. Uses Embla Carousel with loop and prev/next arrows.

### Syntax

```
{{carousel}}
- image: /images/slide1.jpg
  title: Optional Slide Title
  subtitle: Optional supporting text
{{/carousel}}
```

### Item Fields

| Field | Required | Description |
|-------|----------|-------------|
| `image` | ✅ | Image path (`/images/filename.jpg`) or full URL |
| `title` | No | Heading overlaid on the image |
| `subtitle` | No | Supporting text below the title |

### Example

```
{{carousel}}
- image: https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80
  title: Building the Future
  subtitle: AI solutions that move at the speed of your business
- image: /images/office.jpg
  title: Our Team
  subtitle: Based in Christchurch, working globally
- image: https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80
{{/carousel}}
```

### Notes

- Carousel height is fixed at 480px — use wide landscape images for best results
- Title/subtitle are overlaid on a dark gradient at the bottom of each slide
- Dot navigation and arrows are automatic
- Loops continuously — no end state

---

## Contact

A contact form section with a Google Apps Script backend, plus optional address and email display.

### Syntax

```
{{contact}}
heading: Get in Touch
address: 123 Street Name, City, Postcode
email: hello@example.com
{{/contact}}
```

### Body Fields (YAML)

| Field | Required | Description |
|-------|----------|-------------|
| `heading` | No | Section heading — defaults to "Get in Touch" |
| `address` | No | Physical address — shown with a map pin icon |
| `email` | No | Email address — shown as a mailto link |

### Example

```
{{contact}}
heading: Get in Touch
address: The Saltworks, 4 Ash Street, Christchurch Central City, Christchurch 8011
email: cameron@forgelabs.nz
{{/contact}}
```

### Notes

- The form always renders — `heading`, `address`, and `email` are all optional
- Form submissions go to the configured Google Apps Script endpoint — no setup needed
- `address` supports multi-line values using YAML literal block style if needed
- The section anchors to `#contact` — CTA buttons can link directly to it

---

## Images

Images stored in the CMS are available at `/images/filename.jpg`.

### Uploading Images

Use the **🖼️ Images** button in the editor toolbar to open the Image Manager:

- **Library tab** — shows all uploaded images as thumbnails. Click any image to insert it at the cursor.
- **Upload tab** — drag-and-drop or select a file to upload. Commits directly to the GitHub repo.
- **Delete** — hover over a thumbnail for the delete option.

### Using Images in Shortcodes

```
# In a Hero
{{hero title="Title" image="/images/hero-photo.jpg"}}

# In a Team member
- name: Cameron McEwing
  image: /images/cameron_avatar.png

# In a Carousel slide
- image: /images/slide1.jpg
  title: Our Work
```

### Using Images in Markdown

```markdown
![Alt text](/images/my-image.jpg)
```

### External Images

You can use full Unsplash URLs or any public image URL directly:

```
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format"
```

### Recommended Sizes

| Use case | Recommended size |
|----------|-----------------|
| Hero background | 1920×1080px or wider |
| Carousel slides | 1920×1080px |
| Team photos | 400×400px (square) |
| Testimonial avatars | 200×200px (square) |
| CTA background | 1920×1080px |

---

## Tips & Gotchas

**YAML indentation matters**
Block shortcodes use YAML for their body. Each list item starts with `- ` and sub-fields are indented with 2 spaces. Getting this wrong will cause the section to not render.

```yaml
# ✅ Correct
- title: My Feature
  description: Description here.
  icon: brain

# ❌ Wrong — missing space after dash, or inconsistent indentation
-title: My Feature
   description: Description here.
```

**Quotes in attributes**
Attribute values must use double quotes. If your text contains a double quote, avoid it or use a different phrasing — single quotes inside double quotes are fine.

```
# ✅ Fine
{{hero title="Building AI Solutions"}}

# ✅ Also fine — single quotes inside
{{hero title="It's the future of work"}}

# ❌ Breaks the parser
{{hero title="The "best" solution"}}
```

**The pipe separator for CTA buttons**
Hero CTA buttons use `|` to separate the label from the link:
```
cta="Get Started|#contact"
```
No spaces around the pipe — just `Label|link`.

**Autosave**
The editor autosaves your draft to the browser every 10 seconds. If you accidentally close the tab, you'll be prompted to restore the draft on next open.

**Save & Deploy**
Clicking **Save & Deploy** (or pressing Ctrl+S / Cmd+S) commits directly to GitHub. The live site updates on the next page refresh — no manual deploy needed.

**Order of sections**
Sections render in the order they appear in the file. Rearrange by cutting and pasting shortcode blocks.

**Blank lines**
Leave a blank line between shortcodes and Markdown blocks. The parser handles them without blank lines, but it makes the source much easier to read.
