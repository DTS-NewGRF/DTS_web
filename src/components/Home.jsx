import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const REPO_URLS = {
    DTS: "https://api.github.com/repos/DTS-NewGRF/DTS/releases",
    "DTS-Track": "https://api.github.com/repos/DTS-NewGRF/DTS_Track/releases",
    "DTS-Object": "https://api.github.com/repos/DTS-NewGRF/DTS-Object-/releases"
};

export default function Home() {
    const [activeTab, setActiveTab] = useState("DTS");
    const [latestRelease, setLatestRelease] = useState(null);
    const [preReleases, setPreReleases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPreReleases, setShowPreReleases] = useState(false);

    useEffect(() => {
        const fetchReleases = async () => {
            setLoading(true);
            try {
                const response = await fetch(REPO_URLS[activeTab]);
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    const latest = data.find(release => !release.prerelease);
                    const preReleaseList = data.filter(release => release.prerelease);

                    setLatestRelease(latest);
                    setPreReleases(preReleaseList);
                } else {
                    setLatestRelease(null);
                    setPreReleases([]);
                }
            } catch (error) {
                console.error("Error fetching releases:", error);
                setLatestRelease(null);
                setPreReleases([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReleases();
    }, [activeTab]);

    return (
        <div className="home__container">
            {/* 탭 메뉴 */}
            <div className="tab__menu">
                {Object.keys(REPO_URLS).map(tab => (
                    <button
                        key={tab}
                        className={tab === activeTab ? "active" : ""}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* 최신 릴리즈 섹션 */}
            <div className="text__section">
                <h1>{activeTab} 최신 변경기록</h1>
                {loading ? (
                    <p className="loading">데이터 불러오는 중...</p>
                ) : latestRelease ? (
                    <div className="markdown">
                        <h2>{latestRelease.name}</h2>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            className="markdown-content"
                        >
                            {latestRelease.body}
                        </ReactMarkdown>
                        <a href={latestRelease.html_url} target="_blank" rel="noopener noreferrer">
                            GitHub에서 보기
                        </a>
                    </div>
                ) : (
                    <p>릴리즈된 버전이 없습니다.</p>
                )}
            </div>

            {/* 프리릴리즈 섹션 */}
            {preReleases.length > 0 && (
                <div className="pre-release__section">
                    <button onClick={() => setShowPreReleases(!showPreReleases)}>
                        {showPreReleases ? "프리릴리즈 숨기기" : "프리릴리즈 보기"}
                    </button>
                    {showPreReleases && (
                        <div className="pre-release__list">
                            {preReleases.map(release => (
                                <div key={release.id} className="pre-release__item markdown">
                                    <h3>{release.name}</h3>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        className="markdown-content"
                                    >
                                        {release.body}
                                    </ReactMarkdown>
                                    <a href={release.html_url} target="_blank" rel="noopener noreferrer">
                                        GitHub에서 보기
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
