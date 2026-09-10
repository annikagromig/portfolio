import { useState } from 'react'

// ── Brand tokens ───────────────────────────────────────────────────────────────
const C = {
  bg: '#051714',
  surface: '#081e1a',
  surfaceHigh: '#0d2821',
  surfaceLift: '#102e25',
  border: 'rgba(44,254,204,0.1)',
  borderSubtle: 'rgba(255,255,255,0.06)',
  swift: '#2CFECC',
  jade: '#5BE6B7',
  river: '#1DB18E',
  grass: '#16886D',
  leaf: '#136350',
  stealth: '#0C4646',
  text: '#ececec',
  muted: 'rgba(236,236,236,0.45)',
  faint: 'rgba(236,236,236,0.08)',
  healthy: '#2CFECC',
  degraded: '#F5A623',
  stopped: '#6B7B7A',
  unreachable: '#FF4D6D',
} as const

type Status = 'healthy' | 'degraded' | 'stopped' | 'unreachable'

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; bgCard: string }> = {
  healthy:     { label: 'Healthy',     color: C.healthy,     bg: 'rgba(44,254,204,0.08)',  bgCard: 'rgba(44,254,204,0.04)'  },
  degraded:    { label: 'Degraded',    color: C.degraded,    bg: 'rgba(245,166,35,0.10)',  bgCard: 'rgba(245,166,35,0.04)'  },
  stopped:     { label: 'Stopped',     color: C.stopped,     bg: 'rgba(107,123,122,0.14)', bgCard: 'rgba(107,123,122,0.03)' },
  unreachable: { label: 'Unreachable', color: C.unreachable, bg: 'rgba(255,77,109,0.10)',  bgCard: 'rgba(255,77,109,0.04)'  },
}

// ── Data ───────────────────────────────────────────────────────────────────────
interface Instance {
  id: string; status: Status
  agent: string; agentDigest: string; agentVer: string; guardVer: string
  uptime: string; lastSeen: string
  mcp: [number, number]
  policySynced: boolean; policyDrift?: string
  auditPending: number
  cpu: number[]; mem: number[]; lat: number[]
}

