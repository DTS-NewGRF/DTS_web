export const pages = [
  {
    path: '/',
    name: 'Home',
    loader: () => import('@/views/HomeView.vue'),
    meta: { title: '홈' },
  },
  {
    path: '/about',
    name: 'About',
    loader: () => import('@/views/AboutView.vue'),
    meta: { title: 'About' },
  },
  // 추가 페이지는 이곳에만 추가하면 됩니다.
]