import {computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance} from "vue";
import service from 'modules/qcomment/_components/comments/services'
import store from 'modules/qcomment/_components/comments/store'

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
    comments: []
  })

  // Computed
  const computeds = {
    // key: computed(() => {})
  }

  // Methods
  const methods = {
    // methodKey: () => {}
    init(){
     methods.getCommentsList()
    },
    createdBy(item){
      return item.userProfile?.firstName ? `${item.userProfile.firstName} ${item.userProfile.lastName}` : item.userProfile.email
    },
    profileImage(item){
      return item.userProfile?.mainImage ? item.userProfile?.mainImage : ''
    },
    getCommentsList(){
      const params = {
        filter: {
          commentableType: props.commentableType,
          commentableId: props.commentableId,
        },
        include: "userProfile",
      };

      state.loading = true
      service.getCommentsList(true, params).then((response) =>{
        state.loading = false
        if(response?.data){
          state.comments = response.data
        }
      }).catch((error) => {
        state.loading = false
        console.log(`error on getCommentsList: ${error}`)
      })
    },
    createComment(){
      state.loading = true
      const data = {
        comment: 'testing comment',
        commentableType: props.commentableType,
        commentableId: props.commentableId,
        //userId: props.userId
      }
      service.createComment(data).then((response) =>{
        state.loading = false
        if(response?.data){
          methods.getCommentsList()
        }
      }).catch((error) => {
        state.loading = false
        console.log(`error on createComment: ${error}`)
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