const INSTANCES: Instance[] = [
  { id: 'ag-prod-east-01', status: 'healthy',     agent: 'customer-support',  agentDigest: 'sha256:4a3b2c1d', agentVer: 'v2.1.0', guardVer: '0.9.1', uptime: '5d 14h',  lastSeen: '3s ago',     mcp: [4,4], policySynced: true,  auditPending: 0,  cpu: [12,15,11,14,13,16,12,14], mem: [34,35,34,36,35,37,34,36], lat: [42,45,40,43,44,41,42,43] },
  { id: 'ag-prod-east-02', status: 'healthy',     agent: 'customer-support',  agentDigest: 'sha256:4a3b2c1d', agentVer: 'v2.1.0', guardVer: '0.9.1', uptime: '5d 14h',  lastSeen: '5s ago',     mcp: [4,4], policySynced: true,  auditPending: 0,  cpu: [18,20,17,19,21,18,20,19], mem: [41,42,40,43,41,44,42,43], lat: [38,36,40,37,39,38,37,39] },
  { id: 'ag-prod-west-01', status: 'healthy',     agent: 'procurement-agent', agentDigest: 'sha256:9f8e7d6c', agentVer: 'v1.1.0', guardVer: '0.9.1', uptime: '12d 2h',  lastSeen: '8s ago',     mcp: [3,3], policySynced: true,  auditPending: 2,  cpu: [8,9,7,10,8,9,8,9],       mem: [28,29,27,30,28,31,29,30], lat: [55,58,52,56,54,57,55,56] },
  { id: 'ag-prod-west-02', status: 'healthy',     agent: 'procurement-agent', agentDigest: 'sha256:9f8e7d6c', agentVer: 'v1.1.0', guardVer: '0.9.1', uptime: '12d 2h',  lastSeen: '11s ago',    mcp: [3,3], policySynced: true,  auditPending: 0,  cpu: [14,13,15,12,16,14,13,15], mem: [32,31,33,32,34,32,33,32], lat: [48,46,50,47,49,48,47,49] },
  { id: 'ag-prod-eu-01',   status: 'healthy',     agent: 'customer-support',  agentDigest: 'sha256:4a3b2c1d', agentVer: 'v2.1.0', guardVer: '0.9.1', uptime: '8d 3h',   lastSeen: '4s ago',     mcp: [4,4], policySynced: true,  auditPending: 0,  cpu: [22,24,20,23,25,21,23,22], mem: [45,47,43,46,48,44,46,45], lat: [62,65,60,63,66,61,63,62] },
  { id: 'ag-prod-eu-02',   status: 'healthy',     agent: 'customer-support',  agentDigest: 'sha256:4a3b2c1d', agentVer: 'v2.1.0', guardVer: '0.9.1', uptime: '8d 3h',   lastSeen: '9s ago',     mcp: [4,4], policySynced: true,  auditPending: 0,  cpu: [19,21,18,20,22,19,21,20], mem: [43,44,42,45,43,46,43,44], lat: [59,61,57,60,62,58,60,59] },
  { id: 'ag-prod-apac-01', status: 'healthy',     agent: 'procurement-agent', agentDigest: 'sha256:9f8e7d6c', agentVer: 'v1.1.0', guardVer: '0.9.1', uptime: '2d 11h',  lastSeen: '7s ago',     mcp: [3,3], policySynced: true,  auditPending: 0,  cpu: [31,33,29,32,35,30,32,31], mem: [51,53,50,54,52,55,52,53], lat: [78,75,81,77,79,76,78,77] },
  { id: 'ag-prod-apac-02', status: 'healthy',     agent: 'procurement-agent', agentDigest: 'sha256:9f8e7d6c', agentVer: 'v1.1.0', guardVer: '0.9.1', uptime: '2d 11h',  lastSeen: '12s ago',    mcp: [3,3], policySynced: true,  auditPending: 3,  cpu: [28,30,26,29,32,27,29,28], mem: [48,50,47,51,49,52,49,50], lat: [74,72,77,75,73,76,74,75] },
  { id: 'ag-edge-lab-01',  status: 'healthy',     agent: 'data-pipeline-v3',  agentDigest: 'sha256:1c2d3e4f', agentVer: 'v3.0.2', guardVer: '0.9.1', uptime: '3d 7h',   lastSeen: '2s ago',     mcp: [2,2], policySynced: true,  auditPending: 0,  cpu: [45,48,42,46,50,44,47,46], mem: [62,64,61,65,63,66,63,64], lat: [91,88,94,90,92,89,91,90] },
  { id: 'ag-edge-lab-02',  status: 'healthy',     agent: 'data-pipeline-v3',  agentDigest: 'sha256:1c2d3e4f', agentVer: 'v3.0.2', guardVer: '0.9.1', uptime: '3d 7h',   lastSeen: '6s ago',     mcp: [2,2], policySynced: true,  auditPending: 1,  cpu: [38,40,36,39,42,38,40,39], mem: [58,60,57,61,59,62,59,60], lat: [84,82,87,85,83,86,84,85] },
  { id: 'ag-dev-sandbox-01', status: 'healthy',   agent: 'test-harness',      agentDigest: 'sha256:7a6b5c4d', agentVer: 'v0.4.1', guardVer: '0.9.0', uptime: '0d 18h',  lastSeen: '15s ago',    mcp: [1,2], policySynced: true,  auditPending: 0,  cpu: [5,6,4,7,5,6,5,6],         mem: [15,16,14,17,15,18,15,16], lat: [120,118,125,121,119,123,120,121] },
  { id: 'ag-prod-apac-03', status: 'healthy',     agent: 'data-pipeline-v3',  agentDigest: 'sha256:1c2d3e4f', agentVer: 'v3.0.2', guardVer: '0.9.1', uptime: '1d 4h',   lastSeen: '16s ago',    mcp: [2,2], policySynced: true,  auditPending: 0,  cpu: [25,27,23,26,29,24,26,25], mem: [40,42,39,43,41,44,41,42], lat: [68,71,66,69,72,67,69,68] },
  { id: 'ag-prod-east-03', status: 'degraded',    agent: 'customer-support',  agentDigest: 'sha256:4a3b2c1d', agentVer: 'v2.1.0', guardVer: '0.9.1', uptime: '5d 14h',  lastSeen: '34s ago',    mcp: [3,4], policySynced: false, policyDrift: 'guardrail-policy: expected sha256:ff00aa12, loaded sha256:dd99bb34', auditPending: 7,  cpu: [45,62,78,82,75,90,88,91], mem: [71,74,78,82,85,84,87,89], lat: [145,168,192,210,198,224,215,220] },
  { id: 'ag-edge-remote-01', status: 'degraded',  agent: 'test-harness',      agentDigest: 'sha256:7a6b5c4d', agentVer: 'v0.4.0', guardVer: '0.8.9', uptime: '0d 2h',   lastSeen: '1m 12s ago', mcp: [1,2], policySynced: false, policyDrift: 'tool-policy: version mismatch — hub v4, loaded v3', auditPending: 12, cpu: [55,68,72,80,76,85,91,94], mem: [78,80,83,85,82,88,90,92], lat: [210,240,260,280,255,295,310,318] },
  { id: 'ag-dev-sandbox-02', status: 'stopped',   agent: 'test-harness',      agentDigest: 'sha256:7a6b5c4d', agentVer: 'v0.4.1', guardVer: '0.9.0', uptime: '—',       lastSeen: '2h 4m ago',  mcp: [0,2], policySynced: false, auditPending: 0,  cpu: [10,8,6,3,0,0,0,0],         mem: [30,28,25,12,0,0,0,0],     lat: [100,110,120,80,0,0,0,0] },
  { id: 'ag-edge-field-07', status: 'unreachable', agent: 'data-pipeline-v3', agentDigest: 'sha256:1c2d3e4f', agentVer: 'v3.0.2', guardVer: '0.9.1', uptime: '—',       lastSeen: '14m ago',    mcp: [0,3], policySynced: false, auditPending: 0,  cpu: [35,32,28,20,12,0,0,0],     mem: [55,52,48,40,30,0,0,0],    lat: [80,90,110,140,0,0,0,0] },
]

