import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // 환경변수 사용 로그인 로직
      if (username === process.env.NEXT_PUBLIC_ADMIN_ID && 
          password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        localStorage.setItem('adminToken', 'secure_token');
        router.push('/admin/dashboard');
      } else {
        setError('로그인 정보가 일치하지 않습니다.');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>관리자 로그인</h2>
        <input 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="아이디"
          required
        />
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}