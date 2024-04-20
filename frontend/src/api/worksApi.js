import {apiService} from './service.js'

export const getWorksList = () => {
  return apiService({
    method:'get',
    url:'/works',
  })
}

export const getWorksDetailed = (data) => {
  return apiService({
    method:'post',
    url:'/worksDetailed',
    data
  })
}