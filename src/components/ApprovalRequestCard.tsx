import { useState } from 'react'

// ── Brand tokens (matches AgentGuardDashboard / ColorDesignSystem) ─────────────
const C = {
  bg: '#051714',
  surface: '#081e1a',
  surfaceHigh: '#0d2821',
  surfaceLift: '#102e25',
  border: 'rgba(44,254,204,0.1)',
  borderSubtle: 'rgba(255,255,255,0.08)',
  swift: '#2CFECC',
  jade: '#5BE6B7',
  river: '#1DB18E',
  grass: '#16886D',
  text: '#ececec',
  muted: 'rgba(236,236,236,0.5)',
  faint: 'rgba(236,236,236,0.08)',
  degraded: '#F5A623',
  danger: '#FF4D6D',
} as const

const fontSans = "'ABC Diatype Variable', 'Atkinson Hyperlegible', system-ui, sans-serif"
const fontMono = "'DM Mono', monospace"

// ── Small primitives ────────────────────────────────────────────────────────────
function Pill({ children, color = C.text, bg = C.faint }: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 10px', borderRadius: 20, background: bg, color,
      fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: C.river, marginBottom: 12,
    }}>{children}</div>
  )
}

function MetaRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '5px 0' }}>
      <span style={{ fontSize: 12, color: C.muted }}>{label}</span>
      <span style={{ fontSize: 12, color: C.text, fontFamily: mono ? fontMono : 'inherit', textAlign: 'right' }}>{value}</span>
    </div>
  )
}

interface CheckboxRowProps { label: string; checked: boolean; onChange: (v: boolean) => void }
function CheckboxRow({ label, checked, onChange }: CheckboxRowProps) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', padding: '4px 0' }}>
      <span style={{
        width: 15, height: 15, borderRadius: 4, flexShrink: 0,
        border: `1.5px solid ${checked ? C.swift : C.borderSubtle}`,
        background: checked ? 'rgba(44,254,204,0.12)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.2 5.7L8 1" stroke={C.swift} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span style={{ fontSize: 12.5, color: C.text }}>{label}</span>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} style={{ display: 'none' }} />
    </label>
  )
}

// ── Main component ──────────────────────────────────────────────────────────────
type Decision = 'pending' | 'approved' | 'rejected'

