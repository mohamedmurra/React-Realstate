
import ReplyIcon from '@mui/icons-material/Reply'
import React, {  useContext } from 'react'
import ComentMSG from './Cform'
import { Typography, Container, Avatar, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import { GlobalAuth } from '../../componets/UserContext/Provider'
import moment from 'moment'

const url = process.env.REACT_APP_POINT

const Comment = ({ com, replays, proper }) => {
  const {
    state: { user, showComent },
    dispatch,
  } = useContext(GlobalAuth)
  return (
    <Container style={{ marginTop: 25 }}>
      <Box display='flex' flexDirection='row'>
        <Avatar
          style={{ width: 50, height: 50 }}
          src={`${url}${com.user.image}`}
        />
        <Box sx={{ flexDirection: 'column', marginLeft: 1 }}>
          <Typography component='p' variant='h6'>
            {com.user.username}
          </Typography>
          <Typography component='p' variant='body2'>
            {moment(com.created).format('yyyy-mm-dd H:mm:ss')}
          </Typography>
        </Box>
      </Box>
      <p style={{ marginLeft: 10, marginTop: 5 }}>
        {com.messaage}
        {user && replays && (
          <IconButton onClick={() => dispatch({ type: 'show' })}>
            <ReplyIcon style={{ fontSize: '1.5rem' }} />
          </IconButton>
        )}
      </p>
      {showComent && <ComentMSG Proper={proper} parent={com.id} />}
      {replays?.length > 0 && (
        <div className='reply'>
          {replays?.map((i) => (
            <Comment key={i.id} com={i} />
          ))}
        </div>
      )}
    </Container>
  )
}
export default Comment
