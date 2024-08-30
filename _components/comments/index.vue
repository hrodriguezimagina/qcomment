<template>
  <div id="pageId">
    <q-list>
      <template v-for="(item, name) in comments" :key="name">
        <q-item>
          <q-item-section top avatar>
            <q-avatar>
              <img :src="`${profileImage(item)}`">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label> {{ createdBy(item) }} {{  item.updatedAt }}</q-item-label>
            <q-item-label> 
              <div>
                {{ item.comment }}
              </div>
            </q-item-label>
            <q-item-label>
              <div class="flex justify-start items-start">
                <q-btn
                  :label="$tr('isite.cms.label.edit')" 
                  dense
                  no-caps
                  unelevated
                />        
                <q-btn 
                  :label="$tr('isite.cms.label.delete')" 
                  dense
                  no-caps
                  unelevated
                  class="q-ml-sm"
                />
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>        
      </template>
    </q-list>
    
    <inner-loading :visible="loading" />
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import controller from 'modules/qcomment/_components/comments/controller'
import { permissionsCommentsDefault} from 'modules/qcomment/_components/comments/interface'

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
    permisionComments: {
      type: String,
      default: () => permissionsCommentsDefault,
    }, 
    /*
    userId: {
     type: Number, 
     default: () => this.$store.state.quserAuth.userId
    },
    */
  },
  components: {},
  setup(props, {emit}) {
    return controller(props, emit)
  },   
})
</script>
<style lang="scss">
</style>
