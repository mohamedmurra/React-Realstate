const Reducer = (state, action) => {
  switch (action.type) {
    case 'update-user':
      return { ...state, user: { ...state.user, ...action.payload } }
    case 'open_login':
      return { ...state, openLoggedIn: true }
    case 'close_login':
      return { ...state, openLoggedIn: false }
    case 'alert':
      return { ...state, isAlert: action.payload }
    case 'start_loading':
      return { ...state, loading: true }
    case 'start_edit':
      return { ...state, editing: true }
    case 'end_edit':
      return { ...state, editing: false }
    case 'start_blog_edit':
      return { ...state, blog_editing: true }
    case 'end_blog_edit':
      return { ...state, blog_editing: false }
    case 'end_loading':
      return { ...state, loading: false }
    case 'update_profile':
      return { ...state, OpenProfile: action.payload }
    case 'update_detail':
      return { ...state, detail: { ...state.detail, ...action.payload } }
    case 'update_blog':
      return { ...state, blog: { ...state.blog, ...action.payload } }
    case 'update_mapp':
      return { ...state, mapp: { ...state.mapp, ...action.payload } }
    case 'comment':
      return { ...state, s_comment: action.payload }
    case 'update_fave':
      return { ...state, fave: action.payload }
    case 'update_propertes':
      return { ...state, propertes: action.payload }
    case 'update_filter':
      return { ...state, filter: { ...state.filter, ...action.payload } }
    case 'update_rooms':
      return { ...state, rooms: action.payload }
    case 'update_users':
      return { ...state, users: action.payload }
    case 'update_buildings':
      return { ...state, buildings: action.payload }
    case 'update_lucation':
      return { ...state, lucation: action.payload }
    case 'update_purp':
      return { ...state, purp: action.payload }
    case 'hide':
      return { ...state, showComent: false }
    case 'show':
      return { ...state, showComent: true }
    case 'set_page':
      return { ...state, page: action.payload }
    case 'updated_blog':
      return {
        ...state,
        blog_filds: { ...state.blog_filds, ...action.payload },
      }
    case 'reset_updated_blog':
      return {
        ...state,
        blog_filds: [],
      }
    case 'reset_profile':
      return {
        ...state,
        profile: [],
      }
    case 'reset_user':
      return {
        ...state,
        user: null,
      }
    case 'updated_room':
      return {
        ...state,
        room_filds: { ...state.room_filds, ...action.payload },
      }
    case 'reset_updated_room':
      return {
        ...state,
        room_filds: [],
      }
    case 'update_rent_time':
      return { ...state, rent_time: action.payload }
    case 'reset_blog':
      return {
        ...state,
        blog: {
          title: '',
          image: null,
          description: '',
          catagory: '',
          auther: '',
          slug: '',
        },
      }
    case 'reset_filter':
      return {
        ...state,
        filter: {
          building_type: '',
          aria: '',
          property_type: '',
          status: true,
          num_rooms: '',
          page: 1,
          search: '',
          ordering: '',
          min_price: '',
          max_price: '',
          bathrooms: '',
        },
      }
    case 'reset_rooms':
      return {
        ...state,
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
          cover: '',
          bathrooms: 0,
          Agent: '',
        },
      }
    case 'updated_profile':
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
      }
    default:
      throw new Error('no matched action type')
  }
}

export default Reducer
