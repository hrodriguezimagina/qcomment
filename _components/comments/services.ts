import baseService from 'modules/qcrud/_services/baseService'

export default {  
  getData(apiRoute, refresh = false, params = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestParams = {refresh, params}
      //Request
      baseService.index(apiRoute, requestParams).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    })
  },

  updateItem(configName, criteria, data, params = {params: {}}): Promise<any> {
    return new Promise((resolve, reject) => {      
      //Request
      baseService.update(configName, criteria, data, params).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    })
  }, 

  showItem(configName, criteria, params = {}): Promise<any> {
    return new Promise((resolve, reject) => {      
      //Request
      baseService.show(configName, criteria, params).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    })
  },
}
