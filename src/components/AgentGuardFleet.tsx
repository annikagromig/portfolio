import { useState } from 'react'

// ── Brand tokens ───────────────────────────────────────────────────────────────
const C = {
  bg: '#051714',
  surface: '#081e1a',
  surfaceHigh: '#0d2821',
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
  faint: 'rgba(236,236,236,0.12)',
  healthy: '#2CFECC',
  degraded: '#F5A623',
  stopped: '#6B7B7A',
  unreachable: '#FF4D6D',
} as const

type Status = 'healthy' | 'degraded' | 'stopped' | 'unreachable'

const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; glow: boolean }> = {
  healthy:     { label: 'Healthy',     color: C.healthy,     bg: 'rgba(44,254,204,0.08)',  glow: true  },
  degraded:    { label: 'Degraded',    color: C.degraded,    bg: 'rgba(245,166,35,0.10)',  glow: false },
  stopped:     { label: 'Stopped',     color: C.stopped,     bg: 'rgba(107,123,122,0.14)', glow: false },
  unreachable: { label: 'Unreachable', color: C.unreachable, bg: 'rgba(255,77,109,0.10)',  glow: false },
}

// ── Mock data ──────────────────────────────────────────────────────────────────
interface Instance {
  id: string
  status: Status
  agent: string
  agentDigest: string
  agentVer: string
  guardVer: string
  uptime: string
  lastSeen: string
  mcp: [number, number] // [connected, total]
  policySynced: boolean
  policyDrift?: string
  auditPending: number
  cpu: number[]
  mem: number[]
  lat: number[]
}