const SUMMARY: { status: Status; count: number }[] = [
  { status: 'healthy', count: 12 },
  { status: 'degraded', count: 2 },
  { status: 'stopped', count: 1 },
  { status: 'unreachable', count: 1 },
]

// ── Utilities ──────────────────────────────────────────────────────────────────
function Sparkline({ values, color, width = 80, height = 28 }: { values: number[]; color: string; width?: number; height?: number }) {
  const nonZero = values.filter(v => v > 0)
  if (nonZero.length < 2) {
    return (
      <svg width={width} height={height} style={{ display: 'block', flexShrink: 0 }}>
        <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke={color} strokeWidth={1} strokeDasharray="3 3" opacity={0.3} />
      </svg>
    )
  }
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width
    const y = v === 0 ? height : height - 2 - ((v - min) / range) * (height - 6)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  return (
    <svg width={width} height={height} style={{ display: 'block', flexShrink: 0, overflow: 'visible' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" opacity={0.85} />
    </svg>
  )
}

function Dot({ status, size = 7 }: { status: Status; size?: number }) {
  const { color } = STATUS_CONFIG[status]
  return (
    <span style={{
      display: 'inline-block', width: size, height: size, borderRadius: '50%',
      background: color, flexShrink: 0,
      boxShadow: status === 'healthy' ? `0 0 5px ${color}` : 'none',
    }} />
  )
}

function StatusPill({ status }: { status: Status }) {
  const { label, color, bg } = STATUS_CONFIG[status]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 9px', borderRadius: 20, background: bg,
      color, fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
      textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>
      <Dot status={status} size={5} />
      {label}
    </span>
  )
}

// ── Sidebar ────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Dashboard', icon: '⊟', active: false },
  { label: 'Registry', icon: '◫', active: false },
  { label: 'Policies', icon: '◈', active: false },
  { label: 'Agent Guard', icon: '⬡', active: true },
  { label: 'Audit', icon: '≡', active: false },
  { label: 'Settings', icon: '⊙', active: false },
]

