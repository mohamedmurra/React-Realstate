import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { GlobalAuth } from '../../componets/UserContext/Provider'

const months = 4
const today = new Date()
const temData = []

for (let i = 0; i < months; i++) {
  const dates = new Date(
    today.getFullYear(),
    today.getMonth() - (months - (i + 1))
  )
  temData.push({
    dates,
    name: moment(dates).format('MMM YYYY'),
    users: 0,
    rooms: 0,
  })
}

function UsersChart() {
  const [dat, setdata] = useState([])
  const {
    state: { users, rooms },
  } = useContext(GlobalAuth)

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      temData[i].users = 0
    }
    users.forEach((user) => {
      for (let i = 0; i < months; i++) {
        if (moment(temData[i].dates).isSame(user?.date_joined, 'month'))
          return temData[i].users++
      }
    })
    setdata({ ...temData })
  }, [users])

  useEffect(() => {
    for (let i = 0; i < months; i++) {
      temData[i].rooms = 0
    }
    rooms.forEach((room) => {
      for (let i = 0; i < months; i++) {
        if (moment(temData[i].dates).isSame(room?.created, 'month'))
          return temData[i].rooms++
      }
    })
    setdata([...temData])
  }, [rooms])
  return (
    <div style={{ width: '100%', height: 300, minWidth: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          data={dat}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='users'
            stackId='i'
            stroke='#8884d8'
            fill='#8884d8'
          />
          <Area
            type='monotone'
            dataKey='rooms'
            stackId='i'
            stroke='#82ca9d'
            fill='#82ca9d'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default UsersChart
