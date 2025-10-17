import type { Router } from 'vue-router'
import AsyncView from '@/components/AsyncView.vue'
import { pages } from '@/pages'

export async function registerRoutes(router: Router) {
  for (const p of pages) {
    if (!router.hasRoute(p.name)) {
      router.addRoute({
        path: p.path,
        name: p.name,
        component: AsyncView,
        meta: {
          loader: p.loader,
          ...p.meta,
        },
      })
    }
  }
}