const INSTANCES: Instance[] = [
  { id: 'ag-prod-east-01', status: 'healthy',     agent: 'customer-support', agentDigest: 'sha256:4a3b2c1d', agentVer: 'v2.1.0', guardVer: '0.9.1', uptime: '5d 14h',  lastSeen: '3s ago',      mcp: [4, 4], policySynced: true,  auditPending: 0,  cpu: [12,15,11,14,13,16,12,14], mem: [34,35,34,36,35,37,34,36], lat: [42,45,40,43,44,41,42,43] },
  { id: 'ag-prod-east-02', status: 'healthy',     agent: 'customer-support', agentDigest: 'sha256:4a3b2c1d', agentVer: 'v2.1.0', guardVer: '0.9.1', uptime: '5d 14h',  lastSeen: '5s ago',      mcp: [4, 4], policySynced: true,  auditPending: 0,  cpu: [18,20,17,19,21,18,20,19], mem: [41,42,40,43,41,44,42,43], lat: [38,36,40,37,39,38,37,39] },
  { id: 'ag-prod-west-01', status: 'healthy',     agent: 'procurement-agent', agentDigest: 'sha256:9f8e7d6c', agentVer: 'v1.1.0', guardVer: '0.9.1', uptime: '12d 2h', lastSeen: '8s ago',      mcp: [3, 3], policySynced: true,  auditPending: 2,  cpu: [8,9,7,10,8,9,8,9],       mem: [28,29,27,30,28,31,29,30], lat: [55,58,52,56,54,57,55,56] },
  { id: 'ag-prod-west-02', status: 'healthy',     agent: 'procurement-agent', agentDigest: 'sha256:9f8e7d6c', agentVer: 'v1.1.0', guardVer: '0.9.1', uptime: '12d 2h', lastSeen: '11s ago',     mcp: [3, 3], policySynced: true,  auditPending: 0,  cpu: [14,13,15,12,16,14,13,15], mem: [32,31,33,32,34,32,33,32], lat: [48,46,50,47,49,48,47,49] },
  { id: 'ag-prod-eu-01',   status: 'healthy',     agent: 'customer-support', agentDigest: 'sha256:4a3b2c1d', agentVer: 'v2.1.0', guardVer: '0.9.1', uptime: '8d 3h',   lastSeen: '4s ago',      mcp: [4, 4], policySynced: true,  auditPending: 0,  cpu: [22,24,20,23,25,21,23,22], mem: [45,47,43,46,48,44,46,45], lat: [62,65,60,63,66,61,63,62] },
  { id: 'ag-prod-eu-02',   status: 'healthy',     agent: 'customer-support', agentDigest: 'sha256:4a3b2c1d', agentVer: 'v2.1.0', guardVer: '0.9.1', uptime: '8d 3h',   lastSeen: '9s ago',      mcp: [4, 4], policySynced: true,  auditPending: 0,  cpu: [19,21,18,20,22,19,21,20], mem: [43,44,42,45,43,46,43,44], lat: [59,61,57,60,62,58,60,59] },
  { id: 'ag-prod-apac-01', status: 'healthy',     agent: 'procurement-agent', agentDigest: 'sha256:9f8e7d6c', agentVer: 'v1.1.0', guardVer: '0.9.1', uptime: '2d 11h', lastSeen: '7s ago',      mcp: [3, 3], policySynced: true,  auditPending: 0,  cpu: [31,33,29,32,35,30,32,31], mem: [51,53,50,54,52,55,52,53], lat: [78,75,81,77,79,76,78,77] },
  { id: 'ag-prod-apac-02', status: 'healthy',     agent: 'procurement-agent', agentDigest: 'sha256:9f8e7d6c', agentVer: 'v1.1.0', guardVer: '0.9.1', uptime: '2d 11h', lastSeen: '12s ago',     mcp: [3, 3], policySynced: true,  auditPending: 3,  cpu: [28,30,26,29,32,27,29,28], mem: [48,50,47,51,49,52,49,50], lat: [74,72,77,75,73,76,74,75] },
  { id: 'ag-edge-lab-01',  status: 'healthy',     agent: 'data-pipeline-v3', agentDigest: 'sha256:1c2d3e4f', agentVer: 'v3.0.2', guardVer: '0.9.1', uptime: '3d 7h',   lastSeen: '2s ago',      mcp: [2, 2], policySynced: true,  auditPending: 0,  cpu: [45,48,42,46,50,44,47,46], mem: [62,64,61,65,63,66,63,64], lat: [91,88,94,90,92,89,91,90] },
  { id: 'ag-edge-lab-02',  status: 'healthy',     agent: 'data-pipeline-v3', agentDigest: 'sha256:1c2d3e4f', agentVer: 'v3.0.2', guardVer: '0.9.1', uptime: '3d 7h',   lastSeen: '6s ago',      mcp: [2, 2], policySynced: true,  auditPending: 1,  cpu: [38,40,36,39,42,38,40,39], mem: [58,60,57,61,59,62,59,60], lat: [84,82,87,85,83,86,84,85] },
  { id: 'ag-dev-sandbox-01', status: 'healthy',   agent: 'test-harness', agentDigest: 'sha256:7a6b5c4d',    agentVer: 'v0.4.1', guardVer: '0.9.0', uptime: '0d 18h',  lastSeen: '15s ago',     mcp: [1, 2], policySynced: true,  auditPending: 0,  cpu: [5,6,4,7,5,6,5,6],         mem: [15,16,14,17,15,18,15,16], lat: [120,118,125,121,119,123,120,121] },
  { id: 'ag-prod-apac-03', status: 'healthy',     agent: 'data-pipeline-v3', agentDigest: 'sha256:1c2d3e4f', agentVer: 'v3.0.2', guardVer: '0.9.1', uptime: '1d 4h',   lastSeen: '16s ago',     mcp: [2, 2], policySynced: true,  auditPending: 0,  cpu: [25,27,23,26,29,24,26,25], mem: [40,42,39,43,41,44,41,42], lat: [68,71,66,69,72,67,69,68] },
  { id: 'ag-prod-east-03', status: 'degraded',    agent: 'customer-support', agentDigest: 'sha256:4a3b2c1d', agentVer: 'v2.1.0', guardVer: '0.9.1', uptime: '5d 14h',  lastSeen: '34s ago',     mcp: [3, 4], policySynced: false, policyDrift: 'guardrail-policy: expected sha256:ff00aa12, loaded sha256:dd99bb34', auditPending: 7,  cpu: [45,62,78,82,75,90,88,91], mem: [71,74,78,82,85,84,87,89], lat: [145,168,192,210,198,224,215,220] },
  { id: 'ag-edge-remote-01', status: 'degraded',  agent: 'test-harness',   agentDigest: 'sha256:7a6b5c4d',  agentVer: 'v0.4.0', guardVer: '0.8.9', uptime: '0d 2h',   lastSeen: '1m 12s ago',  mcp: [1, 2], policySynced: false, policyDrift: 'tool-policy: version mismatch — hub v4, loaded v3', auditPending: 12, cpu: [55,68,72,80,76,85,91,94], mem: [78,80,83,85,82,88,90,92], lat: [210,240,260,280,255,295,310,318] },
  { id: 'ag-dev-sandbox-02', status: 'stopped',   agent: 'test-harness',   agentDigest: 'sha256:7a6b5c4d',  agentVer: 'v0.4.1', guardVer: '0.9.0', uptime: '—',       lastSeen: '2h 4m ago',   mcp: [0, 2], policySynced: false, auditPending: 0,  cpu: [10,8,6,3,0,0,0,0],       mem: [30,28,25,12,0,0,0,0],     lat: [100,110,120,80,0,0,0,0] },
  { id: 'ag-edge-field-07', status: 'unreachable', agent: 'data-pipeline-v3', agentDigest: 'sha256:1c2d3e4f', agentVer: 'v3.0.2', guardVer: '0.9.1', uptime: '—',      lastSeen: '14m ago',     mcp: [0, 3], policySynced: false, auditPending: 0,  cpu: [35,32,28,20,12,0,0,0],    mem: [55,52,48,40,30,0,0,0],    lat: [80,90,110,140,0,0,0,0] },
]

