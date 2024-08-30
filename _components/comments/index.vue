<template>
  <div id="pageId">
    <p>comments list</p>
    <inner-loading :visible="loading" />
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import controller from 'modules/qcomment/_components/comments/controller'
import { apiRouteDefault, permissionsCommentsDefault} from 'modules/qcomment/_components/comments/interface'

export default defineComponent({
  props: {
    /*
    commentableId: {
      type: Number,
      required: true,
    },
    commentableType: {
      type: String,
      //default: () => commentableTypeDefault,
    },
    */
    apiRoute: {
      type: String,
      //default: () => apiRouteDefault,
      default: () => config("apiRoutes.qblog.posts"),

      
    },
    permisionComments: {
      type: String,
      default: () => permissionsCommentsDefault,

    }
  },
  components: {},
  setup(props, {emit}) {
    return controller(props, emit)
  }
})
</script>
<style lang="scss">
</style>
