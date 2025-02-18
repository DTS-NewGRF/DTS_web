// pages/api/getRelease.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { file } = req.query; // 요청된 파일 이름

    try {
        // src/DB/ 디렉토리의 파일 경로를 생성합니다.
        const filePath = path.join(process.cwd(), 'src', 'DB', `${file}.md`);
        
        // 파일을 읽어옵니다.
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        
        // 성공적으로 파일을 읽었으면 클라이언트에 반환합니다.
        res.status(200).json({ content: fileContent });
    } catch (error) {
        // 오류가 발생하면 500 오류와 메시지를 반환합니다.
        res.status(500).json({ error: '파일을 읽을 수 없습니다.' });
    }
}