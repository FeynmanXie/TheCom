import { useState } from 'react'
import abyss from '../data/abyss-measurements.json'
import peaks from '../data/above-peaks.json'

const W = 900, H = 280, L = 44, R = 18, T = 18, B = 37
const x = (value: number, min: number, max: number) => L + ((value - min) / (max - min)) * (W - L - R)
const y = (value: number, min: number, max: number) => T + (1 - (value - min) / (max - min)) * (H - T - B)
const line = (points: { start_s?: number; time?: number; value: number }[], minX: number, maxX: number, minY: number, maxY: number) => points.map((p, i) => `${i ? 'L' : 'M'}${x(p.start_s ?? p.time ?? 0, minX, maxX).toFixed(1)},${y(Math.max(minY, Math.min(maxY, p.value)), minY, maxY).toFixed(1)}`).join(' ')

function Axis({ min, max, ticks, label }: { min: number; max: number; ticks: number[]; label: string }) {
  return <g className="chart-axis">
    <title>{label}</title>
    {ticks.map(tick => <g key={tick}><line x1={x(tick, min, max)} x2={x(tick, min, max)} y1={T} y2={H - B} /><text x={x(tick, min, max)} y={H - 10} textAnchor="middle">{tick}</text></g>)}
  </g>
}

export function AbyssChart() {
  const [metric, setMetric] = useState<'lr_corr' | 'power_above_500_fraction' | 'mid_dbfs'>('lr_corr')
  const minY = metric === 'mid_dbfs' ? -90 : 0
  const maxY = metric === 'mid_dbfs' ? 0 : 1
  const data = abyss.map(p => ({ start_s: p.start_s, value: p[metric] }))
  const markers = [
    [186, 'STEREO → MONO'], [191.28, '>500 Hz DROP'], [192.96, 'WOMAN'], [212.52, 'RESET / LIGHTHOUSE']
  ] as const
  return <div className="chart-block">
    <div className="chart-top"><div><span className="eyebrow">MEASURED / 40 MS SOURCE WINDOWS</span><h3>ABYSS · the sound changes first</h3></div><label>Metric<select value={metric} onChange={e => setMetric(e.target.value as typeof metric)}><option value="lr_corr">Left / right correlation</option><option value="power_above_500_fraction">Energy above 500 Hz · fraction</option><option value="mid_dbfs">Mid RMS · dBFS</option></select></label></div>
    <div className="chart-scroll"><svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`ABYSS ${metric} from 178 to 218 seconds, with five marked events`}>
      <Axis min={178} max={218} ticks={[180, 186, 192, 198, 204, 210, 216]} label="source time · s" />
      {[minY, (minY + maxY) / 2, maxY].map(v => <g className="chart-y" key={v}><line x1={L} x2={W - R} y1={y(v, minY, maxY)} y2={y(v, minY, maxY)} /><text x={L - 7} y={y(v, minY, maxY) + 4} textAnchor="end">{v.toFixed(metric === 'mid_dbfs' ? 0 : 1)}</text></g>)}
      <path className="chart-line" d={line(data, 178, 218, minY, maxY)} />
      {markers.map(([time, label], i) => <g className="chart-marker" key={label}><line x1={x(time, 178, 218)} x2={x(time, 178, 218)} y1={T} y2={H-B} /><circle cx={x(time, 178, 218)} cy={T+4} r="3" /><text x={x(time, 178, 218) + (i > 2 ? -5 : 5)} y={T + 18 + (i % 2) * 15} textAnchor={i > 2 ? 'end' : 'start'}>{label}</text></g>)}
    </svg></div>
    <div className="chart-legend"><span>Original measured values, no smoothing</span><span>Source: evidence/post-com2603/audio-forensics/abyss_40ms_178_218.csv</span></div>
    <p className="chart-caveat">The woman first becomes clearly visible 6.96 s after the strong stereo change. The 212.48 s near-silent frame precedes the sea→lighthouse cut by 40 ms. Signal values do not identify the sound source.</p>
  </div>
}

export function AboveChart() {
  const [band, setBand] = useState('200-350')
  const data = peaks.filter(p => p.band === band).map(p => ({ time: p.time, value: p.hz }))
  const ranges: Record<string, [number, number]> = { '20-80': [40, 80], '80-200': [100, 160], '200-350': [200, 350], '350-700': [350, 700] }
  const [minY, maxY] = ranges[band]
  return <div className="chart-block chart-block--above">
    <div className="chart-top"><div><span className="eyebrow">MEASURED / 2 S SOURCE WINDOWS</span><h3>ABOVE · tonal trajectories</h3></div><label>Frequency band<select value={band} onChange={e => setBand(e.target.value)}><option value="20-80">20–80 Hz · low family</option><option value="80-200">80–200 Hz · harmonic</option><option value="200-350">200–350 Hz · moving line</option><option value="350-700">350–700 Hz · upper line</option></select></label></div>
    <div className="chart-scroll"><svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`ABOVE strongest measured peak in ${band} Hz band across the work`}>
      <Axis min={0} max={142} ticks={[0, 20, 40, 60, 80, 100, 120, 140]} label="source time · s" />
      {[minY, (minY + maxY)/2, maxY].map(v => <g className="chart-y" key={v}><line x1={L} x2={W-R} y1={y(v,minY,maxY)} y2={y(v,minY,maxY)} /><text x={L-7} y={y(v,minY,maxY)+4} textAnchor="end">{v.toFixed(0)}</text></g>)}
      <path className="chart-line" d={line(data,0,142,minY,maxY)} />
      {data.map((p,i) => <circle className="chart-dot" key={i} cx={x(p.time,0,142)} cy={y(Math.max(minY,Math.min(maxY,p.value)),minY,maxY)} r="2" />)}
      {[60.5,122.5].map(t => <g className="chart-marker" key={t}><line x1={x(t,0,142)} x2={x(t,0,142)} y1={T} y2={H-B} /><text x={x(t,0,142)+5} y={T+16}>{t} s</text></g>)}
    </svg></div>
    <div className="chart-legend"><span>Peak frequency · Hz</span><span>Source: evidence/post-com2603/audio-forensics/above_band_peaks_2s.csv</span></div>
    <p className="chart-caveat">The ~63–65 Hz family persists while a higher ~225–310 Hz line moves. The roughly doubled ~450–620 Hz line is consistent with layered pitched material. The instrument and original playback speed are unresolved.</p>
  </div>
}
