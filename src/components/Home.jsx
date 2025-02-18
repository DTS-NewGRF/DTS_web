import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const REPO_URLS = {
    "DTS": "DTS",  // src/DB/DTS.md
    "DTS-Track": "DTS_Track",  // src/DB/DTS_Track.md
    "DTS-Object": "DTS_Object"  // src/DB/DTS_Object.md
};

export default function Home() {
    const [activeTab, setActiveTab] = useState("DTS");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/getRelease?file=${REPO_URLS[activeTab]}`);
                const data = await response.json();

                if (data.content) {
                    setContent(data.content);
                } else {
                    setContent("내용을 불러올 수 없습니다.");
                }
            } catch (error) {
                console.error("파일을 불러오는 중 오류가 발생했습니다.", error);
                setContent("오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
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
                ) : (
                    <div className="markdown">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            className="markdown-content"
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}