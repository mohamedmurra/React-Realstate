import React from 'react'
import {Card,CardHeader,CardMedia,Typography} from '@mui/material'
import {Link} from 'react-router-dom'

const url = process.env.REACT_APP_POINT
const ImgApi = process.env.REACT_APP_IMAGE_URL

const BlogCard = ({post}) => {
  return (
    <>
      <Card style={{ margin: 10 }} elevation={5}>
        <CardMedia
          component='img'
          height='350'
          image={`${ImgApi}${post.image}`}
          alt={post.title}
        />
        <div className='catagory'>
          <Typography style={{ marginTop: 15, marginLeft: 10 }}>
            {post.catagory['name']}
          </Typography>
        </div>
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to={`/blog-detail/${post.slug}`}
        >
          <CardHeader
            title={post.title}
            subheader={`By ${post.auther['username']}`}
          />
        </Link>
      </Card>
    </>
  )
}

export default BlogCard
