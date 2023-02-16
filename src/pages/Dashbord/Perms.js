export  const HasPerm = (user) => {
  if (user.user_type === 'ADMIN') return true
  else if (user.user_type === 'STAFF') return true
  return false
}
