// components/Home.jsx
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [latestRelease, setLatestRelease] = useState(null); // 최신 릴리즈 데이터를 저장할 상태

  // GitHub API에서 최신 릴리즈 데이터 가져오기
  useEffect(() => {
    const fetchLatestRelease = async () => {
      const response = await fetch('https://api.github.com/repos/DTS-NewGRF/DTS/releases');
      const data = await response.json();
      if (data.length > 0) {
        setLatestRelease(data[0]); // 첫 번째 릴리즈가 가장 최신
      }
    };

    fetchLatestRelease();
  }, []);

  return (
    <div className="home__container">
      {/* 이미지 섹션 */}
      <div className="image__section">
        {/* GitHub에서 불러온 이미지 */}
        <img
          src="https://github.com/DTS-NewGRF/DTS/blob/1.61/docs/DTS_board.png?raw=true"
          alt="DTS Board"
        />
      </div>

      {/* 문서 섹션 - GitHub 최신 릴리즈 */}
      <div className="text__section">
        <h1>최신 GitHub 릴리즈</h1>
        {latestRelease ? (
          <div>
            <h2>{latestRelease.name}</h2>
            <p>{latestRelease.body}</p>
            <a href={latestRelease.html_url} target="_blank" rel="noopener noreferrer">
              GitHub에서 보기
            </a>
          </div>
        ) : (
          <p>Loading latest release...</p> // 데이터가 로딩되지 않았을 때
        )}
      </div>
    </div>
  );
}