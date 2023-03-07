import React, { useState, useEffect, useContext } from 'react'
import { Grid, Container, Pagination } from '@mui/material'
import BlogCard from '../../componets/BlogCard'
import { motion } from 'framer-motion'
import api from '../../utils/fetching'
import { GlobalAuth } from '../../componets/UserContext/Provider'

const Blog = () => {
  const [items, setItems] = useState([])
  const [page, setpage] = useState(1)
  const [number, setnumber] = useState(1)
  const { dispatch } = useContext(GlobalAuth)

    const handelchange = (Page) => {
      setpage(Page)
      window.scroll(0, 0)
    }
  useEffect(() => {
    document.title = 'المنشورات'
    const getBlog = async () => {
      dispatch({ type: 'start_loading' })
      try {
        let { data } = await api.get(`api/blog/?page=${page}`)
        setItems(data?.results)
        setnumber(data?.total_pages)
        dispatch({ type: 'end_loading' })
      } catch (error) {
        dispatch({ type: 'end_loading' })
        dispatch({
          type: 'alert',
          payload: {
            open: true,
            severity: 'error',
            message: error?.response?.statusText,
          },
        })
      }
    }
    getBlog()
  }, [page])

  return (
    <>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      >
        <Container sx={{ marginTop: 5 }}>
          <Grid container spacing={5}>
            {items.map((post) => (
              <Grid key={post.id} item xs={12} md={6} lg={4}>
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>
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
                count={number}
                color='secondary'
              />
            </div>
          </div>
        </Container>
      </motion.div>
    </>
  )
}

export default Blog