function Sidebar() {
  return (
    <aside style={{
      width: 216, flexShrink: 0, background: C.surface,
      borderRight: `1px solid ${C.borderSubtle}`,
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 10,
    }}>
      <div style={{
        padding: '20px 18px 16px', display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: `1px solid ${C.borderSubtle}`,
      }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2L19 6.5V15.5L11 20L3 15.5V6.5L11 2Z" fill={C.swift} fillOpacity="0.12" stroke={C.swift} strokeWidth="1.5" />
          <path d="M11 6L15.5 8.5V13.5L11 16L6.5 13.5V8.5L11 6Z" fill={C.swift} fillOpacity="0.4" />
        </svg>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, letterSpacing: '0.05em' }}>JOZU HUB</div>
          <div style={{ fontSize: 10, color: C.muted, letterSpacing: '0.06em' }}>v1.0.0-beta</div>
        </div>
      </div>
      <nav style={{ padding: '12px 10px', flex: 1 }}>
        {NAV_ITEMS.map(item => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 12px', borderRadius: 8, marginBottom: 2, cursor: 'pointer',
            background: item.active ? 'rgba(44,254,204,0.1)' : 'transparent',
            borderLeft: item.active ? `2px solid ${C.swift}` : '2px solid transparent',
          }}>
            <span style={{ fontSize: 13, color: item.active ? C.swift : C.muted, width: 16, textAlign: 'center' }}>{item.icon}</span>
            <span style={{ fontSize: 13, color: item.active ? C.swift : C.muted, fontWeight: item.active ? 500 : 400 }}>{item.label}</span>
          </div>
        ))}
        <div style={{ marginLeft: 38, marginTop: 2 }}>
          {['Fleet', 'Definitions', 'Policies'].map((sub, i) => (
            <div key={sub} style={{
              fontSize: 12, color: i === 0 ? C.text : C.muted,
              padding: '6px 10px', borderRadius: 6, cursor: 'pointer',
              background: i === 0 ? C.faint : 'transparent',
            }}>{sub}</div>
          ))}
        </div>
      </nav>
      <div style={{
        padding: '14px 16px', borderTop: `1px solid ${C.borderSubtle}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: `linear-gradient(135deg, ${C.grass}, ${C.swift})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 600, color: C.bg, flexShrink: 0,
        }}>AG</div>
        <div>
          <div style={{ fontSize: 12, color: C.text }}>annika@jozu.com</div>
          <div style={{ fontSize: 11, color: C.muted }}>Admin</div>
        </div>
      </div>
    </aside>
  )
}

