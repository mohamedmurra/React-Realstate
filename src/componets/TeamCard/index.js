import React from 'react'
import { Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import agent from '../../assets/agent-1.png'

const TeamCard = ({ member }) => {
  const { image, first_name, last_name, email, phone_number, id, describe } =
    member ? member : {}
  return (
    <Paper style={{ margin: 10 }} elevation={5}>
      <div className='card-box-d'>
        <div className='card-img-d'>
          <img
            src={image ? image : agent}
            alt={email}
            className='img-d img-fluid'
          />
        </div>
        <div className='card-overlay card-overlay-hover'>
          <div className='card-header-d'>
            <div className='card-title-d align-self-center'>
              <h3 className='title-d'>
                <Link to={`/agent-detail/${id}`}>
                  <a href='agent-single.html' className='link-two'>
                    {first_name}
                    <br /> {last_name}
                  </a>
                </Link>
              </h3>
            </div>
          </div>
          <div className='card-body-d'>
            <p className='content-d color-text-a'>{describe ? describe : ''}</p>
            <div className='info-agents color-a'>
              <p>
                <strong>Phone: </strong> {phone_number}
              </p>
              <p>
                <strong>Email: </strong> {email}
              </p>
            </div>
          </div>
          <div className='card-footer-d'>
            <div className='socials-footer d-flex justify-content-center'>
              <ul className='list-inline'>
                <li className='list-inline-item'>
                  <a href='' className='link-one'>
                    <i className='bi bi-facebook' aria-hidden='true'>
                      <FacebookIcon />
                    </i>
                  </a>
                </li>
                <li className='list-inline-item'>
                  <a href='' className='link-one'>
                    <i className='bi bi-twitter' aria-hidden='true'>
                      <TwitterIcon />
                    </i>
                  </a>
                </li>
                <li className='list-inline-item'>
                  <a href='' className='link-one'>
                    <i className='bi bi-instagram' aria-hidden='true'>
                      <InstagramIcon />
                    </i>
                  </a>
                </li>
                <li className='list-inline-item'>
                  <a href='' className='link-one'>
                    <i className='bi bi-linkedin' aria-hidden='true'>
                      <WhatsAppIcon />
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
}

export default TeamCard
