<template>
  <el-container class="home-page" :style="styles">
    <el-aside class="home-page-aside" :width="isCollapse ? '64px' : '200px'">
      <div class="toggle-button" @click="toggleCollapse">
        <i v-show="!isCollapse" class="el-icon-s-fold"></i>
        <i v-show="isCollapse" class="el-icon-s-unfold"></i>
      </div>
      <sider-menu :collapse="isCollapse"></sider-menu>
    </el-aside>
    <el-main>
      <breadcrumb></breadcrumb>
      <router-view v-slot="{ Component }">
        <keep-alive :include="alive" :max="1">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import globalData from '@/utils/globalData'
import Breadcrumb from './components/Breadcrumb.vue'
import SiderMenu from './components/SiderMenu.vue'
import { defineComponent, ref, watch, Ref } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'

export default defineComponent({
  components: {
    SiderMenu,
    Breadcrumb,
  },
  setup() {
    const isCollapse = ref(false)
    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value
    }

    const alive: Ref<string[]> = ref([])
    const handleAlive = (route: RouteLocationNormalizedLoaded) => {
      const meta = route.meta
      if (meta.keepAlive) {
        alive.value.push(route.name as string)
      } else if (!meta.parent) {
        alive.value = []
      }
    }
    const route = useRoute()
    handleAlive(route)

    watch(route, (newVal) => {
      handleAlive(newVal)
    })

    const styles = {
      height: globalData.isQiankun ? 'calc(100vh - 57px)' : '100vh',
    }
    return {
      isCollapse,
      toggleCollapse,
      alive,
      styles,
    }
  },
})
</script>

<style lang="scss">
.home-page {
  height: calc(100vh - 57px);
  &-aside.el-aside {
    background: #f7f8fa;
    border-right: 1px solid #f0f0f0;
    overflow-x: hidden;
    transition: width 0.3s;
  }
  .toggle-button {
    font-size: 16px;
    line-height: 24px;
    // color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
  }
}
</style>
