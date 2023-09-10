import { useState, useEffect } from 'react'

function ChartView({ chartData }) {
  return (
    <>
      <section>
        <h1>Chart</h1>
        <canvas id="system-chart"></canvas>
      </section>
    </>
  )
} 

export default ChartView