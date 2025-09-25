import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'

type CellularAutomatonProps = {
  rule: number
  max_rows: number
}

const NUM_COLS = 256

function createRandomRow(columns: number): number[] {
  const row: number[] = new Array(columns)
  for (let i = 0; i < columns; i++) {
    row[i] = Math.random() < 0.5 ? 0 : 1
  }
  return row
}

function computeNextRow(previousRow: number[], rule: number): number[] {
  const columns = previousRow.length
  const nextRow: number[] = new Array(columns)

  for (let i = 0; i < columns; i++) {
    const left = previousRow[(i - 1 + columns) % columns]
    const center = previousRow[i]
    const right = previousRow[(i + 1) % columns]
    const neighborhood = (left << 2) | (center << 1) | right
    const bit = (rule >> neighborhood) & 1
    nextRow[i] = bit
  }

  return nextRow
}

export default function CellularAutomaton({ rule, max_rows }: CellularAutomatonProps) {
  const [rows, setRows] = useState<number[][]>(() => [createRandomRow(NUM_COLS)])
  const [dimensions, setDimensions] = useState<{
    cellSize: number
    width: number
    height: number
  } | null>(null)

  const intervalRef = useRef<number | null>(null)
  const safeRule = useMemo(() => {
    const r = Math.floor(rule)
    if (Number.isNaN(r)) return 0
    return Math.max(0, Math.min(255, r))
  }, [rule])

  // Measure on mount and update on window resize without resetting rows
  useEffect(() => {
    const computeDimensions = () => {
      const measuredWidth = window.innerWidth
      const cellSize = measuredWidth / NUM_COLS
      const height = cellSize * max_rows
      setDimensions({ cellSize, width: measuredWidth, height })
    }
    computeDimensions()
    window.addEventListener('resize', computeDimensions)
    return () => window.removeEventListener('resize', computeDimensions)
  }, [max_rows])

  // Evolve every second
  useEffect(() => {
    if (!dimensions) return
    if (rows.length === 0) return

    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
    }

    const id = window.setInterval(() => {
      setRows(prev => {
        const last = prev[prev.length - 1]
        const next = computeNextRow(last, safeRule)
        const updated = prev.length >= max_rows ? [...prev.slice(1), next] : [...prev, next]
        return updated
      })
    }, 1000)

    intervalRef.current = id
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [dimensions, safeRule, max_rows, rows.length])

  const containerStyle = useMemo<CSSProperties>(() => {
    if (!dimensions) return { width: '100%', height: 0 }
    return {
      width: '100vw',
      height: `${dimensions.height}px`,
      marginLeft: 'calc(-50vw + 50%)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      opacity: 0.1,
    }
  }, [dimensions])

  if (!dimensions) return null

  return (
    <div style={containerStyle} aria-label={`Cellular automaton (rule ${rule})`}>
      {rows.map((row, rowIdx) => (
        <div
          key={`row-${rowIdx}`}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${NUM_COLS}, ${dimensions.cellSize}px)`,
            lineHeight: 0,
            height: `${dimensions.cellSize}px`,
            width: '100vw',
          }}
        >
          {row.map((cell, colIdx) => (
            <div
              key={`cell-${rowIdx}-${colIdx}`}
              style={{
                width: `${dimensions.cellSize}px`,
                height: `${dimensions.cellSize}px`,
                backgroundColor: cell === 1 ? '#8b4513' : 'transparent',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}


