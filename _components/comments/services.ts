import baseService from 'modules/qcrud/_services/baseService'
import { apiRoute } from 'modules/qcomment/_components/comments/interface'

export default {  
  getCommentsList(refresh = false, params = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestParams = {refresh, params}
      //Request
      baseService.index(apiRoute, requestParams).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    })
  },

  createComment(data: any, params = {}) {
    return new Promise((resolve, reject) => {
      //Request
      baseService.create(apiRoute, data, params).then(response => {
        resolve(response);
      }).catch(error => reject(error));
    })
  },
  
  showComment(criteria, params = {}): Promise<any> {
    return new Promise((resolve, reject) => {      
      //Request
      baseService.show(apiRoute, criteria, params).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    })
  },

  updateComment(criteria, data, params = {params: {}}): Promise<any> {
    return new Promise((resolve, reject) => {      
      //Request
      baseService.update(apiRoute, criteria, data, params).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    })
  },

  deleteComment(criteria, params = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      baseService.delete(apiRoute, criteria, params).then(response => {
        resolve(true);
      }).catch(error => reject(error));
    });
  },
}