// ── Sub-components ─────────────────────────────────────────────────────────────
function Dot({ status }: { status: Status }) {
  const { color, glow } = STATUS_CONFIG[status]
  return (
    <span style={{
      display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
      background: color, flexShrink: 0,
      boxShadow: glow ? `0 0 5px ${color}` : 'none',
    }} />
  )
}

function StatusBadge({ status }: { status: Status }) {
  const { label, color, bg } = STATUS_CONFIG[status]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 10px', borderRadius: 20,
      background: bg, color, fontSize: 11, fontWeight: 500,
      letterSpacing: '0.02em', whiteSpace: 'nowrap',
    }}>
      <Dot status={status} />
      {label}
    </span>
  )
}

function Sparkline({ values, color = C.jade, width = 60, height = 22 }: {
  values: number[]; color?: string; width?: number; height?: number
}) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width
    const y = height - 2 - ((v - min) / range) * (height - 6)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  return (
    <svg width={width} height={height} style={{ display: 'block', flexShrink: 0, overflow: 'visible' }}>
      <polyline
        points={pts} fill="none"
        stroke={color} strokeWidth={1.5}
        strokeLinejoin="round" strokeLinecap="round"
        opacity={0.85}
      />
    </svg>
  )
}

function HealthCell({ inst }: { inst: Instance }) {
  const latColor = inst.lat[inst.lat.length - 1] > 200 ? C.degraded :
                   inst.lat[inst.lat.length - 1] > 100 ? C.jade : C.swift
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <Sparkline values={inst.cpu} color={C.river} />
      <Sparkline values={inst.mem} color={C.jade} />
      <Sparkline values={inst.lat} color={latColor} />
    </div>
  )
}

function MCPCell({ mcp, status }: { mcp: [number, number]; status: Status }) {
  const [connected, total] = mcp
  const allOk = connected === total
  const color = status === 'stopped' || status === 'unreachable'
    ? C.stopped
    : allOk ? C.swift : C.degraded
  return (
    <span style={{ color, fontSize: 12, fontFamily: "'DM Mono', 'ABC Diatype Mono', monospace", whiteSpace: 'nowrap' }}>
      {connected}/{total}
      <span style={{ marginLeft: 6, fontSize: 10, color: allOk ? C.river : C.degraded, opacity: 0.8 }}>
        {allOk ? 'connected' : 'partial'}
      </span>
    </span>
  )
}

function PolicyCell({ synced, drift }: { synced: boolean; drift?: string }) {
  if (synced) return (
    <span style={{ color: C.swift, fontSize: 13 }} title="Policy synced">✓</span>
  )
  return (
    <span
      title={drift || 'Policy drift detected'}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, cursor: 'help' }}
    >
      <span style={{ color: C.degraded, fontSize: 13 }}>⚠</span>
      <span style={{ color: C.degraded, fontSize: 11 }}>drift</span>
    </span>
  )
}

