<template>
  <div id="pageId">
    <p>comments list</p>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import controller from 'modules/qcomment/_components/comments/controller'

export default defineComponent({
  props: {},
  components: {},
  setup(props, {emit}) {
    return controller(props, emit)
  }
})
</script>
<style lang="scss">
</style>
