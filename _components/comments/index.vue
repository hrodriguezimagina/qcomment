<template>
  <div id="comments" v-if="hasPermission.index">
    <div class="text-subtitle2 text-weight-bold q-my-md">
      {{ $tc('isite.cms.form.comment', 2)}}
    </div>
    <q-list separator padding v-if="comments.length">
      <template v-for="(item, name) in comments" :key="name">
        <q-item>
          <q-item-section top avatar>
            <q-avatar>
              <img :src="`${profileImage(item)}`" style="width: 32px;height: 32px;">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label caption> 
              <div class="row">
                <div class="col-10 flex justify-start items-center">                  
                  <span>{{ createdBy(item) }}</span>
                </div>
                <div class="col-2 flex justify-end">
                  <btn-menu
                    :actions="actions"
                    :action-data="item"                  
                  />
                </div>
              </div>
            </q-item-label>
            <q-item-label> 
              <Transition name="slide-fade">
                <dynamic-field 
                  v-if="item?.edit" 
                  class="q-my-md" 
                  v-model="updateCommentModel"                 
                  :field="field"
                />
              </Transition>
              <div v-if="!item?.edit"  v-html="item.comment">
              </div>            
            </q-item-label>
            <q-item-label caption>              
              <div class="q-my-sm" v-if="!item?.edit">
                {{ $trd(item.updatedAt, {type: 'long'})  }}
              </div>                
            </q-item-label>
            <q-item-label class="q-mb-md" v-if="item?.edit">
              <div class="flex justify-end items-start">
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
          </q-item-section>
        </q-item>        
      </template>
    </q-list>
    <div class="q-mt-md">
      <dynamic-field 
        v-if="hasPermission.create"
        v-model="newCommentModel" 
        class="q-mb-md" 
        :field="field" 
        @update:model-value="resetEdit()" 
      />
      <q-btn
        v-if="hasPermission.create"
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

export default defineComponent({
  props: {    
    commentableId: {
      type: Number,
      required: true,
    },
    commentableType: {
      type: String,
    },
    field: {
      default: {
        type: 'input',
        props: {label: ''}
      }
    }
  },
  components: {},
  setup(props, {emit}) {
    return controller(props, emit)
  },   
})
</script>
<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