function AuditCell({ pending }: { pending: number }) {
  if (pending === 0) return <span style={{ color: C.swift, fontSize: 13 }}>✓</span>
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      color: pending > 5 ? C.unreachable : C.degraded, fontSize: 12,
    }}>
      <span>{pending}</span>
      <span style={{ fontSize: 10, opacity: 0.75 }}>pending</span>
    </span>
  )
}

// ── Sidebar ────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'Dashboard',    icon: '⊟', active: false },
  { label: 'Registry',     icon: '◫', active: false },
  { label: 'Policies',     icon: '◈', active: false },
  { label: 'Agent Guard',  icon: '⬡', active: true  },
  { label: 'Audit',        icon: '≡',  active: false },
  { label: 'Settings',     icon: '⊙', active: false },
]

function Sidebar() {
  return (
    <aside style={{
      width: 220, flexShrink: 0, background: C.surface,
      borderRight: `1px solid ${C.borderSubtle}`,
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 10,
    }}>
      {/* Wordmark */}
      <div style={{
        padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: `1px solid ${C.borderSubtle}`,
      }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2L19 6.5V15.5L11 20L3 15.5V6.5L11 2Z" fill={C.swift} fillOpacity="0.15" stroke={C.swift} strokeWidth="1.5"/>
          <path d="M11 6L15.5 8.5V13.5L11 16L6.5 13.5V8.5L11 6Z" fill={C.swift} fillOpacity="0.35"/>
        </svg>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: '0.04em' }}>JOZU HUB</div>
          <div style={{ fontSize: 10, color: C.muted, letterSpacing: '0.06em' }}>v1.0.0-beta</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 10px', flex: 1 }}>
        {NAV_ITEMS.map((item) => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 12px', borderRadius: 8, marginBottom: 2, cursor: 'pointer',
            background: item.active ? `rgba(44,254,204,0.1)` : 'transparent',
            borderLeft: item.active ? `2px solid ${C.swift}` : '2px solid transparent',
          }}>
            <span style={{ fontSize: 14, color: item.active ? C.swift : C.muted, width: 16, textAlign: 'center' }}>
              {item.icon}
            </span>
            <span style={{
              fontSize: 13, color: item.active ? C.swift : C.muted,
              fontWeight: item.active ? 500 : 400,
            }}>
              {item.label}
            </span>
          </div>
        ))}

        {/* Sub-nav under Agent Guard */}
        <div style={{ marginLeft: 38, marginTop: 2 }}>
          {['Fleet', 'Definitions', 'Policies'].map((sub, i) => (
            <div key={sub} style={{
              fontSize: 12, color: i === 0 ? C.text : C.muted,
              padding: '7px 10px', borderRadius: 6, cursor: 'pointer',
              background: i === 0 ? C.faint : 'transparent',
            }}>
              {sub}
            </div>
          ))}
        </div>
      </nav>

      {/* User footer */}
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

// ── Status summary bar ─────────────────────────────────────────────────────────
const SUMMARY = [
  { status: 'healthy'     as Status, count: 12 },
  { status: 'degraded'    as Status, count: 2  },
  { status: 'stopped'     as Status, count: 1  },
  { status: 'unreachable' as Status, count: 1  },
]

function SummaryBar({ onFilter, active }: { onFilter: (s: Status | null) => void; active: Status | null }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '12px 20px', borderRadius: 10,
      background: C.surface, border: `1px solid ${C.borderSubtle}`,
      marginBottom: 16,
    }}>
      {SUMMARY.map(({ status, count }) => {
        const { color, bg } = STATUS_CONFIG[status]
        const isActive = active === status
        return (
          <button
            key={status}
            onClick={() => onFilter(isActive ? null : status)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '5px 14px', borderRadius: 20, border: 'none',
              background: isActive ? bg : 'rgba(255,255,255,0.04)',
              color: isActive ? color : C.muted,
              cursor: 'pointer', fontSize: 13, fontWeight: isActive ? 600 : 400,
              outline: isActive ? `1px solid ${color}30` : 'none',
              transition: 'all 0.15s',
            }}
          >
            <Dot status={status} />
            <span style={{ color: isActive ? color : C.text, fontWeight: 500 }}>{count}</span>
            <span style={{ fontSize: 11 }}>{STATUS_CONFIG[status].label.toLowerCase()}</span>
          </button>
        )
      })}
      <div style={{ marginLeft: 'auto', color: C.muted, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.river, display: 'inline-block' }} />
        Total: <strong style={{ color: C.text }}>16</strong> instances
      </div>
    </div>
  )
}

