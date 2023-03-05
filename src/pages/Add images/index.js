import {
  Paper,
  Button,
  Container,
  Typography,
  ImageList,
  ImageListItem,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  ImageListItemBar,
  IconButton,
} from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import { useDropzone } from 'react-dropzone'
import usePrivateRoute from '../../hooks.js/usePrivateRoute'
import { Cancel, Send } from '@mui/icons-material'


const ImgApi = process.env.REACT_APP_IMAGE_URL

const AddImages = ({ link, setselected }) => {
  const { dispatch } = useContext(GlobalAuth)
  const [propert, setpropert] = useState([])
  const [ids, setids] = useState(null)
  const [images, setimages] = useState([])
  const [files, setfiles] = useState([])
  const Private = usePrivateRoute()
  useEffect(() => {
    setselected(link)
  }, [])

  useEffect(() => {
    document.title = 'أضافة صور للعقار'
    getpro()
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const thumbs = files.map((file) => (
    <ImageListItem rows={1} cols={1} key={file.name}>
      <img
        style={{ height: '100%' }}
        src={file.preview}
        loading='lazy'
        alt=''
        onLoad={() => {
          URL.revokeObjectURL(file.preview)
        }}
      />
    </ImageListItem>
  ))

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setfiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const handelSubmit = () => {
    for (let i = 0; i < files.length; i++) {
      const sendimg = async () => {
        dispatch({ type: 'start_loading' })
        try {
          await Private.post(
            'api/home/add-images/',
            { proper: ids, image: files[i] },
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          dispatch({ type: 'end_loading' })
          dispatch({
            type: 'alert',
            payload: {
              open: true,
              severity: 'success',
              message: 'images uploaded Succsesfully',
            },
          })
          setfiles([])
          setids(null)
        } catch (error) {
          dispatch({ type: 'end_loading' })
          dispatch({
            type: 'alert',
            payload: { open: true, severity: 'error', message: error?.message },
          })
        }
      }
      if (files.length > 9) {
        dispatch({
          type: 'alert',
          payload: {
            open: true,
            severity: 'error',
            message: 'to mush images try upload less than 10',
          },
        })
      } else {
        sendimg()
      }
    }
  }

  const getimages = async () => {
    try {
      const { data } = await Private.get(`api/home/admin/get_images/${ids}/`)
      setimages(data)
    } catch (error) {
      dispatch({
        type: 'alert',
        payload: { open: true, severity: 'error', message: error?.message },
      })
    }
  }

  const getpro = async () => {
    try {
      const { data } = await Private.get('api/home/admin/images/')
      setpropert(data)
    } catch (error) {
      dispatch({
        type: 'alert',
        payload: { open: true, severity: 'error', message: error?.message },
      })
    }
  }
  const deleteImg = async (id) => {
    try {
      await Private.delete(`viewset/images/${id}`)
      setimages((prev) => [...prev.filter((p) => p.id !== id)])
    } catch (error) {
      dispatch({
        type: 'alert',
        payload: { open: true, severity: 'error', message: error?.message },
      })
    }
  }

  useEffect(() => {
    if (ids) {
      getimages()
    }
  }, [ids])

  return (
    <Container sx={{ minHeight: '73vh' }}>
      <Typography
        variant='h5'
        component='h5'
        sx={{
          textAlign: 'center',
          mb: 3,
        }}
      >
        Add images
      </Typography>
      <Box
        sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
      >
        <FormControl sx={{ width: 300, mb: 5 }}>
          <InputLabel>Choose Property</InputLabel>
          <Select
            label='Type'
            variant='filled'
            value={ids}
            onChange={(e) => {
              setids(e.target.value)
            }}
            required
          >
            {propert?.map((b) => (
              <MenuItem key={b.id} value={b.id}>
                {b.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Paper
        sx={{
          color: '#bdbdbd',
          width: '80%',
          cursor: 'pointer',
          background: '#fafafa',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
        }}
      >
        <div {...getRootProps({ className: 'dropzone' })}>
          <div>
            <input {...getInputProps()} />
            <p> all type of images will be accepted</p>
            {isDragActive ? (
              <h6 style={{ color: 'orangered' }}>Drop files here ...</h6>
            ) : (
              <h6>Drag and drop files or Click here ....</h6>
            )}
          </div>
        </div>
      </Paper>
      <ImageList
        rowHeight={250}
        sx={{
          '&.MuiImageList-root': {
            gridTemplateColumns:
              'repeat(auto-fill,minmax(250px,1fr))!important',
          },
          mt: 2,
        }}
      >
        {thumbs}
      </ImageList>
      {files.length > 0 && (
        <Stack
          direction='row'
          sx={{ alignItems: 'center', justifyContent: 'center', gap: 2 }}
        >
          <Button
            variant='contained'
            endIcon={<Send />}
            color='primary'
            onClick={handelSubmit}
          >
            Add
          </Button>
          <Button
            variant='contained'
            endIcon={<Cancel />}
            color='primary'
            onClick={() => setfiles([])}
          >
            Cancel
          </Button>
        </Stack>
      )}
      {ids && images.length > 0 && (
        <>
          <Typography
            variant='h5'
            component='h5'
            sx={{
              textAlign: 'center',
              mb: 3,
            }}
          >
            update images
          </Typography>
          <ImageList
            rowHeight={250}
            sx={{
              '&.MuiImageList-root': {
                gridTemplateColumns:
                  'repeat(auto-fill,minmax(250px,1fr))!important',
              },
            }}
          >
            {images.map((img) => (
              <ImageListItem rows={1} cols={1} key={img.id}>
                <img
                  style={{ height: '100%' }}
                  src={`${ImgApi}${img.image}`}
                  loading='lazy'
                  alt='images'
                />
                <ImageListItemBar
                  position='top'
                  sx={{
                    background:
                      'Linear-gradient(to bottom,rgba(0,0,0,0.7)0%,rgba(0,0,0,0.3)70%,rgba(0,0,0,)100%,',
                  }}
                  actionIcon={
                    <IconButton
                      onClick={() => deleteImg(img.id)}
                      sx={{ color: 'white' }}
                    >
                      <Cancel />
                    </IconButton>
                  }
                ></ImageListItemBar>
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}
    </Container>
  )
}

export default AddImages
