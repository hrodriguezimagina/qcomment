import {computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance} from "vue";
import service from 'modules/qcomment/_components/comments/services'
import { store, i18n, clone, alert } from 'src/plugins/utils';
import defaultImg from 'src/modules/quser/_assets/default.jpg'
import { permissionsCommentsDefault} from 'modules/qcomment/_components/comments/interface'

export default function controller(props: any, emit: any) {
  const proxy = getCurrentInstance()!.appContext.config.globalProperties

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  }

  // States
  const state = reactive({
    // Key: Default Value
    loading: false, 
    comments: [], 
    newCommentModel: null, 
    updateCommentModel: null, 
  })

  // Computed
  const computeds = {
    // key: computed(() => {})
    hasPermission: computed(() => {
      //Default permission
      return  {
        create: store.hasAccess(`${permissionsCommentsDefault}.create`),
        index: store.hasAccess(`${permissionsCommentsDefault}.index`),
        edit:  store.hasAccess(`${permissionsCommentsDefault}.edit`),
        destroy: store.hasAccess(`${permissionsCommentsDefault}.destroy`)
      };
    }),
    disableButton: computed(() => state.newCommentModel ==  null || state.newCommentModel ==  ''),
    paramsRequest: computed(() => {
      return {
        filter: {
          commentableType: props.commentableType,
          commentableId: props.commentableId,
        },
        include: "userProfile",
      };
    }), 
    actions: computed(() => {      
      const response = []
      const editAction = {
        icon: 'fa-light fa-pencil',
        name: 'edit',
        label: i18n.tr('isite.cms.label.edit'),
        action: (item) => {
          methods.editComment(item);
        }
      }
      const deleteAction = {
        icon: 'fa-light fa-trash-can',
        name: 'delete',
        label: i18n.tr('isite.cms.label.delete'),
        action: (item) => {
          methods.deleteComment(item);
        }
      }
      if(computeds.hasPermission.value.edit) response.push(editAction)
      if(computeds.hasPermission.value.destroy) response.push(deleteAction)
      return response     
    })
  }

  // Methods
  const methods = {
    // methodKey: () => {}
    init(){
      if(computeds.hasPermission.value.index){
        methods.getCommentsList()
      }
    },
    createdBy(item){
      if(!item?.userProfile) return ''
      return item.userProfile?.firstName ? `${item.userProfile.firstName} ${item.userProfile.lastName}` : item.userProfile.email
    },
    profileImage(item){
      if(!item?.userProfile) return defaultImg
      return item.userProfile?.mainImage ? item.userProfile?.mainImage : defaultImg
    },
    getCommentsList(){      
      state.loading = true
      service.getCommentsList(true, computeds.paramsRequest.value).then((response) =>{
        state.loading = false
        if(response?.data){
          state.comments = response.data
          state.comments.forEach((comment) => {
            comment.edit = false
          })
        }
      }).catch((error) => {
        state.loading = false
        console.log(`error on getCommentsList: ${error}`)
      })
    },
    createComment(){
      state.loading = true
      const data = {
        comment: state.newCommentModel,
        commentableType: props.commentableType,
        commentableId: props.commentableId,
        //userId: props.userId
      }
      service.createComment(data).then((response) =>{
        state.loading = false
        if(response?.data){
          state.newCommentModel = null
          methods.getCommentsList()
        }
      }).catch((error) => {
        state.loading = false
        console.log(`error on createComment: ${error}`)
      })
    },
    resetEdit(){
      state.updateCommentModel = null
      state.comments.forEach((comment) => {
        comment.edit = false        
      })
    },
    editComment(comment){
      methods.resetEdit()
      state.comments.find((item) => {
        if(item.id == comment.id){
          item.edit = true
          state.updateCommentModel = item.comment
        }
      })      
    },
    updateComment(comment){
      state.loading = true
      const data = {
        comment: state.updateCommentModel,
        commentableType: props.commentableType,
        commentableId: props.commentableId,
        //userId: props.userId
      }
      service.updateComment(comment.id, data).then((response) =>{
        
        if(response?.data){
          state.updateCommentModel = null
          service.showComment(comment.id, computeds.paramsRequest.value).then((response) => {            
            if(response?.data){
              const foundIndex = state.comments.findIndex(e => e.id == comment.id)
              state.comments[foundIndex] = response.data
              state.comments[foundIndex]['edit'] = false
              state.loading = false
            }
          })
        }
      }).catch((error) => {
        state.loading = false
        console.log(`error on updateComment: ${error}`)
      })
    },
    deleteComment(comment){
      alert.error({
        mode: 'modal',
        title: `ID: ${comment.id}`,
        message: i18n.tr('isite.cms.message.deleteRecord'),
        actions: [
          { label: i18n.tr('isite.cms.label.cancel'), color: 'grey' },
          {
            label: i18n.tr('isite.cms.label.delete'),
            color: 'red',
            handler: async () => {
              state.loading = true
              service.deleteComment(comment.id).then((response) => {
                methods.getCommentsList()
                state.loading = false                
              })
            }
          }
        ]
      })
    }

  }

  // Mounted
  onMounted(() => {
    methods.init()
  })

  // Watch
  // watch(key, (newField, oldField): void => {
  //
  // }, {deep: true})

  return {...refs, ...(toRefs(state)), ...computeds, ...methods, store}
}