// ── Detail panel ───────────────────────────────────────────────────────────────
function DetailPanel({ inst, onClose }: { inst: Instance; onClose: () => void }) {
  const { color } = STATUS_CONFIG[inst.status]
  const cpuLast = inst.cpu[inst.cpu.length - 1]
  const memLast = inst.mem[inst.mem.length - 1]
  const latLast = inst.lat[inst.lat.length - 1]

  return (
    <div style={{
      position: 'fixed', right: 0, top: 0, bottom: 0, width: 440,
      background: C.surface, borderLeft: `1px solid ${C.border}`,
      display: 'flex', flexDirection: 'column', zIndex: 100,
      boxShadow: '-16px 0 48px rgba(0,0,0,0.5)',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px', borderBottom: `1px solid ${C.borderSubtle}`,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <StatusBadge status={inst.status} />
          </div>
          <div style={{ fontFamily: "'DM Mono', 'ABC Diatype Mono', monospace", fontSize: 13, color: C.text, fontWeight: 500 }}>
            {inst.id}
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
            Last heartbeat: {inst.lastSeen}
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', color: C.muted,
          cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 4,
        }}>✕</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        {/* Agent info */}
        <Section label="Agent Definition">
          <Row label="Agent" value={`${inst.agent} ${inst.agentVer}`} />
          <Row label="Digest" value={inst.agentDigest} mono />
          <Row label="Guard version" value={inst.guardVer} mono />
          <Row label="Uptime" value={inst.uptime} />
        </Section>

        {/* 24h sparklines */}
        <Section label="24h Health">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <SparkRow label="CPU" value={`${cpuLast}%`} values={inst.cpu} color={C.river} />
            <SparkRow label="Memory" value={`${memLast}%`} values={inst.mem} color={C.jade} />
            <SparkRow label="Latency" value={`${latLast}ms`} values={inst.lat}
              color={latLast > 200 ? C.degraded : latLast > 100 ? C.jade : C.swift} />
          </div>
        </Section>

        {/* MCP servers */}
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
                  <div style={{ fontSize: 11, color: C.muted, fontFamily: 'monospace' }}>
                    :{8080 + i}
                  </div>
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

        {/* Policy sync */}
        <Section label="Policy Sync">
          <div style={{
            padding: '10px 14px', borderRadius: 8,
            background: inst.policySynced ? 'rgba(44,254,204,0.05)' : 'rgba(245,166,35,0.08)',
            border: `1px solid ${inst.policySynced ? 'rgba(44,254,204,0.15)' : 'rgba(245,166,35,0.2)'}`,
          }}>
            {inst.policySynced ? (
              <div style={{ color: C.swift, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>✓</span> All policies synced
              </div>
            ) : (
              <div>
                <div style={{ color: C.degraded, fontSize: 12, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>⚠</span> Policy drift detected
                </div>
                <div style={{ fontSize: 11, color: C.muted, fontFamily: 'monospace', lineHeight: 1.6 }}>
                  {inst.policyDrift}
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* Audit sync */}
        <Section label="Audit Sync">
          <Row label="Pending bundles" value={inst.auditPending === 0 ? 'Synced' : `${inst.auditPending} pending`}
            valueColor={inst.auditPending === 0 ? C.swift : inst.auditPending > 5 ? C.unreachable : C.degraded} />
          <Row label="Last sync" value={inst.auditPending === 0 ? inst.lastSeen : '—'} />
        </Section>
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
        color: C.river, textTransform: 'uppercase', marginBottom: 12,
      }}>
        {label}
      </div>
      {children}
    </div>
  )
}

function Row({ label, value, mono, valueColor }: {
  label: string; value: string; mono?: boolean; valueColor?: string
}) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      padding: '6px 0', borderBottom: `1px solid ${C.borderSubtle}`,
    }}>
      <span style={{ fontSize: 12, color: C.muted }}>{label}</span>
      <span style={{
        fontSize: 12, color: valueColor || C.text, textAlign: 'right', maxWidth: 240,
        wordBreak: 'break-all',
        fontFamily: mono ? "'DM Mono', 'ABC Diatype Mono', monospace" : 'inherit',
      }}>
        {value}
      </span>
    </div>
  )
}