export default function ApprovalRequestCard() {
  const [validity, setValidity] = useState('30')
  const [note, setNote] = useState(
    'Approved for staging + prod. Monitor FPR in staging for 24h before prod deployment.'
  )
  const [notifyRequester, setNotifyRequester] = useState(true)
  const [notifyTeam, setNotifyTeam] = useState(true)
  const [requireStagingFirst, setRequireStagingFirst] = useState(false)
  const [decision, setDecision] = useState<Decision>('pending')

  return (
    <div style={{
      minHeight: '100vh', background: C.bg, fontFamily: fontSans,
      display: 'flex', justifyContent: 'center', padding: '48px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: 620 }}>

        <div style={{
          background: C.surface, borderRadius: 16,
          border: `1px solid ${C.border}`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          overflow: 'hidden',
        }}>

          {/* Header */}
          <div style={{ padding: '22px 26px', borderBottom: `1px solid ${C.borderSubtle}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontFamily: fontMono, fontSize: 15, fontWeight: 500, color: C.text }}>
                fraud-detection:v2.1.0
              </span>
              {decision === 'pending' && <Pill color={C.degraded} bg="rgba(245,166,35,0.12)">● Pending review</Pill>}
              {decision === 'approved' && <Pill color={C.swift} bg="rgba(44,254,204,0.12)">✓ Approved</Pill>}
              {decision === 'rejected' && <Pill color={C.danger} bg="rgba(255,77,109,0.12)">✕ Rejected</Pill>}
            </div>
            <MetaRow label="Requested by" value="David Rodriguez · david@company.com" />
            <MetaRow label="Requested" value="2024-10-10 13:30 UTC · 45 minutes ago" />
            <MetaRow label="Request ID" value="req-789xyz" mono />
          </div>

          {/* Requested scope */}
          <div style={{ padding: '22px 26px', borderBottom: `1px solid ${C.borderSubtle}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <SectionLabel>Requested Scope</SectionLabel>
              <button style={{
                background: 'none', border: 'none', color: C.jade, fontSize: 12,
                cursor: 'pointer', fontWeight: 500, padding: 0,
              }}>Modify Scope</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <span style={{ fontSize: 11, color: C.muted, width: 88, flexShrink: 0 }}>Environments</span>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Pill color={C.jade} bg="rgba(91,230,183,0.1)">staging</Pill>
                  <Pill color={C.degraded} bg="rgba(245,166,35,0.1)">prod</Pill>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <span style={{ fontSize: 11, color: C.muted, width: 88, flexShrink: 0 }}>Projects</span>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Pill>fraud</Pill>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                <span style={{ fontSize: 11, color: C.muted, width: 88, flexShrink: 0 }}>Regions</span>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Pill>all</Pill>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex', gap: 9, padding: '10px 14px', borderRadius: 9,
              background: 'rgba(44,254,204,0.05)', border: `1px solid ${C.border}`,
            }}>
              <span style={{ color: C.swift, fontSize: 13, lineHeight: 1.4 }}>ⓘ</span>
              <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
                This approval will allow deployment to <b style={{ color: C.text }}>staging</b> and{' '}
                <b style={{ color: C.text }}>prod</b> environments for the <b style={{ color: C.text }}>fraud</b> project.
              </span>
            </div>
          </div>

          {/* Justification */}
          <div style={{ padding: '22px 26px', borderBottom: `1px solid ${C.borderSubtle}` }}>
            <SectionLabel>Justification — from David</SectionLabel>
            <div style={{
              padding: '13px 16px', borderRadius: 9, background: C.surfaceHigh,
              borderLeft: `2px solid ${C.grass}`, fontSize: 12.5, color: C.text, lineHeight: 1.65,
            }}>
              "Updated Q4 fraud detection rules — addresses false positive rate. Previous version had 1.5% FPR
              which was causing customer complaints. This update reduces to 1.1% while maintaining 98%+ accuracy.
              All scans passed. Request approval for staging + prod."
            </div>
          </div>

          {/* Approval configuration */}
          <div style={{ padding: '22px 26px', borderBottom: `1px solid ${C.borderSubtle}` }}>
            <SectionLabel>Approval Configuration</SectionLabel>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>Approval valid for</div>
              <select
                value={validity}
                onChange={e => setValidity(e.target.value)}
                style={{
                  width: '100%', padding: '9px 12px', borderRadius: 8,
                  background: C.surfaceHigh, border: `1px solid ${C.borderSubtle}`,
                  color: C.text, fontSize: 12.5, outline: 'none', appearance: 'none',
                  fontFamily: fontSans, cursor: 'pointer',
                }}
              >
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>Add approval note (optional)</div>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={3}
                style={{
                  width: '100%', padding: '10px 12px', borderRadius: 8, resize: 'vertical',
                  background: C.surfaceHigh, border: `1px solid ${C.borderSubtle}`,
                  color: C.text, fontSize: 12.5, outline: 'none', fontFamily: fontSans, lineHeight: 1.5,
                }}
              />
            </div>

            <div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>Notification preferences</div>
              <CheckboxRow label="Notify requester via Slack" checked={notifyRequester} onChange={setNotifyRequester} />
              <CheckboxRow label="Notify team (#fraud-detection)" checked={notifyTeam} onChange={setNotifyTeam} />
              <CheckboxRow label="Require staging validation before prod" checked={requireStagingFirst} onChange={setRequireStagingFirst} />
            </div>
          </div>

          {/* Actions */}
          <div style={{ padding: '18px 26px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => setDecision('approved')}
              style={{
                flex: '1 1 auto', padding: '11px 18px', borderRadius: 8, border: 'none',
                background: C.swift, color: C.bg, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >✓ Approve for Requested Scope</button>
            <button style={{
              padding: '11px 18px', borderRadius: 8, border: `1px solid ${C.borderSubtle}`,
              background: 'transparent', color: C.text, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            }}>Modify Scope</button>
            <button
              onClick={() => setDecision('rejected')}
              style={{
                padding: '11px 18px', borderRadius: 8, border: `1px solid rgba(255,77,109,0.3)`,
                background: 'rgba(255,77,109,0.06)', color: C.danger, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}
            >✕ Reject Request</button>
            <button style={{
              padding: '11px 18px', borderRadius: 8, border: `1px solid ${C.borderSubtle}`,
              background: 'transparent', color: C.muted, fontSize: 13, fontWeight: 500, cursor: 'pointer',
            }}>Request More Info</button>
          </div>
        </div>
      </div>
    </div>
  )
}
