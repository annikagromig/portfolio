// ─── Jozu Tradewinds Page Generator ───────────────────────────────────────────
// Figma Plugin: generates the full Tradewinds landing page on the canvas.
// Run via: Plugins → Development → Import from manifest → select manifest.json

(async () => {
  // ─── Colour helpers ───────────────────────────────────────────────────────
  const hex = (h) => {
    const n = parseInt(h.replace('#', ''), 16)
    return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 }
  }
  const solid = (h, a = 1) => [{ type: 'SOLID', color: hex(h), opacity: a }]
  const none  = []

  // ─── Font loading ─────────────────────────────────────────────────────────
  await Promise.all([
    figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
    figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
  ])

  // ─── Low-level node builders ──────────────────────────────────────────────
  function frame({ name, w, h, x = 0, y = 0, fill = none, radius = 0, clip = false, layout = 'NONE', gap = 0, pad = 0, padL, padR, padT, padB, dir = 'VERTICAL', align = 'MIN', justify = 'MIN' }) {
    const f = figma.createFrame()
    f.name = name
    f.resize(w, h)
    f.x = x
    f.y = y
    f.fills = fill
    f.cornerRadius = radius
    f.clipsContent = clip
    if (layout !== 'NONE') {
      f.layoutMode = dir
      f.primaryAxisAlignItems = justify
      f.counterAxisAlignItems = align
      f.itemSpacing = gap
      f.paddingLeft   = padL ?? pad
      f.paddingRight  = padR ?? pad
      f.paddingTop    = padT ?? pad
      f.paddingBottom = padB ?? pad
      f.primaryAxisSizingMode = 'FIXED'
      f.counterAxisSizingMode = 'FIXED'
    }
    return f
  }

  function rect({ name, w, h, x = 0, y = 0, fill = none, radius = 0, stroke = none, strokeW = 1 }) {
    const r = figma.createRectangle()
    r.name = name
    r.resize(w, h)
    r.x = x
    r.y = y
    r.fills = fill
    r.cornerRadius = radius
    r.strokes = stroke
    r.strokeWeight = strokeW
    return r
  }

  function txt({ chars, size = 16, weight = 'Regular', color = '#ffffff', align = 'LEFT', w, lh }) {
    const t = figma.createText()
    t.fontName = { family: 'Inter', style: weight }
    t.characters = chars
    t.fontSize = size
    t.fills = solid(color)
    t.textAlignHorizontal = align
    if (lh) t.lineHeight = { value: lh, unit: 'PIXELS' }
    if (w) { t.textAutoResize = 'HEIGHT'; t.resize(w, 40) }
    else   { t.textAutoResize = 'WIDTH_AND_HEIGHT' }
    return t
  }

  function dot(color = '#2cfecc') {
    const r = figma.createRectangle()
    r.name = 'dot'
    r.resize(12, 12)
    r.fills = solid(color)
    return r
  }

  // ─── Section builder ──────────────────────────────────────────────────────
  // Returns a fixed-width, auto-height-ish frame we'll size manually
  function section(name, bgColor, h) {
    return frame({ name, w: 1536, h, fill: solid(bgColor), clip: true })
  }

  // ─── PAGE FRAME ───────────────────────────────────────────────────────────
  const PAGE_W = 1536
  let currentY = 0

  const page = frame({ name: 'Tradewinds Page — Desktop 1536', w: PAGE_W, h: 100, fill: solid('#000000') })
  page.x = 0
  page.y = 0
  figma.currentPage.appendChild(page)

  function addSection(node) {
    node.x = 0
    node.y = currentY
    page.appendChild(node)
    currentY += node.height
  }

  // ─── 1. NAV BAR ───────────────────────────────────────────────────────────
  {
    const nav = section('NavBar', '#000000', 80)

    // Logo placeholder
    const logo = rect({ name: 'Logo', w: 113, h: 37, x: 64, y: 21, fill: solid('#2cfecc', 0.3), radius: 4 })
    nav.appendChild(logo)
    const logoTxt = txt({ chars: 'jozu', size: 20, weight: 'Bold', color: '#2cfecc' })
    logoTxt.x = 76; logoTxt.y = 28
    nav.appendChild(logoTxt)

    // Nav links
    const links = ['Product', 'Solutions', 'Pricing', 'Blog', 'Company']
    let lx = 233
    for (const l of links) {
      const t = txt({ chars: l, size: 16, color: '#ffffff' })
      t.x = lx; t.y = 28
      nav.appendChild(t)
      lx += t.width + 40
    }

    // CTA button
    const btn = frame({ name: 'CTA Button', w: 180, h: 48, x: 1292, y: 16, fill: solid('#ffffff'), radius: 4 })
    nav.appendChild(btn)
    const btnTxt = txt({ chars: 'On-Demand Demo', size: 16, color: '#040e0c', weight: 'Medium' })
    btnTxt.x = 24; btnTxt.y = 14
    btn.appendChild(btnTxt)

    addSection(nav)
  }

  // ─── 2. HERO ──────────────────────────────────────────────────────────────
  {
    const hero = section('Hero', '#051714', 1200)

    // Dark bg
    const bg = rect({ name: 'BG', w: 1536, h: 1200, fill: solid('#000000') })
    hero.appendChild(bg)

    // Headline
    const h1a = txt({ chars: 'Secure AI for', size: 72, weight: 'Regular', color: '#ffffff', w: 685, lh: 80 })
    h1a.x = 184; h1a.y = 240
    hero.appendChild(h1a)

    const h1b = txt({ chars: 'Defense Missions', size: 72, weight: 'Regular', color: '#2cfecc', w: 685, lh: 80 })
    h1b.x = 184; h1b.y = 320
    hero.appendChild(h1b)

    // Body
    const body = txt({ chars: 'Jozu has achieved Awardable status through the Department of Defense Chief Digital and Artificial Intelligence Office\'s (CDAO) Tradewinds Solutions Marketplace—meaning our solution has met rigorous evaluation standards and is ready for rapid acquisition by DoD customers.', size: 20, color: '#ffffff', w: 685, lh: 30 })
    body.x = 184; body.y = 456
    hero.appendChild(body)

    // CTA Button
    const cta = frame({ name: 'Visit Tradewinds', w: 300, h: 56, x: 184, y: 660, fill: solid('#2cfecc'), radius: 4 })
    hero.appendChild(cta)
    const ctaTxt = txt({ chars: 'Visit the Tradewinds Marketplace', size: 16, color: '#040e0c', weight: 'Medium' })
    ctaTxt.x = 20; ctaTxt.y = 18
    cta.appendChild(ctaTxt)

    // Awardable logo placeholder
    const award = frame({ name: 'Awardable Logo', w: 301, h: 301, x: 1089, y: 268, fill: solid('#1a1a1a'), radius: 150 })
    hero.appendChild(award)
    const awardTxt = txt({ chars: 'Awardable\nLogo', size: 18, color: '#2cfecc', align: 'CENTER', weight: 'Bold' })
    awardTxt.x = 100; awardTxt.y = 130
    award.appendChild(awardTxt)

    // Screenshot placeholder
    const ss = frame({ name: 'Product Screenshot', w: 1168, h: 661, x: 184, y: 770, fill: solid('#0a1f1c'), radius: 4 })
    ss.strokes = solid('#ffffff', 0.32)
    ss.strokeWeight = 1
    hero.appendChild(ss)
    const ssTxt = txt({ chars: 'Product Screenshot', size: 24, color: '#2cfecc', align: 'CENTER', weight: 'Bold' })
    ssTxt.x = 474; ssTxt.y = 308
    ss.appendChild(ssTxt)

    addSection(hero)
  }

  // ─── 3. WHY JOZU — PROBLEM CARDS ─────────────────────────────────────────
  {
    const sec = section('Why Jozu — Problems', '#000000', 760)

    // Left text
    const label = txt({ chars: '● WHY JOZU', size: 14, color: '#ffffff', weight: 'Medium' })
    label.x = 64; label.y = 120
    sec.appendChild(label)

    const h2a = txt({ chars: 'Defense organizations face', size: 54, color: '#ffffff', w: 505, lh: 65 })
    h2a.x = 64; h2a.y = 160
    sec.appendChild(h2a)

    const h2b = txt({ chars: 'critical obstacles', size: 54, color: '#ff003d', w: 505, lh: 65 })
    h2b.x = 64; h2b.y = 285
    sec.appendChild(h2b)

    const h2c = txt({ chars: 'in deploying AI at scale:', size: 54, color: '#ffffff', w: 505, lh: 65 })
    h2c.x = 64; h2c.y = 352
    sec.appendChild(h2c)

    const learnBtn = frame({ name: 'Learn More', w: 160, h: 56, x: 64, y: 480, fill: solid('#040e0c'), radius: 4 })
    learnBtn.strokes = solid('#2cfecc')
    learnBtn.strokeWeight = 1
    sec.appendChild(learnBtn)
    const learnTxt = txt({ chars: 'Learn more', size: 16, color: '#2cfecc' })
    learnTxt.x = 36; learnTxt.y = 18
    learnBtn.appendChild(learnTxt)

    // Problem cards (2x2 grid)
    const cards = [
      { title: 'Fragmented pipelines', desc: 'Model and agent development scattered across disconnected tools', x: 632, y: 80 },
      { title: 'Vendor lock-in', desc: 'Proprietary formats and lack of open standards hinder innovation', x: 972, y: 80 },
      { title: 'Insufficient governance', desc: 'Limited visibility into model provenance and security posture', x: 632, y: 380 },
      { title: 'Air-Gapped Requirements', desc: 'Works in the cloud, on-premises, or at the tactical edge', x: 972, y: 380 },
    ]

    for (const c of cards) {
      const card = frame({ name: c.title, w: 300, h: 260, x: c.x, y: c.y, fill: solid('#1f1f1f'), radius: 12 })
      card.effects = [{ type: 'DROP_SHADOW', color: { r: 1, g: 0, b: 0.239, a: 0.6 }, offset: { x: 0, y: 36 }, radius: 56, spread: -30, visible: true, blendMode: 'NORMAL' }]
      sec.appendChild(card)

      // Icon placeholder
      const icon = rect({ name: 'Icon', w: 48, h: 48, x: 24, y: 24, fill: solid('#ff003d', 0.2), radius: 8 })
      card.appendChild(icon)

      const t1 = txt({ chars: c.title, size: 18, color: '#ffffff', weight: 'Medium', w: 252, lh: 26 })
      t1.x = 24; t1.y = 96
      card.appendChild(t1)

      const t2 = txt({ chars: c.desc, size: 14, color: '#cdcdcd', w: 252, lh: 22 })
      t2.x = 24; t2.y = 140
      card.appendChild(t2)
    }

    addSection(sec)
  }

  // ─── 4. SECURE & GOVERN ───────────────────────────────────────────────────
  {
    const sec = section('Secure & Govern', '#ffffff', 760)

    // Left
    const label = txt({ chars: '● WHY JOZU', size: 14, color: '#9b9b9b', weight: 'Medium' })
    label.x = 112; label.y = 80
    sec.appendChild(label)

    const h2 = txt({ chars: 'Secure and govern your ML from cloud to edge, across every classification level.', size: 54, color: '#000000', w: 424, lh: 65 })
    h2.x = 112; h2.y = 130
    sec.appendChild(h2)

    // Features (2x2)
    const features = [
      { title: 'Tamper-Proof Model Packaging', desc: 'Package AI models, datasets, code, and configurations into OCI-compliant ModelKits—standardized, immutable units built on open standards.', x: 616, y: 80 },
      { title: 'Cryptographic Chain of Custody', desc: 'Every artifact includes verifiable metadata and signed provenance attestations, creating an unbroken audit trail from development through deployment.', x: 980, y: 80 },
      { title: 'AI-Specific Security Scanning', desc: 'Automated scanning detects model-specific vulnerabilities and enforces security policies before models touch production infrastructure.', x: 616, y: 400 },
      { title: 'Policy-Enforced Deployment', desc: 'Define and enforce governance policies across your entire ML lifecycle, from cloud to edge. Ensure compliance with NIST AI RMF, ISO 42001, and other frameworks.', x: 980, y: 400 },
    ]

    for (const f of features) {
      // Icon
      const iconBg = rect({ name: 'Icon BG', w: 41, h: 41, x: f.x, y: f.y, fill: solid('#f2f2f2'), radius: 7 })
      sec.appendChild(iconBg)

      const ftitle = txt({ chars: f.title, size: 28, color: '#000000', weight: 'Medium', w: 300, lh: 34 })
      ftitle.x = f.x; ftitle.y = f.y + 55
      sec.appendChild(ftitle)

      const fdesc = txt({ chars: f.desc, size: 14, color: '#9b9b9b', w: 300, lh: 22 })
      fdesc.x = f.x; fdesc.y = f.y + 160
      sec.appendChild(fdesc)
    }

    addSection(sec)
  }

  // ─── 5. BUILT FOR DEFENSE ─────────────────────────────────────────────────
  {
    const sec = section('Built for Defense', '#ffffff', 600)

    const title = txt({ chars: 'Built for Defense Environments', size: 54, color: '#000000', align: 'CENTER', w: 686, lh: 65 })
    title.x = (1536 - 686) / 2; title.y = 80
    sec.appendChild(title)

    const sub = txt({ chars: 'Designed to operate in the most secure and challenging environments', size: 20, color: '#9b9b9b', align: 'CENTER', w: 686, lh: 30 })
    sub.x = (1536 - 686) / 2; sub.y = 180
    sec.appendChild(sub)

    const cols = [
      { title: 'Air-Gapped Operations', sub: 'JOZU IS INSTALLED COMPLETELY BEHIND YOUR FIREWALL.', body: 'Data never leaves your environment, and the platform operates fully in disconnected, air-gapped networks.', x: 96 },
      { title: 'Integrates with Your Stack', sub: 'JOZU WORKS ALONGSIDE THE TOOLS YOU ALREADY USE:', body: 'Built on open standards and backed by the Cloud Native Computing Foundation, Jozu allows your team to embrace best practices, while avoiding vendor lock-in.', x: 576 },
      { title: 'Kubernetes-Native', sub: 'DEPLOY TO ANY KUBERNETES ENVIRONMENT.', body: 'In-cluster deployment caching eliminates redundant builds and expensive network transfers.', x: 1056 },
    ]

    for (const c of cols) {
      const t1 = txt({ chars: c.title, size: 28, color: '#000000', weight: 'Medium', w: 380, lh: 36 })
      t1.x = c.x; t1.y = 280
      sec.appendChild(t1)

      const t2 = txt({ chars: c.sub, size: 11, color: '#000000', weight: 'Medium', w: 380, lh: 16 })
      t2.x = c.x; t2.y = 340
      sec.appendChild(t2)

      const t3 = txt({ chars: c.body, size: 18, color: '#9b9b9b', w: 380, lh: 28 })
      t3.x = c.x; t3.y = 380
      sec.appendChild(t3)
    }

    // Dividers
    const d1 = rect({ name: 'Divider', w: 1, h: 200, x: 544, y: 270, fill: solid('#e0e0e0') })
    sec.appendChild(d1)
    const d2 = rect({ name: 'Divider', w: 1, h: 200, x: 1024, y: 270, fill: solid('#e0e0e0') })
    sec.appendChild(d2)

    addSection(sec)
  }

  // ─── 6. WHAT EVALUATORS RECOGNIZED ───────────────────────────────────────
  {
    const sec = section('Evaluators', '#ffffff', 820)

    // Shield icon
    const shield = frame({ name: 'Shield', w: 80, h: 80, x: (1536 - 80) / 2, y: 60, fill: solid('#051714'), radius: 12 })
    shield.strokes = solid('#ffffff')
    shield.strokeWeight = 1
    sec.appendChild(shield)
    const shieldTxt = txt({ chars: '🛡', size: 32, align: 'CENTER' })
    shieldTxt.x = 24; shieldTxt.y = 22
    shield.appendChild(shieldTxt)

    const title = txt({ chars: 'What Tradewinds Evaluators Recognized', size: 54, color: '#000000', align: 'CENTER', w: 928, lh: 65 })
    title.x = (1536 - 928) / 2; title.y = 180
    sec.appendChild(title)

    // Quote
    const openQ = txt({ chars: '"', size: 128, color: '#2cfecc', weight: 'Bold' })
    openQ.x = 175; openQ.y = 290
    sec.appendChild(openQ)

    const quote = txt({ chars: 'Jozu enables secure packaging, cryptographic signing, automated AI-powered security scanning, supply-chain verification, and policy-enforced deployment, helping ensure that AI agents and models are built securely, tamper-proof when deployed, and easy to audit for mission-critical environments.', size: 28, color: '#000000', w: 877, lh: 36 })
    quote.x = 243; quote.y = 380
    sec.appendChild(quote)

    const closeQ = txt({ chars: '"', size: 128, color: '#2cfecc', weight: 'Bold' })
    closeQ.x = 1288; closeQ.y = 400
    sec.appendChild(closeQ)

    // Separator line
    const line = rect({ name: 'Separator', w: 1187, h: 1, x: 175, y: 595, fill: solid('#e0e0e0') })
    sec.appendChild(line)

    const assessed = txt({ chars: 'The assessment highlighted:', size: 16, color: '#565656', w: 434 })
    assessed.x = 258; assessed.y = 616
    sec.appendChild(assessed)

    // Checks
    const checks = [
      { title: 'Precise problem articulation', sub: 'Of defense AI challenges', x: 380, y: 660 },
      { title: 'Standardized OCI-compliant ModelKits', sub: 'With tamper-evident provenance', x: 844, y: 660 },
      { title: 'Simple subscription model', sub: 'Well-aligned to secure, multi-cluster DoD deployments', x: 380, y: 740 },
      { title: 'Air-gapped environment support', sub: 'For disconnected operations', x: 844, y: 740 },
    ]

    for (const ck of checks) {
      const chk = rect({ name: 'Check', w: 28, h: 28, x: ck.x - 44, y: ck.y, fill: solid('#2cfecc'), radius: 14 })
      sec.appendChild(chk)
      const ct = txt({ chars: ck.title, size: 18, color: '#000000', weight: 'Medium', w: 400, lh: 26 })
      ct.x = ck.x; ct.y = ck.y
      sec.appendChild(ct)
      const cs = txt({ chars: ck.sub, size: 14, color: '#565656', w: 400, lh: 22 })
      cs.x = ck.x; cs.y = ck.y + 32
      sec.appendChild(cs)
    }

    addSection(sec)
  }

  // ─── 7. PROVEN IN PRODUCTION ──────────────────────────────────────────────
  {
    const sec = section('Proven in Production', '#ffffff', 600)

    // Badge
    const badge = frame({ name: 'Cert Badge', w: 59, h: 59, x: (1536 - 59) / 2, y: 60, fill: solid('#f2f2f2'), radius: 30 })
    badge.strokes = solid('#e0e0e0')
    badge.strokeWeight = 2
    sec.appendChild(badge)

    const title = txt({ chars: 'Proven in Production', size: 54, color: '#000000', align: 'CENTER', w: 928, lh: 65 })
    title.x = (1536 - 928) / 2; title.y = 160
    sec.appendChild(title)

    const sub = txt({ chars: "Jozu's technology is trusted by:", size: 20, color: '#565656', weight: 'Bold', align: 'CENTER', w: 928, lh: 30 })
    sub.x = (1536 - 928) / 2; sub.y = 250
    sec.appendChild(sub)

    const cards = [
      { title: 'U.S. Government agencies', icon: '🏛', x: 124 },
      { title: 'European Government organizations', icon: '🇪🇺', x: 608 },
      { title: 'Global enterprises\n\n• finance\n• healthcare\n• telecommunications\n• logistics', icon: '🏢', x: 1092 },
    ]

    for (const c of cards) {
      const card = frame({ name: c.title, w: 320, h: 260, x: c.x, y: 320, fill: solid('#f2f2f2'), radius: 20 })
      card.strokes = solid('#e0e0e0')
      card.strokeWeight = 1.8
      sec.appendChild(card)

      const iconBg = frame({ name: 'Icon BG', w: 72, h: 72, x: 24, y: 24, fill: solid('#ffffff'), radius: 7 })
      iconBg.strokes = solid('#e0e0e0')
      iconBg.strokeWeight = 1
      card.appendChild(iconBg)

      const iconTxt = txt({ chars: c.icon, size: 36, align: 'CENTER' })
      iconTxt.x = 18; iconTxt.y = 18
      iconBg.appendChild(iconTxt)

      const ct = txt({ chars: c.title, size: 22, color: '#000000', weight: 'Medium', w: 272, lh: 30 })
      ct.x = 24; ct.y = 120
      card.appendChild(ct)
    }

    addSection(sec)
  }

  // ─── 8. MARKETPLACE CTA ───────────────────────────────────────────────────
  {
    const sec = section('Marketplace CTA', '#ffffff', 480)

    const label = txt({ chars: '[ Label ]', size: 14, color: '#9b9b9b', align: 'CENTER', w: 200, weight: 'Medium' })
    label.x = (1536 - 200) / 2; label.y = 80
    sec.appendChild(label)

    const h2 = txt({ chars: 'Government customers can view our awardable solution on the Tradewinds Solutions Marketplace', size: 54, color: '#040e0c', align: 'CENTER', w: 900, lh: 65 })
    h2.x = (1536 - 900) / 2; h2.y = 130
    sec.appendChild(h2)

    // Green "Government customers" tint on first two words done via separate node
    const h2green = txt({ chars: 'Government customers', size: 54, color: '#1db18e', weight: 'Bold', align: 'CENTER', w: 680, lh: 65 })
    h2green.x = (1536 - 680) / 2; h2green.y = 130
    sec.appendChild(h2green)

    const sub = txt({ chars: 'Get started and create a Tradewinds Marketplace Account', size: 20, color: '#565656', align: 'CENTER', w: 700, lh: 30 })
    sub.x = (1536 - 700) / 2; sub.y = 300
    sec.appendChild(sub)

    // Buttons
    const btn1 = frame({ name: 'Visit Marketplace', w: 300, h: 56, x: 528, y: 370, fill: solid('#2cfecc'), radius: 4 })
    sec.appendChild(btn1)
    const btn1t = txt({ chars: 'Visit the Tradewinds Marketplace', size: 15, color: '#040e0c', weight: 'Medium' })
    btn1t.x = 16; btn1t.y = 18
    btn1.appendChild(btn1t)

    const btn2 = frame({ name: 'Contact Jozu', w: 160, h: 56, x: 848, y: 370, fill: solid('#040e0c'), radius: 4 })
    sec.appendChild(btn2)
    const btn2t = txt({ chars: 'Contact Jozu', size: 15, color: '#2cfecc', weight: 'Medium' })
    btn2t.x = 28; btn2t.y = 18
    btn2.appendChild(btn2t)

    addSection(sec)
  }

  // ─── 9. TAGLINE BANNER ────────────────────────────────────────────────────
  {
    const sec = section('Tagline Banner', '#002b29', 160)

    const tagline = txt({ chars: 'Jozu — The model you deploy is the model you tested,\nwith a verifiable chain of custody all the way back through your suppliers.', size: 20, color: '#2cfecc', align: 'CENTER', w: 1000, lh: 30 })
    tagline.x = (1536 - 1000) / 2; tagline.y = 52
    sec.appendChild(tagline)

    addSection(sec)
  }

  // ─── 10. FOOTER ───────────────────────────────────────────────────────────
  {
    const sec = section('Footer', '#000000', 580)

    // Logo
    const logoTxt = txt({ chars: 'jozu', size: 48, color: '#2cfecc', weight: 'Bold' })
    logoTxt.x = 188; logoTxt.y = 100
    sec.appendChild(logoTxt)

    // Nav columns
    const cols = [
      { head: 'Jozu', links: ['Product', 'Pricing', 'Case Study', 'Company', 'News'], x: 700 },
      { head: 'KitOps', links: ['Install KitOps', 'KitOps Docs', 'KitOps Support', 'Champions'], x: 940 },
      { head: 'Resources', links: ['Blog', 'Support', 'Contact us'], x: 1180 },
    ]

    for (const col of cols) {
      const h = txt({ chars: col.head, size: 12, color: '#9b9b9b', weight: 'Medium' })
      h.x = col.x; h.y = 100
      sec.appendChild(h)

      let ly = 140
      for (const link of col.links) {
        const l = txt({ chars: link, size: 16, color: '#ffffff' })
        l.x = col.x; l.y = ly
        sec.appendChild(l)
        ly += 40
      }
    }

    // Divider
    const divider = rect({ name: 'Divider', w: 1220, h: 1, x: 188, y: 430, fill: solid('#2c2c2c') })
    sec.appendChild(divider)

    // Badges
    const badge1 = frame({ name: 'Awardable Badge', w: 72, h: 72, x: 188, y: 460, fill: solid('#1a1a1a'), radius: 36 })
    sec.appendChild(badge1)
    const b1t = txt({ chars: '★', size: 28, color: '#ffffff', align: 'CENTER' })
    b1t.x = 22; b1t.y = 22
    badge1.appendChild(b1t)

    const badge2 = frame({ name: 'CNCF Badge', w: 132, h: 36, x: 280, y: 478, fill: solid('#1a1a1a'), radius: 4 })
    sec.appendChild(badge2)
    const b2t = txt({ chars: 'CNCF Silver Member', size: 10, color: '#ffffff', align: 'CENTER', weight: 'Medium' })
    b2t.x = 16; b2t.y = 12
    badge2.appendChild(b2t)

    // Copyright
    const copy = txt({ chars: 'Copyright © 2025 Jozu', size: 16, color: '#9b9b9b' })
    copy.x = 188; copy.y = 546
    sec.appendChild(copy)

    const links2 = [
      { chars: 'Privacy', x: 430 },
      { chars: 'Terms & Conditions', x: 520 },
      { chars: 'POC Agreement', x: 720 },
    ]
    for (const lk of links2) {
      const l = txt({ chars: lk.chars, size: 16, color: '#ffffff' })
      l.x = lk.x; l.y = 546
      sec.appendChild(l)
    }

    addSection(sec)
  }

  // ─── Resize page to full height ───────────────────────────────────────────
  page.resize(PAGE_W, currentY)

  // Zoom to fit
  figma.viewport.scrollAndZoomIntoView([page])

  figma.notify('✅ Jozu Tradewinds page created! (' + currentY + 'px tall)', { timeout: 4000 })
  figma.closePlugin()
})()