function SparkRow({ label, value, values, color }: {
  label: string; value: string; values: number[]; color: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 11, color: C.muted, width: 56, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1 }}>
        <Sparkline values={values} color={color} width={180} height={28} />
      </div>
      <span style={{ fontSize: 12, color, width: 48, textAlign: 'right', fontFamily: 'monospace', flexShrink: 0 }}>
        {value}
      </span>
    </div>
  )
}

// ── Table ──────────────────────────────────────────────────────────────────────
const COLS = [
  { key: 'id',     label: 'Instance ID',      width: 200 },
  { key: 'status', label: 'Status',           width: 130 },
  { key: 'agent',  label: 'Agent Definition', width: 170 },
  { key: 'ver',    label: 'Version',          width: 80  },
  { key: 'uptime', label: 'Uptime',           width: 90  },
  { key: 'seen',   label: 'Last Seen',        width: 110 },
  { key: 'mcp',    label: 'MCP Servers',      width: 120 },
  { key: 'policy', label: 'Policy Sync',      width: 90  },
  { key: 'audit',  label: 'Audit Sync',       width: 90  },
  { key: 'health', label: 'Health (CPU · Mem · Latency)', width: 220 },
]

function FleetTable({ instances, selected, onSelect }: {
  instances: Instance[]
  selected: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div style={{
      background: C.surface, borderRadius: 10,
      border: `1px solid ${C.borderSubtle}`, overflow: 'hidden',
    }}>
      {/* Table header */}
      <div style={{
        display: 'flex', borderBottom: `1px solid ${C.border}`,
        background: C.surfaceHigh,
      }}>
        {COLS.map(col => (
          <div key={col.key} style={{
            width: col.width, flexShrink: 0, padding: '10px 14px',
            fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
            color: C.muted, textTransform: 'uppercase', userSelect: 'none',
          }}>
            {col.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      {instances.map((inst, i) => {
        const isSelected = selected === inst.id
        const isLast = i === instances.length - 1
        return (
          <div
            key={inst.id}
            onClick={() => onSelect(inst.id)}
            style={{
              display: 'flex', alignItems: 'center',
              borderBottom: isLast ? 'none' : `1px solid ${C.borderSubtle}`,
              background: isSelected
                ? 'rgba(44,254,204,0.05)'
                : inst.status === 'unreachable'
                  ? 'rgba(255,77,109,0.03)'
                  : inst.status === 'stopped'
                    ? 'rgba(107,123,122,0.04)'
                    : 'transparent',
              cursor: 'pointer',
              outline: isSelected ? `1px solid rgba(44,254,204,0.2)` : 'none',
              outlineOffset: '-1px',
              transition: 'background 0.1s',
            }}
          >
            {/* Instance ID */}
            <div style={{ width: 200, flexShrink: 0, padding: '12px 14px' }}>
              <span style={{
                fontFamily: "'DM Mono', 'ABC Diatype Mono', monospace",
                fontSize: 12, color: isSelected ? C.swift : C.text,
                textDecoration: 'underline', textDecorationColor: 'rgba(44,254,204,0.25)',
                cursor: 'pointer',
              }}>
                {inst.id}
              </span>
            </div>

            {/* Status */}
            <div style={{ width: 130, flexShrink: 0, padding: '12px 14px' }}>
              <StatusBadge status={inst.status} />
            </div>

            {/* Agent Definition */}
            <div style={{ width: 170, flexShrink: 0, padding: '12px 14px' }}>
              <div style={{ fontSize: 12, color: C.text }}>{inst.agent}</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: 'monospace', marginTop: 2 }}>
                {inst.agentVer}
              </div>
            </div>

            {/* Guard Version */}
            <div style={{ width: 80, flexShrink: 0, padding: '12px 14px' }}>
              <span style={{
                fontFamily: "'DM Mono', 'ABC Diatype Mono', monospace",
                fontSize: 11, color: inst.guardVer === '0.8.9' ? C.degraded : C.muted,
              }}>
                {inst.guardVer}
              </span>
            </div>

            {/* Uptime */}
            <div style={{ width: 90, flexShrink: 0, padding: '12px 14px', fontSize: 12, color: C.muted }}>
              {inst.uptime}
            </div>

            {/* Last Seen */}
            <div style={{ width: 110, flexShrink: 0, padding: '12px 14px', fontSize: 12, color: C.muted }}>
              {inst.lastSeen}
            </div>

            {/* MCP */}
            <div style={{ width: 120, flexShrink: 0, padding: '12px 14px' }}>
              <MCPCell mcp={inst.mcp} status={inst.status} />
            </div>

            {/* Policy */}
            <div style={{ width: 90, flexShrink: 0, padding: '12px 14px' }}>
              <PolicyCell synced={inst.policySynced} drift={inst.policyDrift} />
            </div>

            {/* Audit */}
            <div style={{ width: 90, flexShrink: 0, padding: '12px 14px' }}>
              <AuditCell pending={inst.auditPending} />
            </div>

            {/* Health sparklines */}
            <div style={{ width: 220, flexShrink: 0, padding: '10px 14px' }}>
              <HealthCell inst={inst} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Main view ──────────────────────────────────────────────────────────────────
export default function AgentGuardFleet() {
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

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg, fontFamily: "'ABC Diatype Variable', 'Atkinson Hyperlegible', system-ui, sans-serif" }}>
      {/* Main content */}
      <main style={{
        flex: 1, padding: '28px 32px',
        minWidth: 0, transition: 'margin-right 0.2s',
        marginRight: selectedInst ? 440 : 0,
      }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 12, color: C.muted }}>
          <span>Jozu Hub</span>
          <span style={{ opacity: 0.4 }}>›</span>
          <span>Agent Guard</span>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: C.text }}>Fleet</span>
        </div>

        {/* Page heading */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
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
            }}>
              Export
            </button>
            <button style={{
              padding: '8px 16px', borderRadius: 7, border: 'none',
              background: C.swift, color: C.bg, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>
              Register Instance
            </button>
          </div>
        </div>

        {/* Summary bar */}
        <SummaryBar onFilter={setFilterStatus} active={filterStatus} />

        {/* Search + filters */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 340 }}>
            <span style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              color: C.muted, fontSize: 13, pointerEvents: 'none',
            }}>⌕</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by instance ID or agent…"
              style={{
                width: '100%', padding: '8px 12px 8px 32px', borderRadius: 7,
                background: C.surface, border: `1px solid ${C.borderSubtle}`,
                color: C.text, fontSize: 12, outline: 'none',
              }}
            />
          </div>
          <div style={{ fontSize: 12, color: C.muted, marginLeft: 'auto' }}>
            {filtered.length} of {INSTANCES.length} instances
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <FleetTable
            instances={filtered}
            selected={selectedId}
            onSelect={id => setSelectedId(prev => prev === id ? null : id)}
          />
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex', gap: 20, marginTop: 14, alignItems: 'center',
          fontSize: 11, color: C.muted,
        }}>
          <span>Health sparklines:</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 16, height: 2, background: C.river, display: 'inline-block', borderRadius: 2 }} />
            CPU
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 16, height: 2, background: C.jade, display: 'inline-block', borderRadius: 2 }} />
            Memory
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 16, height: 2, background: C.swift, display: 'inline-block', borderRadius: 2 }} />
            Latency
          </span>
          <span style={{ marginLeft: 'auto' }}>Click any row to open instance detail</span>
        </div>
      </main>

      {/* Detail panel */}
      {selectedInst && (
        <DetailPanel inst={selectedInst} onClose={() => setSelectedId(null)} />
      )}
    </div>
  )
}
