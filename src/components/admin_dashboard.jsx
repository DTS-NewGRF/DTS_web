import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 토큰 확인 및 인증 로직
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      router.push('/admin');
    } else {
      // 토큰이 있으면 인증 상태로 설정
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 시 토큰 제거 및 로그인 페이지로 리다이렉트
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="logo">관리자 페이지</div>
        <ul className="menu">
          <li><a href="#">대시보드</a></li>
          <li><a href="#">사용자 관리</a></li>
          <li><a href="#">콘텐츠 관리</a></li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <div className="title">대시보드</div>
          <div className="user-info">
            <span className="username">관리자</span>
            <button className="logout-btn" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-card">
            <h3>환영합니다</h3>
            <div className="card-content">
              관리자 페이지에 로그인 되었습니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}