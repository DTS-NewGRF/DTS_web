import { NextResponse } from 'next/server';

export function middleware(req) {
  const path = req.nextUrl.pathname;
  
  // 관리자 페이지 경로 체크
  const isAdminPath = path.startsWith('/admin');
  
  // 로그인 페이지는 허용
  if (path === '/admin') {
    return NextResponse.next();
  }

  // 관리자 페이지 접근 시 인증 확인
  if (isAdminPath) {
    const token = req.cookies.get('admin_access_token');
    
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!token) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  return NextResponse.next();
}

// 미들웨어 적용 경로
export const config = {
  matcher: ['/admin/:path*']
}