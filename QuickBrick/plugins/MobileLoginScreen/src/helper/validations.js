export const validateEmail = email => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return ''
  }
  return 'Invalid Email'
}

export const validateNotEmpty = value => {
  return value && value.length > 0 ? '' : 'This field cannot be empty'
}
