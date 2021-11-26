<template>
  <el-menu
    :default-active="activeIndex"
    :collapse="collapse"
    class="sider-menu"
    router
  >
    <component
      :is="handleMenu(parent)"
      v-for="parent in routes"
      :key="parent.name"
      :index="parent.redirect"
    >
      <i v-if="!isSubMenu(parent)" :class="parent.meta.icon"></i>
      <template #title>
        <i v-if="isSubMenu(parent)" :class="parent.meta.icon"></i>
        <span>
          {{ parent.meta.title }}
        </span>
      </template>
      <template v-if="isSubMenu(parent)">
        <el-menu-item
          v-for="child in parent.children"
          :key="child.name"
          :index="parent.path + '/' + child.path"
        >
          {{ child.meta.title }}
        </el-menu-item>
      </template>
    </component>
  </el-menu>
</template>

<script lang="ts">
import { asyncRoutes } from '@/router/index'
import lodash from 'lodash'
import { computed, defineComponent, ref, Ref } from 'vue'
import { useRoute, RouteRecordRaw } from 'vue-router'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const routes: Ref<RouteRecordRaw[]> = ref([])
    const handleRoutes = () => {
      const copyRoutes = lodash.cloneDeep(asyncRoutes)
      routes.value = copyRoutes.map((item: RouteRecordRaw) => {
        item.children = item.children?.filter((child) => !child.meta?.hidden)
        return item
      })
    }
    handleRoutes()

    const isSubMenu = (menu: RouteRecordRaw) => {
      return handleMenu(menu) === 'el-sub-menu'
    }
    const handleMenu = (menu: RouteRecordRaw): string => {
      if (menu?.children.length < 2 && !menu.meta.showSub) {
        return 'el-menu-item'
      }
      return 'el-sub-menu'
    }

    const route = useRoute()
    const activeIndex = computed(() => {
      return route.path
    })
    return {
      routes,
      activeIndex,
      isSubMenu,
      handleMenu,
    }
  },
})
</script>

<style lang="scss">
.sider-menu.el-menu {
  border-right: unset;
  background: #f7f8fa;
  .el-menu {
    border-right: unset;
    background: #f7f8fa;
  }
  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
