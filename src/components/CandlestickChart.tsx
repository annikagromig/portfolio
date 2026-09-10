import { useState, useMemo } from 'react'

// ── Brand tokens ───────────────────────────────────────────────────────────────
const C = {
  bg: '#051714',
  surface: '#081e1a',
  surfaceHigh: '#0d2821',
  border: 'rgba(44,254,204,0.10)',
  borderSubtle: 'rgba(255,255,255,0.06)',
  swift: '#2CFECC',
  jade: '#5BE6B7',
  muted: 'rgba(236,236,236,0.45)',
  faint: 'rgba(236,236,236,0.08)',
  text: '#ececec',
  bull: '#2CFECC',
  bullBg: 'rgba(44,254,204,0.15)',
  bear: '#FF4D6D',
  bearBg: 'rgba(255,77,109,0.15)',
  grid: 'rgba(255,255,255,0.05)',
} as const

// ── Types ──────────────────────────────────────────────────────────────────────
interface Candle {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

type Range = '1W' | '1M' | '3M' | '6M' | '1Y'

// ── Mock data ──────────────────────────────────────────────────────────────────
function generateCandles(count: number, seed: number): Candle[] {
  const candles: Candle[] = []
  let price = 100 + seed * 0.1
  const now = new Date(2026, 3, 1)
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    if (d.getDay() === 0 || d.getDay() === 6) continue
    const volatility = 2 + Math.sin(i * 0.3) * 1.5
    const open = price
    const change = (Math.random() - 0.48) * volatility
    const close = Math.max(open + change, 5)
    const wick = volatility * (0.5 + Math.random() * 0.8)
    const high = Math.max(open, close) + Math.random() * wick
    const low = Math.min(open, close) - Math.random() * wick
    candles.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +Math.max(low, 1).toFixed(2),
      close: +close.toFixed(2),
      volume: Math.floor(50000 + Math.random() * 150000),
    })
    price = close
  }
  return candles
}

const ALL_CANDLES = generateCandles(260, 42)

const RANGE_MAP: Record<Range, number> = { '1W': 5, '1M': 22, '3M': 65, '6M': 130, '1Y': 260 }

// ── Chart component ────────────────────────────────────────────────────────────
const W = 900
const H = 360
const VOLUME_H = 70
const PAD = { top: 24, right: 16, bottom: 32, left: 56 }
const CHART_W = W - PAD.left - PAD.right
const CHART_H = H - PAD.top - PAD.bottom
const VOL_Y = H + 16