// ── Stat card ──────────────────────────────────────────────────────────────────
function StatCard({ status, count, pct, onClick, active }: {
  status: Status; count: number; pct: number; onClick: () => void; active: boolean
}) {
  const { label, color, bg } = STATUS_CONFIG[status]
  const icons: Record<Status, string> = {
    healthy: '●', degraded: '◐', stopped: '○', unreachable: '✕',
  }
  return (
    <button onClick={onClick} style={{
      flex: 1, minWidth: 0,
      padding: '20px 22px', borderRadius: 12, border: 'none',
      background: active ? bg : C.surface,
      outline: active ? `1px solid ${color}30` : `1px solid ${C.borderSubtle}`,
      outlineOffset: '-1px',
      cursor: 'pointer', textAlign: 'left',
      transition: 'all 0.15s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 18, color, opacity: 0.7 }}>{icons[status]}</span>
        <div style={{
          fontSize: 10, color, background: bg,
          padding: '2px 8px', borderRadius: 10, fontWeight: 600, letterSpacing: '0.05em',
        }}>
          {pct}%
        </div>
      </div>
      <div style={{ fontSize: 36, fontWeight: 700, color: active ? color : C.text, lineHeight: 1, marginBottom: 6 }}>
        {count}
      </div>
      <div style={{ fontSize: 12, color: C.muted, fontWeight: 400 }}>{label}</div>
    </button>
  )
}

// ── Alert row ──────────────────────────────────────────────────────────────────
function AlertPanel({ instances, onSelect }: { instances: Instance[]; onSelect: (id: string) => void }) {
  const alerts = instances.filter(i => i.status === 'degraded' || i.status === 'unreachable')
  if (alerts.length === 0) return null
  return (
    <div style={{
      background: C.surface, borderRadius: 12,
      border: `1px solid rgba(245,166,35,0.2)`,
      overflow: 'hidden', marginBottom: 20,
    }}>
      <div style={{
        padding: '12px 18px', borderBottom: `1px solid ${C.borderSubtle}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ color: C.degraded, fontSize: 13 }}>⚠</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: C.text, letterSpacing: '0.03em' }}>
          Attention Required
        </span>
        <span style={{
          fontSize: 10, background: 'rgba(245,166,35,0.12)', color: C.degraded,
          padding: '1px 8px', borderRadius: 10, fontWeight: 600,
        }}>
          {alerts.length}
        </span>
      </div>
      {alerts.map((inst, i) => {
        const { color } = STATUS_CONFIG[inst.status]
        return (
          <div
            key={inst.id}
            onClick={() => onSelect(inst.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '12px 18px',
              borderBottom: i < alerts.length - 1 ? `1px solid ${C.borderSubtle}` : 'none',
              cursor: 'pointer',
            }}
          >
            <Dot status={inst.status} size={8} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 12, color: C.text }}>{inst.id}</span>
                <StatusPill status={inst.status} />
              </div>
              <div style={{ fontSize: 11, color: C.muted }}>
                {inst.policyDrift
                  ? `Policy drift — ${inst.policyDrift.split(':')[0]}`
                  : inst.status === 'unreachable'
                    ? `Last seen ${inst.lastSeen} · ${inst.mcp[1]} MCP servers unreachable`
                    : `${inst.auditPending} audit bundles pending`}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <Sparkline values={inst.lat} color={color} width={72} height={24} />
              <span style={{ fontSize: 11, color: C.muted, whiteSpace: 'nowrap' }}>
                {inst.lastSeen}
              </span>
              <span style={{ color: C.muted, fontSize: 12 }}>›</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Instance card ──────────────────────────────────────────────────────────────
function InstanceCard({ inst, selected, onClick }: {
  inst: Instance; selected: boolean; onClick: () => void
}) {
  const { color, bgCard } = STATUS_CONFIG[inst.status]
  const cpuLast = inst.cpu[inst.cpu.length - 1]
  const memLast = inst.mem[inst.mem.length - 1]
  const latLast = inst.lat[inst.lat.length - 1]
  const latColor = latLast > 200 ? C.degraded : latLast > 100 ? C.jade : C.swift
  const [conn, total] = inst.mcp

  return (
    <div
      onClick={onClick}
      style={{
        background: selected ? bgCard : C.surface,
        borderRadius: 12, padding: '16px 18px', cursor: 'pointer',
        border: 'none',
        outline: selected
          ? `1.5px solid ${color}50`
          : `1px solid ${C.borderSubtle}`,
        outlineOffset: '-1px',
        transition: 'all 0.12s',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: 'monospace', fontSize: 11, color: selected ? color : C.text,
            fontWeight: 500, marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {inst.id}
          </div>
          <StatusPill status={inst.status} />
        </div>
        <div style={{
          fontSize: 10, color: C.muted, textAlign: 'right', flexShrink: 0,
          lineHeight: 1.6,
        }}>
          <div>{inst.lastSeen}</div>
          <div style={{ color: inst.guardVer === '0.8.9' ? C.degraded : C.muted }}>{inst.guardVer}</div>
        </div>
      </div>

      {/* Agent */}
      <div style={{
        padding: '8px 12px', borderRadius: 8,
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${C.borderSubtle}`,
      }}>
        <div style={{ fontSize: 12, color: C.text, fontWeight: 500, marginBottom: 2 }}>{inst.agent}</div>
        <div style={{ fontSize: 10, color: C.muted }}>{inst.agentVer}</div>
      </div>

      {/* Metrics row */}
      <div style={{ display: 'flex', gap: 0 }}>
        {[
          { label: 'Uptime', value: inst.uptime },
          { label: 'MCP', value: `${conn}/${total}`, color: conn < total ? C.degraded : C.swift },
          { label: 'Audit', value: inst.auditPending === 0 ? 'Synced' : `${inst.auditPending} pend.`, color: inst.auditPending > 0 ? C.degraded : C.swift },
        ].map((m, i) => (
          <div key={m.label} style={{
            flex: 1, paddingRight: i < 2 ? 12 : 0,
            borderRight: i < 2 ? `1px solid ${C.borderSubtle}` : 'none',
            paddingLeft: i > 0 ? 12 : 0,
          }}>
            <div style={{ fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>
              {m.label}
            </div>
            <div style={{ fontSize: 12, color: m.color || C.text, fontWeight: 500 }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Sparklines */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          {[
            { label: 'CPU', value: `${cpuLast}%`, color: C.river },
            { label: 'MEM', value: `${memLast}%`, color: C.jade },
            { label: 'LAT', value: `${latLast}ms`, color: latColor },
          ].map(m => (
            <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 1, background: m.color, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 9, color: C.muted, letterSpacing: '0.06em' }}>{m.label}</span>
              <span style={{ fontSize: 10, color: m.color, fontFamily: 'monospace' }}>{m.value}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
          <Sparkline values={inst.cpu} color={C.river} width={60} height={28} />
          <Sparkline values={inst.mem} color={C.jade} width={60} height={28} />
          <Sparkline values={inst.lat} color={latColor} width={60} height={28} />
        </div>
      </div>

      {/* Policy sync warning */}
      {!inst.policySynced && (
        <div style={{
          padding: '7px 10px', borderRadius: 7,
          background: 'rgba(245,166,35,0.08)', border: `1px solid rgba(245,166,35,0.2)`,
          fontSize: 10, color: C.degraded, display: 'flex', alignItems: 'flex-start', gap: 6,
        }}>
          <span>⚠</span>
          <span style={{ lineHeight: 1.4 }}>
            {inst.policyDrift
              ? inst.policyDrift.split('—')[0].trim()
              : 'Policy out of sync'}
          </span>
        </div>
      )}
    </div>
  )
}

// ── Detail panel ───────────────────────────────────────────────────────────────
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: C.river, textTransform: 'uppercase', marginBottom: 12 }}>
        {label}
      </div>
      {children}
    </div>
  )
}

function Row({ label, value, mono, valueColor }: { label: string; value: string; mono?: boolean; valueColor?: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      padding: '6px 0', borderBottom: `1px solid ${C.borderSubtle}`,
    }}>
      <span style={{ fontSize: 12, color: C.muted }}>{label}</span>
      <span style={{
        fontSize: 12, color: valueColor || C.text, textAlign: 'right', maxWidth: 240, wordBreak: 'break-all',
        fontFamily: mono ? 'monospace' : 'inherit',
      }}>{value}</span>
    </div>
  )
}

function SparkRow({ label, value, values, color }: { label: string; value: string; values: number[]; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 11, color: C.muted, width: 56, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1 }}><Sparkline values={values} color={color} width={180} height={28} /></div>
      <span style={{ fontSize: 12, color, width: 50, textAlign: 'right', fontFamily: 'monospace', flexShrink: 0 }}>{value}</span>
    </div>
  )
}

function DetailPanel({ inst, onClose }: { inst: Instance; onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed', right: 0, top: 0, bottom: 0, width: 420,
      background: C.surface, borderLeft: `1px solid ${C.border}`,
      display: 'flex', flexDirection: 'column', zIndex: 100,
      boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
    }}>
      <div style={{
        padding: '20px 24px', borderBottom: `1px solid ${C.borderSubtle}`,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <StatusPill status={inst.status} />
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 13, color: C.text, fontWeight: 500 }}>{inst.id}</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Last heartbeat: {inst.lastSeen}</div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: 18, padding: 4 }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        <Section label="Agent Definition">
          <Row label="Agent" value={`${inst.agent} ${inst.agentVer}`} />
          <Row label="Digest" value={inst.agentDigest} mono />
          <Row label="Guard version" value={inst.guardVer} mono />
          <Row label="Uptime" value={inst.uptime} />
        </Section>
        <Section label="24h Health">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <SparkRow label="CPU" value={`${inst.cpu[inst.cpu.length - 1]}%`} values={inst.cpu} color={C.river} />
            <SparkRow label="Memory" value={`${inst.mem[inst.mem.length - 1]}%`} values={inst.mem} color={C.jade} />
            <SparkRow label="Latency" value={`${inst.lat[inst.lat.length - 1]}ms`} values={inst.lat}
              color={inst.lat[inst.lat.length - 1] > 200 ? C.degraded : inst.lat[inst.lat.length - 1] > 100 ? C.jade : C.swift} />
          </div>
        </Section>
        <Section label={`MCP Servers (${inst.mcp[0]}/${inst.mcp[1]} connected)`}>
          {Array.from({ length: inst.mcp[1] }, (_, i) => {
            const connected = i < inst.mcp[0]
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 0', borderBottom: i < inst.mcp[1] - 1 ? `1px solid ${C.borderSubtle}` : 'none',
              }}>
                <div>
                  <div style={{ fontSize: 12, color: C.text }}>mcp-server-{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ fontSize: 11, color: C.muted, fontFamily: 'monospace' }}>:{8080 + i}</div>
                </div>
                <span style={{
                  fontSize: 11, padding: '2px 8px', borderRadius: 12,
                  background: connected ? 'rgba(44,254,204,0.1)' : 'rgba(255,77,109,0.1)',
                  color: connected ? C.swift : C.unreachable,
                }}>
                  {connected ? 'connected' : 'disconnected'}
                </span>
              </div>
            )
          })}
        </Section>
        <Section label="Policy Sync">
          <div style={{
            padding: '10px 14px', borderRadius: 8,
            background: inst.policySynced ? 'rgba(44,254,204,0.05)' : 'rgba(245,166,35,0.08)',
            border: `1px solid ${inst.policySynced ? 'rgba(44,254,204,0.15)' : 'rgba(245,166,35,0.2)'}`,
          }}>
            {inst.policySynced ? (
              <div style={{ color: C.swift, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>✓ All policies synced</div>
            ) : (
              <div>
                <div style={{ color: C.degraded, fontSize: 12, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>⚠ Policy drift detected</div>
                <div style={{ fontSize: 11, color: C.muted, fontFamily: 'monospace', lineHeight: 1.6 }}>{inst.policyDrift}</div>
              </div>
            )}
          </div>
        </Section>
        <Section label="Audit Sync">
          <Row label="Pending bundles" value={inst.auditPending === 0 ? 'Synced' : `${inst.auditPending} pending`}
            valueColor={inst.auditPending === 0 ? C.swift : inst.auditPending > 5 ? C.unreachable : C.degraded} />
          <Row label="Last sync" value={inst.auditPending === 0 ? inst.lastSeen : '—'} />
        </Section>
      </div>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function AgentGuardDashboard() {
  const [filterStatus, setFilterStatus] = useState<Status | null>(null)
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedInst = INSTANCES.find(i => i.id === selectedId) ?? null

  const filtered = INSTANCES.filter(inst => {
    if (filterStatus && inst.status !== filterStatus) return false
    if (search && !inst.id.toLowerCase().includes(search.toLowerCase()) &&
        !inst.agent.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const total = INSTANCES.length

  return (
    <div style={{
      display: 'flex', minHeight: '100vh', background: C.bg,
      fontFamily: "'ABC Diatype Variable', 'Atkinson Hyperlegible', system-ui, sans-serif",
    }}>
      <Sidebar />

      <main style={{
        marginLeft: 216, flex: 1, padding: '28px 28px',
        marginRight: selectedInst ? 420 : 0, minWidth: 0,
        transition: 'margin-right 0.2s',
      }}>
        {/* Breadcrumb + heading */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, fontSize: 12, color: C.muted }}>
          <span>Jozu Hub</span><span style={{ opacity: 0.4 }}>›</span>
          <span>Agent Guard</span><span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: C.text }}>Fleet</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: C.text, margin: 0, letterSpacing: '-0.01em' }}>
              Agent Guard Fleet
            </h1>
            <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>
              All registered instances · auto-refreshes every 15s
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              padding: '8px 16px', borderRadius: 7, border: `1px solid ${C.borderSubtle}`,
              background: 'transparent', color: C.muted, fontSize: 12, cursor: 'pointer',
            }}>Export</button>
            <button style={{
              padding: '8px 16px', borderRadius: 7, border: 'none',
              background: C.swift, color: C.bg, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>Register Instance</button>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          {SUMMARY.map(({ status, count }) => (
            <StatCard
              key={status} status={status} count={count}
              pct={Math.round((count / total) * 100)}
              onClick={() => setFilterStatus(prev => prev === status ? null : status)}
              active={filterStatus === status}
            />
          ))}
          <div style={{
            flex: 1, padding: '20px 22px', borderRadius: 12,
            background: C.surface, outline: `1px solid ${C.borderSubtle}`, outlineOffset: '-1px',
          }}>
            <div style={{ fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
              Fleet Overview
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, color: C.text, lineHeight: 1, marginBottom: 6 }}>{total}</div>
            <div style={{ fontSize: 12, color: C.muted }}>Total instances</div>
            <div style={{ marginTop: 16, display: 'flex', gap: 3, height: 6, borderRadius: 6, overflow: 'hidden' }}>
              {SUMMARY.map(({ status, count }) => (
                <div key={status} style={{
                  flex: count, background: STATUS_CONFIG[status].color,
                  opacity: status === 'healthy' ? 0.8 : status === 'degraded' ? 0.9 : 0.5,
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              {SUMMARY.map(({ status }) => (
                <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Dot status={status} size={5} />
                  <span style={{ fontSize: 10, color: C.muted }}>{STATUS_CONFIG[status].label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alert panel */}
        <AlertPanel instances={INSTANCES} onSelect={id => setSelectedId(prev => prev === id ? null : id)} />

        {/* Search */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: C.muted, fontSize: 13, pointerEvents: 'none' }}>⌕</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search instances or agents…"
              style={{
                width: '100%', padding: '8px 12px 8px 32px', borderRadius: 7,
                background: C.surface, border: `1px solid ${C.borderSubtle}`,
                color: C.text, fontSize: 12, outline: 'none',
              }}
            />
          </div>
          <div style={{ fontSize: 12, color: C.muted, marginLeft: 'auto' }}>
            {filtered.length} of {total} instances
          </div>
        </div>

        {/* Card grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 12,
        }}>
          {filtered.map(inst => (
            <InstanceCard
              key={inst.id} inst={inst}
              selected={selectedId === inst.id}
              onClick={() => setSelectedId(prev => prev === inst.id ? null : inst.id)}
            />
          ))}
        </div>
      </main>

      {selectedInst && (
        <DetailPanel inst={selectedInst} onClose={() => setSelectedId(null)} />
      )}
    </div>
  )
}
