import React, { useContext } from 'react'
import { Pagination } from '@mui/material'
import { GlobalAuth } from '../UserContext/Provider'

const Paginate = ({ Page, setPage, dpage }) => {
  const { dispatch } = useContext(GlobalAuth)
  const handelchange = (Page) => {
    dispatch({ type: 'update_filter', payload: { page: Page } })
    setPage(Page)
    window.scroll(0, 0)
  }
  return (
    <div
      style={{
        position: 'static',
        bottom: 0,
        zIndex: 200,
        padding: '10px 80px',
        color: 'white',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Pagination
          hidePrevButton
          hideNextButton
          onChange={(e) => handelchange(e.target.textContent)}
          count={Page}
          color='secondary'
        />
      </div>
    </div>
  )
}

export default Paginate
