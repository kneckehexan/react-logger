const reqConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export default reqConfig