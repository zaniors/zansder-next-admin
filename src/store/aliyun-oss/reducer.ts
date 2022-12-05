import fetchUploadFileUrlReducer from './fetch-upload-file-url'

const reducers = [fetchUploadFileUrlReducer]

export default function AliyunOssReducer(state = {}, action) {
  switch (action.type) {
    default:
      break
  }
  return reducers.reduce((s, r) => r(s, action), state)
}
