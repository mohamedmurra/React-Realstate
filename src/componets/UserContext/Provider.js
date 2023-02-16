import React from 'react'
import { createContext, useReducer } from 'react'
import Reducer from './reducer'

const initialState = {
  user: null,
  openLoggedIn: false,
  loading: false,
  isAlert: { open: false, severity: 'info', message: '' },
  detail: {
    aria: '',
    property_type: '',
    building_type: '',
    title: '',
    price: 0,
    description: '',
    num_rooms: 0,
    rent_type: '',
    space: 0,
    slug: '',
    status: true,
    cover: null,
    bathrooms: 0,
    Agent: '',
    long: 0,
    lati: 0,
  },
  blog: {
    title: '',
    image: null,
    description: '',
    catagory: '',
    auther: '',
    slug: '',
  },
  mapp: {
    long: '',
    lati: '',
  },
  s_comment: '',
  fave: '',
  filter: {
    building_type: '',
    aria: '',
    property_type: '',
    status: true,
    num_rooms: '',
    bathrooms: '',
    page: 1,
    search: '',
    ordering: '',
    min_price: '',
    max_price: '',
  },
  rooms: [],
  users: [],
  buildings: [],
  lucation: [],
  purp: [],
  rent_time: [],
  editing: false,
  blog_editing: false,
  blog_filds: [],
  room_filds: [],
  profile: [],
  OpenProfile: { open: false, imgUri: null },
  propertes: [],
  showComent: false,
  page: 1,
}
export const GlobalAuth = createContext(initialState)

export const GlobalAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <GlobalAuth.Provider value={{ state, dispatch }}>
      {children}
    </GlobalAuth.Provider>
  )
}
