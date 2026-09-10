import { useState, useCallback } from 'react'

// ── Shared styles ──────────────────────────────────────────────────────────────
const fontSans = "'DM Sans', sans-serif"
const fontMono = "'DM Mono', monospace"

const checkerboard: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(45deg, #555 25%, transparent 25%),
    linear-gradient(-45deg, #555 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #555 75%),
    linear-gradient(-45deg, transparent 75%, #555 75%)
  `,
  backgroundSize: '16px 16px',
  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
  position: 'relative',
}

// ── Sub-components ────────────────────────────────────────────────────────────
interface SwatchCardProps {
  name: string
  hex: string
  token: string
  recipe?: string
  bgStyle: React.CSSProperties
  transparent?: boolean
  overlayColor?: string
  onCopy: (val: string) => void
  copyVal: string
}

function SwatchCard({ name, hex, token, recipe, bgStyle, transparent, overlayColor, onCopy, copyVal }: SwatchCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onCopy(copyVal)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      {transparent ? (
        <div style={{ ...checkerboard, height: 100 }}>
          <div style={{ position: 'absolute', inset: 0, background: overlayColor }} />
        </div>
      ) : (
        <div style={{ height: 100, width: '100%', ...bgStyle }} />
      )}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', marginBottom: 4 }}>{name}</div>
        <div style={{ fontFamily: fontMono, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{hex}</div>
        <div style={{ fontFamily: fontMono, fontSize: 10, color: 'rgba(44,254,204,0.6)', marginTop: 6 }}>{token}</div>
        {recipe && (
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', marginTop: 4, lineHeight: 1.5 }}>{recipe}</div>
        )}
      </div>
    </div>
  )
}

interface StateItemProps {
  label: string
  hex: string
  recipe: string
  swatchStyle: React.CSSProperties
}

function StateItem({ label, hex, recipe, swatchStyle }: StateItemProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 12, padding: '16px 20px', minWidth: 260,
    }}>
      <div style={{ width: 64, height: 64, borderRadius: 8, flexShrink: 0, ...swatchStyle }} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{label}</div>
        <div style={{ fontFamily: fontMono, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{hex}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', marginTop: 4 }}>{recipe}</div>
      </div>
    </div>
  )
}

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="4" y="6" width="9" height="10" rx="1.5" fill="currentColor" opacity=".9" />
    <rect x="6" y="3" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

// ── Main component ─────────────────────────────────────────────────────────────
export default function ColorDesignSystem() {
  const [toast, setToast] = useState<{ visible: boolean; text: string }>({ visible: false, text: '' })

  const copyHex = useCallback((val: string) => {
    navigator.clipboard.writeText(val).catch(() => {})
    setToast({ visible: true, text: `Copied ${val}` })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 1800)
  }, [])

  const sectionLabel = (text: string) => (
    <p style={{
      fontFamily: fontMono, fontSize: 10, letterSpacing: '0.14em',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 24,
    }}>{text}</p>
  )

  const divider = (
    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '0 0 64px 0' }} />
  )

  return (
    <div style={{
      background: '#051714', color: '#fff', fontFamily: fontSans,
      minHeight: '100vh', padding: '60px 40px',
    }}>
      {/* ── Header ── */}
      <header style={{
        display: 'flex', alignItems: 'baseline', gap: 16,
        marginBottom: 64, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 24,
      }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.5px' }}>Color Design System</h1>
        <span style={{
          fontFamily: fontMono, fontSize: 11, color: '#2CFECC',
          background: 'rgba(44,254,204,0.10)', padding: '3px 8px',
          borderRadius: 4, letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>v1.0</span>
      </header>

      {/* ── 01 Color Palette ── */}
      <section style={{ marginBottom: 64 }}>
        {sectionLabel('01 — Color Palette')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          <SwatchCard name="Primary Default" hex="#2CFECC" token="--primary-default"
            bgStyle={{ background: '#2CFECC' }} copyVal="#2CFECC" onCopy={copyHex} />
          <SwatchCard name="Primary Hover" hex="#23CBA3" token="--primary-hover"
            recipe="#2CFECC + #000 → 20%"
            bgStyle={{ background: '#23CBA3' }} copyVal="#23CBA3" onCopy={copyHex} />
          <SwatchCard name="Surface Base" hex="#051714" token="--surface-base"
            bgStyle={{ background: '#051714', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            copyVal="#051714" onCopy={copyHex} />
          <SwatchCard name="Surface UI" hex="#3D3D3D" token="--surface-ui"
            bgStyle={{ background: '#3D3D3D' }} copyVal="#3D3D3D" onCopy={copyHex} />
          <SwatchCard name="White Default" hex="#FFFFFF" token="--white-default"
            bgStyle={{ background: '#FFFFFF' }} copyVal="#FFFFFF" onCopy={copyHex} />
          <SwatchCard name="White Hover" hex="rgba(255,255,255, 0.80)" token="--white-hover"
            recipe="#FFF → 80% on #051714"
            transparent overlayColor="rgba(255,255,255,0.80)"
            bgStyle={{}} copyVal="rgba(255,255,255,0.80)" onCopy={copyHex} />
          <SwatchCard name="On-Primary / Black" hex="#000000" token="--on-primary"
            bgStyle={{ background: '#000000' }} copyVal="#000000" onCopy={copyHex} />
          <SwatchCard name="Black Overlay" hex="rgba(0,0,0, 0.20)" token="--black-overlay-20"
            recipe="Used for hover darkening"
            transparent overlayColor="rgba(0,0,0,0.20)"
            bgStyle={{}} copyVal="rgba(0,0,0,0.20)" onCopy={copyHex} />
        </div>
      </section>

      {divider}

      {/* ── 02 Interaction States ── */}
      <section style={{ marginBottom: 64 }}>
        {sectionLabel('02 — Interaction States')}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <StateItem label="Primary — Default" hex="#2CFECC" recipe="--primary-default"
            swatchStyle={{ background: '#2CFECC' }} />
          <StateItem label="Primary — Hover" hex="#23CBA3" recipe="#2CFECC + #000 → 20%"
            swatchStyle={{ background: '#23CBA3' }} />
          <StateItem label="White — Default" hex="#FFFFFF" recipe="--white-default"
            swatchStyle={{ background: '#FFF' }} />
          <StateItem label="White — Hover" hex="rgba(255,255,255, .80)" recipe="#FFF 80% on #051714"
            swatchStyle={{ background: 'rgba(255,255,255,0.80)', border: '1px solid rgba(255,255,255,0.15)' }} />
        </div>
      </section>

      {divider}

      {/* ── 03 Components ── */}
      <section style={{ marginBottom: 64 }}>
        {sectionLabel('03 — Components')}
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <Btn variant="primary"><CopyIcon /> Pull tag</Btn>
          <Btn variant="primary" style={{ opacity: 0.75 }}><CopyIcon /> Hover state</Btn>
          <Btn variant="white"><CopyIcon /> White button</Btn>
          <Btn variant="ghost"><CopyIcon /> Ghost variant</Btn>
        </div>
      </section>

      {divider}

      {/* ── 04 Design Tokens ── */}
      <section style={{ marginBottom: 64 }}>
        {sectionLabel('04 — Design Tokens')}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Token', 'Value', '', 'Role'].map((h, i) => (
                <th key={i} style={{
                  textAlign: 'left', fontFamily: fontMono, fontSize: 10,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)', padding: '0 16px 12px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { token: '--primary-default', value: '#2CFECC', dot: '#2CFECC', role: 'Brand accent, CTA buttons' },
              { token: '--primary-hover', value: '#23CBA3', dot: '#23CBA3', role: 'Pressed / hover state of primary' },
              { token: '--on-primary', value: '#000000', dot: '#000', role: 'Text/icon on primary surface' },
              { token: '--surface-base', value: '#051714', dot: '#051714', dotBorder: 'rgba(255,255,255,0.2)', role: 'App background / canvas' },
              { token: '--surface-ui', value: '#3D3D3D', dot: '#3D3D3D', role: 'Cards, panels, UI chrome' },
              { token: '--white-default', value: '#FFFFFF', dot: '#FFF', role: 'Primary text, white buttons' },
              { token: '--white-hover', value: 'rgba(255,255,255,.80)', dot: 'rgba(255,255,255,0.8)', role: 'Hover state of white elements' },
              { token: '--black-overlay-20', value: 'rgba(0,0,0,.20)', dot: 'rgba(0,0,0,0.20)', dotBorder: 'rgba(255,255,255,0.2)', role: 'Darken overlay for hover calc' },
            ].map((row, i) => (
              <TokenRow key={i} {...row} />
            ))}
          </tbody>
        </table>
      </section>

      {divider}

      {/* ── 05 CSS Variables ── */}
      <section style={{ marginBottom: 64 }}>
        {sectionLabel('05 — CSS Variables')}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12, padding: 24, fontFamily: fontMono, fontSize: 12,
          lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', overflowX: 'auto',
        }}>
          <Css />
        </div>
      </section>

      {/* Toast */}
      <div style={{
        position: 'fixed', bottom: 32, left: '50%',
        transform: toast.visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(12px)',
        background: '#2CFECC', color: '#000', fontFamily: fontMono, fontSize: 12,
        padding: '8px 20px', borderRadius: 99,
        opacity: toast.visible ? 1 : 0,
        pointerEvents: 'none',
        transition: 'opacity 0.2s, transform 0.2s',
        zIndex: 999,
      }}>
        {toast.text}
      </div>
    </div>
  )
}

// ── Button ─────────────────────────────────────────────────────────────────────
interface BtnProps {
  variant: 'primary' | 'white' | 'ghost'
  children: React.ReactNode
  style?: React.CSSProperties
}

function Btn({ variant, children, style: extraStyle }: BtnProps) {
  const [hovered, setHovered] = useState(false)

  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '14px 24px', borderRadius: 12,
    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500,
    cursor: 'pointer', border: 'none', letterSpacing: '0.01em',
    transition: 'background 0.18s ease, opacity 0.18s ease',
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: hovered ? '#23CBA3' : '#2CFECC',
      color: '#000',
    },
    white: {
      background: hovered ? 'rgba(255,255,255,0.80)' : '#FFFFFF',
      color: '#000',
    },
    ghost: {
      background: hovered ? 'rgba(44,254,204,0.08)' : 'transparent',
      color: '#2CFECC',
      border: '1.5px solid #2CFECC',
    },
  }

  return (
    <button
      style={{ ...base, ...variants[variant], ...extraStyle }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  )
}

// ── Token Row ──────────────────────────────────────────────────────────────────
interface TokenRowProps {
  token: string
  value: string
  dot: string
  dotBorder?: string
  role: string
}

function TokenRow({ token, value, dot, dotBorder, role }: TokenRowProps) {
  const [hovered, setHovered] = useState(false)
  const td: React.CSSProperties = {
    padding: '12px 16px', fontSize: 13,
    borderBottom: '1px solid rgba(255,255,255,0.04)', verticalAlign: 'middle',
    background: hovered ? 'rgba(255,255,255,0.02)' : 'transparent',
  }
  return (
    <tr onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <td style={td}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: '#2CFECC' }}>{token}</span></td>
      <td style={td}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{value}</span></td>
      <td style={td}>
        <span style={{
          width: 24, height: 24, borderRadius: '50%', display: 'inline-block',
          background: dot, border: `1px solid ${dotBorder ?? 'rgba(255,255,255,0.1)'}`,
          verticalAlign: 'middle',
        }} />
      </td>
      <td style={td}><span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>{role}</span></td>
    </tr>
  )
}

// ── CSS snippet ────────────────────────────────────────────────────────────────
function Css() {
  const k = (s: string) => <span style={{ color: '#2CFECC' }}>{s}</span>
  const v = (s: string) => <span style={{ color: 'rgba(255,255,255,0.85)' }}>{s}</span>
  const c = (s: string) => <span style={{ color: 'rgba(255,255,255,0.25)' }}>{s}</span>
  const nl = <br />
  const sp = '\u00A0\u00A0'

  return (
    <>
      {c('/* Color Design System — tokens.css */')}{nl}
      {k(':root')} {'{'}
      {nl}{sp}{c('/* Primary */')}
      {nl}{sp}{k('--primary-default')}: {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{v('#2CFECC')};
      {nl}{sp}{k('--primary-hover')}: {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{v('#23CBA3')};{'\u00A0\u00A0'}{c('/* #2CFECC + #000 @20% */')}
      {nl}{sp}{k('--on-primary')}: {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{v('#000000')};
      {nl}{nl}{sp}{c('/* Surface */')}
      {nl}{sp}{k('--surface-base')}: {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{v('#051714')};
      {nl}{sp}{k('--surface-ui')}: {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{v('#3D3D3D')};
      {nl}{nl}{sp}{c('/* Neutral */')}
      {nl}{sp}{k('--white-default')}: {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{v('#FFFFFF')};
      {nl}{sp}{k('--white-hover')}: {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{v('rgba(255, 255, 255, 0.80)')};{'\u00A0'}{c('/* on --surface-base */')}
      {nl}{sp}{k('--black-overlay-20')}: {'\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}{v('rgba(0, 0, 0, 0.20)')};
      {nl}{'}'}
    </>
  )
}
