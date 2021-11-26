<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="g-breadcrumb">
    <el-breadcrumb-item
      v-for="item in breadcrumbList"
      :to="item.path"
      :key="item.name"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, watch, Ref } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'

export default defineComponent({
  setup() {
    const breadcrumbList: Ref<any[]> = ref([])
    const route = useRoute()
    const handleBreadcrumb = (route: RouteLocationNormalizedLoaded) => {
      if (!breadcrumbList.value.length) {
        breadcrumbList.value = route.matched
        return
      }
      if (route.meta?.hidden) {
        const key = breadcrumbList.value.findIndex(
          (item) => item.name === route.name
        )
        if (key === -1) {
          breadcrumbList.value.push(route)
        }
      } else {
        breadcrumbList.value = route.matched
      }
    }
    handleBreadcrumb(route)
    watch(route, (newVal) => {
      handleBreadcrumb(newVal)
    })
    return {
      breadcrumbList,
    }
  },
})
</script>

<style>
.g-breadcrumb {
  margin-bottom: 15px;
}
</style>
