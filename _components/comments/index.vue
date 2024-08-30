<template>
  <div id="pageId">
    <q-list padding>
      <q-item>
        <q-item-section top avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption> Ya se agregó el boton en el wizard, hace falta el custom URL en cada producto(plantilla)  Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-badge label="10k"></q-badge>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section top avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-badge label="10k"></q-badge>
        </q-item-section>
      </q-item>
    </q-list>
    <inner-loading :visible="loading" />
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import controller from 'modules/qcomment/_components/comments/controller'
import { apiRouteDefault, permissionsCommentsDefault} from 'modules/qcomment/_components/comments/interface'

export default defineComponent({
  props: {    
    commentableId: {
      type: Number,
      required: true,
    },
    commentableType: {
      type: String,
      //default: () => commentableTypeDefault,
    },    
    apiRoute: {
      type: String,
      //default: () => apiRouteDefault,
      default: () => config("apiRoutes.qcomment.comments"),      
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
