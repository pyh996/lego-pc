<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: yellow">
        <div class="sidebar-container">
          组件列表
          <components-list :list="defaultTextTemplates" @onItemClick="addItem"></components-list>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <edit-wrapper
                @setActive="setActive"
                v-for="c in components"
                :key="c.id"
                :is="c.name"
                v-bind="c.props"
                :active="c.id === (currentElement && currentElement.id)"
                :id="c.id">
              <component
                  :is="c.name"
                  v-bind="c.props"
              >
                {{ c.props.text }}
              </component>
            </edit-wrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: white" class="settings-panel">
        组件属性
                <props-table :props="currentElement.props" @change="handleChange"></props-table>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import {defaultTextTemplates} from '@/defaultTemplates'
import {useStore} from "vuex"
import {GlobalDataProps} from "@/store"
import ComponentsList from "@/components/ComponentsList.vue"
import LText from "@/components/LText.vue"
import {TextComponentProps} from "@/defaultProps"
import EditWrapper from "@/components/EditWrapper.vue"
import PropsTable from "@/components/PropsTable.vue"
import {ComponentData} from "@/store/editor"

export default defineComponent({
  components: {EditWrapper, ComponentsList, PropsTable, LText},
  setup() {
    const store = useStore<GlobalDataProps>()  // 获取vuex
    // vuex获取到components
    const components = computed(() => store.state.editor.components)
    // 点击之前是null类型,点击之后是ComponentData类型
    const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement)
    // 点击事件
    const addItem = (props: Partial<TextComponentProps>) => {
      console.log(props)
      store.commit('addComponent', props)
    }
    //
    const setActive = (id: string) => {
      store.commit('setActive', id)
    }
    // 组件事件改变
    const handleChange = (e: any) => {
      console.log(e, "-----------")
      store.commit("updateComponent", e)
    }
    return {
      components,
      addItem,
      setActive,
      defaultTextTemplates,
      currentElement,
      handleChange
    }
  }
})
</script>

<style>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>