function CandlestickSVG({ candles }: { candles: Candle[] }) {
  const [hover, setHover] = useState<number | null>(null)

  const { minLow, maxHigh, maxVol } = useMemo(() => ({
    minLow: Math.min(...candles.map(c => c.low)),
    maxHigh: Math.max(...candles.map(c => c.high)),
    maxVol: Math.max(...candles.map(c => c.volume)),
  }), [candles])

  const priceRange = maxHigh - minLow
  const pad = priceRange * 0.06

  const toY = (v: number) =>
    PAD.top + CHART_H - ((v - (minLow - pad)) / (priceRange + pad * 2)) * CHART_H

  const totalW = W + PAD.left + PAD.right
  const totalH = H + 16 + VOLUME_H + PAD.bottom

  const candleW = Math.max(2, Math.floor((CHART_W / candles.length) * 0.7))
  const step = CHART_W / candles.length

  // Y grid lines
  const yTicks = 5
  const yStep = (priceRange + pad * 2) / yTicks
  const yGridLines = Array.from({ length: yTicks + 1 }, (_, i) => {
    const val = minLow - pad + i * yStep
    return { y: toY(val), label: val.toFixed(1) }
  })

  // X labels — show ~6
  const xLabelStep = Math.max(1, Math.floor(candles.length / 6))
  const xLabels = candles.map((c, i) => ({ ...c, i })).filter((_, i) => i % xLabelStep === 0)

  // Line path (close prices)
  const linePath = candles.map((c, i) => {
    const x = PAD.left + (i + 0.5) * step
    const y = toY(c.close)
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')

  // Gradient stops for line
  const lineGradId = 'lineGrad'
  const areaGradId = 'areaGrad'

  const hCandle = hover !== null ? candles[hover] : null

  return (
    <svg
      viewBox={`0 0 ${totalW} ${totalH}`}
      width="100%"
      style={{ display: 'block' }}
      onMouseLeave={() => setHover(null)}
    >
      <defs>
        <linearGradient id={lineGradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.jade} />
          <stop offset="100%" stopColor={C.swift} />
        </linearGradient>
        <linearGradient id={areaGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.swift} stopOpacity="0.12" />
          <stop offset="100%" stopColor={C.swift} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Y grid */}
      {yGridLines.map(({ y, label }, i) => (
        <g key={i}>
          <line
            x1={PAD.left} y1={y} x2={PAD.left + CHART_W} y2={y}
            stroke={C.grid} strokeWidth={1}
          />
          <text
            x={PAD.left - 8} y={y + 4}
            textAnchor="end" fontSize={11} fill={C.muted}
            fontFamily="'Atkinson Hyperlegible', sans-serif"
          >
            {label}
          </text>
        </g>
      ))}

      {/* X labels */}
      {xLabels.map(({ date, i }) => (
        <text
          key={i}
          x={PAD.left + (i + 0.5) * step} y={H + 14}
          textAnchor="middle" fontSize={11} fill={C.muted}
          fontFamily="'Atkinson Hyperlegible', sans-serif"
        >
          {date}
        </text>
      ))}

      {/* Area fill under line */}
      <path
        d={`${linePath} L ${(PAD.left + (candles.length - 0.5) * step).toFixed(1)} ${(PAD.top + CHART_H).toFixed(1)} L ${(PAD.left + 0.5 * step).toFixed(1)} ${(PAD.top + CHART_H).toFixed(1)} Z`}
        fill={`url(#${areaGradId})`}
      />

      {/* Candles */}
      {candles.map((c, i) => {
        const cx = PAD.left + (i + 0.5) * step
        const isBull = c.close >= c.open
        const color = isBull ? C.bull : C.bear
        const bodyTop = toY(Math.max(c.open, c.close))
        const bodyBot = toY(Math.min(c.open, c.close))
        const bodyH = Math.max(1, bodyBot - bodyTop)
        const isHovered = hover === i

        return (
          <g
            key={i}
            onMouseEnter={() => setHover(i)}
            style={{ cursor: 'crosshair' }}
          >
            {/* hover hit area */}
            <rect
              x={cx - step / 2} y={PAD.top}
              width={step} height={CHART_H}
              fill={isHovered ? 'rgba(255,255,255,0.03)' : 'transparent'}
            />
            {/* wick */}
            <line
              x1={cx} y1={toY(c.high)} x2={cx} y2={toY(c.low)}
              stroke={color} strokeWidth={1.5} opacity={isHovered ? 1 : 0.7}
            />
            {/* body */}
            <rect
              x={cx - candleW / 2} y={bodyTop}
              width={candleW} height={bodyH}
              fill={isBull ? C.bullBg : C.bearBg}
              stroke={color} strokeWidth={1.2}
              opacity={isHovered ? 1 : 0.85}
            />
          </g>
        )
      })}

      {/* Line overlay */}
      <path
        d={linePath}
        fill="none"
        stroke={`url(#${lineGradId})`}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.6}
        pointerEvents="none"
      />

      {/* Volume bars */}
      {candles.map((c, i) => {
        const cx = PAD.left + (i + 0.5) * step
        const isBull = c.close >= c.open
        const vh = Math.max(2, (c.volume / maxVol) * (VOLUME_H - 4))
        return (
          <rect
            key={i}
            x={cx - candleW / 2} y={VOL_Y + (VOLUME_H - vh)}
            width={candleW} height={vh}
            fill={isBull ? C.bull : C.bear}
            opacity={hover === i ? 0.6 : 0.25}
          />
        )
      })}

      {/* Volume label */}
      <text
        x={PAD.left - 8} y={VOL_Y + VOLUME_H / 2 + 4}
        textAnchor="end" fontSize={10} fill={C.muted}
        fontFamily="'Atkinson Hyperlegible', sans-serif"
      >
        VOL
      </text>

      {/* Hover crosshair + tooltip */}
      {hCandle !== null && hover !== null && (() => {
        const cx = PAD.left + (hover + 0.5) * step
        const cy = toY(hCandle.close)
        const isBull = hCandle.close >= hCandle.open
        const ttW = 148
        const ttH = 108
        const ttX = Math.min(cx + 10, totalW - ttW - 4)
        const ttY = Math.max(PAD.top, cy - ttH / 2)
        return (
          <g pointerEvents="none">
            <line x1={cx} y1={PAD.top} x2={cx} y2={H} stroke={C.swift} strokeWidth={0.6} strokeDasharray="3 3" opacity={0.5} />
            <line x1={PAD.left} y1={cy} x2={PAD.left + CHART_W} y2={cy} stroke={C.swift} strokeWidth={0.6} strokeDasharray="3 3" opacity={0.5} />
            <circle cx={cx} cy={cy} r={4} fill={C.swift} opacity={0.9} />
            {/* tooltip */}
            <rect x={ttX} y={ttY} width={ttW} height={ttH} rx={6}
              fill={C.surfaceHigh} stroke={C.border} strokeWidth={1} />
            <text x={ttX + 10} y={ttY + 18} fontSize={11} fill={C.swift} fontWeight="600"
              fontFamily="'Atkinson Hyperlegible', sans-serif">{hCandle.date}</text>
            {([
              ['Open',  hCandle.open.toFixed(2)],
              ['High',  hCandle.high.toFixed(2)],
              ['Low',   hCandle.low.toFixed(2)],
              ['Close', hCandle.close.toFixed(2)],
            ] as [string, string][]).map(([label, val], idx) => (
              <g key={label}>
                <text x={ttX + 10} y={ttY + 36 + idx * 17} fontSize={11} fill={C.muted}
                  fontFamily="'Atkinson Hyperlegible', sans-serif">{label}</text>
                <text x={ttX + ttW - 10} y={ttY + 36 + idx * 17} fontSize={11}
                  fill={isBull ? C.bull : C.bear}
                  textAnchor="end" fontFamily="'Atkinson Hyperlegible', sans-serif">{val}</text>
              </g>
            ))}
          </g>
        )
      })()}
    </svg>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function CandlestickChart() {
  const [range, setRange] = useState<Range>('3M')
  const candles = useMemo(() => ALL_CANDLES.slice(-RANGE_MAP[range]), [range])

  const last = candles[candles.length - 1]
  const first = candles[0]
  const change = last.close - first.open
  const changePct = (change / first.open) * 100
  const isUp = change >= 0

  return (
    <div style={{ background: C.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: 980, fontFamily: "'Atkinson Hyperlegible', sans-serif" }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.swift, boxShadow: `0 0 8px ${C.swift}` }} />
              <span style={{ color: C.muted, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Live Market</span>
            </div>
            <h1 style={{ margin: 0, color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>
              JOZU / Hub
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
              <span style={{ color: C.text, fontSize: 22, fontWeight: 600 }}>{last.close.toFixed(2)}</span>
              <span style={{
                fontSize: 13, fontWeight: 600, padding: '2px 8px', borderRadius: 4,
                background: isUp ? C.bullBg : C.bearBg,
                color: isUp ? C.bull : C.bear,
              }}>
                {isUp ? '+' : ''}{change.toFixed(2)} ({isUp ? '+' : ''}{changePct.toFixed(2)}%)
              </span>
            </div>
          </div>

          {/* Range selector */}
          <div style={{ display: 'flex', gap: 4, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 4 }}>
            {(['1W', '1M', '3M', '6M', '1Y'] as Range[]).map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                style={{
                  background: range === r ? C.surfaceHigh : 'transparent',
                  border: range === r ? `1px solid ${C.border}` : '1px solid transparent',
                  color: range === r ? C.swift : C.muted,
                  borderRadius: 6,
                  padding: '5px 12px',
                  fontSize: 12,
                  fontWeight: range === r ? 600 : 400,
                  cursor: 'pointer',
                  fontFamily: "'Atkinson Hyperlegible', sans-serif",
                  transition: 'all 0.15s',
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Chart card */}
        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: '24px 16px 16px',
          boxShadow: `0 0 40px rgba(44,254,204,0.04)`,
        }}>
          <CandlestickSVG candles={candles} />
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
          {[
            { label: 'Open',        value: candles[candles.length - 1].open.toFixed(2) },
            { label: 'High (range)',  value: Math.max(...candles.map(c => c.high)).toFixed(2) },
            { label: 'Low (range)',   value: Math.min(...candles.map(c => c.low)).toFixed(2) },
            { label: 'Avg Volume',  value: (candles.reduce((a, c) => a + c.volume, 0) / candles.length / 1000).toFixed(0) + 'K' },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: C.surface, border: `1px solid ${C.borderSubtle}`,
              borderRadius: 8, padding: '12px 16px',
            }}>
              <div style={{ color: C.muted, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
              <div style={{ color: C.text, fontSize: 18, fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
