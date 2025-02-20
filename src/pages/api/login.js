import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // 환경변수의 관리자 정보와 비교
    const isValidUser = 
      username === process.env.NEXT_PUBLIC_ADMIN_ID &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (isValidUser) {
      // 보안 토큰 생성
      const token = crypto
        .createHmac('sha256', process.env.ADMIN_SECRET_KEY)
        .update(username)
        .digest('hex');

      res.status(200).json({ 
        success: true, 
        token: token,
        message: '로그인 성공' 
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: '인증 실패' 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}