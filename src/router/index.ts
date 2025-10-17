import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 기본/공통 라우트(예: 404, 로그인 등)는 여기에 두고,
    // 실제 페이지 라우트는 동적 등록(registration)으로 처리합니다.
  ],
})

// 예: 전역 가드(필요 최소한만)
router.beforeEach((to, from, next) => {
  // 권한 체크 등은 여기에 최소한으로 둡니다.
  next()
})

export default router