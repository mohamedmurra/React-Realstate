import { Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import { GlobalAuth } from '../../componets/UserContext/Provider'

const COLORS = ['#8884d8', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function RoomChart() {
  const {
    state: { rooms },
  } = useContext(GlobalAuth)

  const [costGro, setcostGro] = useState([])

  useEffect(() => {
    let lessThan100k = 0,
      Between100And300k = 0,
      Between300And600k = 0,
      moreThan600k = 0
    rooms.forEach((room) => {
      if (room.price < 100000) return lessThan100k++
      if (room.price <= 300000) return Between100And300k++
      if (room.price <= 600000) return Between300And600k++
      moreThan600k++
    })
    setcostGro([
      { name: 'less Than 100k', gty: lessThan100k },
      { name: 'Between 100k&300k', gty: Between100And300k },
      { name: 'Between 300k&600k', gty: Between300And600k },
      { name: 'More Than 600k', gty: moreThan600k },
    ])
  }, [rooms])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
      }}
    >
      <PieChart width={200} height={200}>
        <Pie
          data={costGro}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill='#82ca9d'
          dataKey='gty'
        >
          {costGro.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Stack gap={3}>
        <Typography variant='h4'>Property Price</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {COLORS.map((colo, i) => (
            <Stack key={colo} alignItems='center' spacing={1}>
              <Box sx={{ width: 20, height: 20, backgroundColor: colo }} />
              <Typography variant='body2' sx={{ opacity: 0.7 }}>
                {costGro[i]?.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  )
}

export default RoomChart
