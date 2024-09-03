<template>
  <div id="comments">
    <div class="text-subtitle1 q-my-md">
      Comments
    </div>
    <q-list dense>
      <template v-for="(item, name) in comments" :key="name">
        <q-item class="q-my-sm">
          <q-item-section top avatar>
            <q-avatar>
              <img :src="`${profileImage(item)}`">
            </q-avatar>
          </q-item-section>          

          <q-item-section class="q-pt-sm">
            <q-item-label> 
              <div class="row">
                <div class="col-8">
                  <span class="text-weight-medium">
                    {{ createdBy(item) }}
                  </span>                
                </div>
                <div class="col-4 flex justify-end">
                  <span>{{  item.updatedAt }}</span>
                </div>
              </div>
            </q-item-label>
            <q-item-label class="q-py-md"> 
              <dynamic-field 
                v-if="item?.edit" 
                class="q-mb-md" 
                v-model="updateCommentModel"                 
                :field="{type: 'html'}"
              />
              <div 
                v-else
                v-html="item.comment"
              >
              </div>
            </q-item-label>
            <q-item-label v-if="item?.edit">
              <div class="flex justify-start items-start">
                <q-btn
                  :label="$tr('isite.cms.label.update')"
                  no-caps
                  unelevated
                  color="primary"
                  rounded                  
                  @click="updateComment(item)"
                />        
                <q-btn 
                  :label="$tr('isite.cms.label.cancel')"
                  no-caps
                  unelevated
                  rounded
                  class="q-ml-sm"
                  @click="resetEdit(item)"
                />
              </div>
            </q-item-label>
            <q-item-label v-else>
              <div class="flex justify-start items-start">
                <q-btn
                  :label="$tr('isite.cms.label.edit')"
                  no-caps
                  unelevated
                  rounded
                  dense
                  @click="editComment(item)"
                />        
                <q-btn 
                  :label="$tr('isite.cms.label.delete')"
                  no-caps
                  unelevated
                  rounded
                  dense
                  class="q-ml-md"
                  @click="deleteComment(item)"
                />
              </div>
            </q-item-label>

          </q-item-section>
        </q-item>        
      </template>
    </q-list>
    <div class="q-mt-md">
      <dynamic-field v-model="newCommentModel" class="q-mb-md" :field="{type: 'html' }" @update:model-value="resetEdit()" />
      <q-btn
        :label="$tr('isite.cms.label.save')" 
        @click="createComment()"
        no-caps
        unelevated
        rounded
        color="primary"
        :disable="disableButton"
      />
    </div>
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
