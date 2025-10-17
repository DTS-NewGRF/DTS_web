<template>
  <Suspense>
    <template #default>
      <component :is="LoadedComponent" v-if="LoadedComponent" />
    </template>
    <template #fallback>
      <div class="page-loading">로딩 중…</div>
    </template>
  </Suspense>

  <div v-if="error" class="page-error">
    <p>페이지를 불러오는 중 오류가 발생했습니다.</p>
    <button @click="retry">다시 시도</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const LoadedComponent = ref<any>(null)
const error = ref<Error | null>(null)

const load = async () => {
  error.value = null
  LoadedComponent.value = null
  const loader = route.meta?.loader as (() => Promise<any>) | undefined
  if (!loader) {
    error.value = new Error('Loader가 정의되어 있지 않습니다.')
    return
  }
  try {
    const mod = await loader()
    LoadedComponent.value = mod.default ?? mod
  } catch (err) {
    error.value = err as Error
  }
}

const retry = () => load()

onMounted(load)
watch(() => route.fullPath, () => load(), { immediate: false })
</script>

<style scoped>
.page-loading { padding: 2rem; text-align:center; }
.page-error { padding: 2rem; text-align:center; color:#c00; }
</style>