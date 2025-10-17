import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerRoutes } from './router/registerRoutes'
import './styles/common.css'

async function bootstrap() {
  const app = createApp(App)
  app.use(router)
  // 동적 라우트 등록 : 앱이 router에 연결된 상태에서 한 번만 실행
  await registerRoutes(router)
  app.mount('#app')
}

bootstrap()