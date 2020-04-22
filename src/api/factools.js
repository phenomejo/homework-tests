
import http from './http'

export default {
  filter (params) {
    return http.get('/filter', params).then((resp) => {
      return resp
    })
  } 
}