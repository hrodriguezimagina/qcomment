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
    getCommentsList(){
      const params = {
        filter: {
          commentableType: props.commentableType,
          commentableId: props.commentableId
        },
        //include: "userProfile",
      };
      console.log(params)
      state.loading = true
      service.getData(props.apiRoute, true, params).then((response) =>{
        console.log(response)
      }).catch((error) => {
        state.loading = false
        console.log(`error on getCommentsList: ${error}`)
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
