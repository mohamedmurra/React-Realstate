import React, { useState, useEffect, useContext } from 'react'
import { Grid, Container } from '@mui/material'
import BlogCard from '../../componets/BlogCard'
import { motion } from 'framer-motion'
import api from '../../utils/fetching'
import Paginate from '../../componets/Pagintion'
import { GlobalAuth } from '../../componets/UserContext/Provider'

const Blog = () => {
  const [items, setItems] = useState([])
  const [page, setpage] = useState(1)
  const [number, setnumber] = useState(1)
  const { dispatch } = useContext(GlobalAuth)

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

  useEffect(() => {
    document.title = 'المنشورات'
    getBlog()
  }, [])

  return (
    <>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      >
        <Container sx={{ marginTop: 5, minHeight: '79vh' }}>
          <Grid container spacing={5}>
            {items.map((post) => (
              <Grid key={post.id} item xs={12} md={6} lg={4}>
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>
          <Paginate Page={number} setPage={setpage} />
        </Container>
      </motion.div>
    </>
  )
}

export default Blog
