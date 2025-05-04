import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewArticles() {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchArticles() {
            const res = await fetch('https://alaminapi.pythonanywhere.com/articles');
            const data = await res.json();
            setArticles(data);
        }

        fetchArticles();
    }, []);


    return (
        <div>
            <h1>Articles</h1>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                {articles.length === 0 ? (
                    <p>No articles found.</p>
                ) : (
                    articles.map(article => {
                        const rawPath = article.image_path.replace(/\\/g, "/");
                        const imgSrc = `https://alaminapi.pythonanywhere.com/${rawPath}`;
                        
                        // ✅ This is where the log should be
                        console.log('Image Path:', imgSrc);

                        return (
                            <div
                                key={article.id}
                                className="card"
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    width: '300px',
                                    backgroundColor: '#f9f9f9',
                                    cursor: 'pointer',
                                }}
                                onClick={() => navigate(`/article/${article.id}`)}
                            >
                                <img
                                    src={imgSrc}
                                    alt={article.title}
                                    style={{ width: '100%', borderRadius: '5px' }}
                                />
                                <div className="card-title" style={{ fontWeight: 'bold' }}>
                                    {article.title}
                                </div>
                                <div className="card-category" style={{ fontSize: '13px', color: '#555' }}>
                                    {article.category}
                                 </div>
                                <div className="card-time" style={{ fontSize: '12px', color: '#777' }}>
                                    {new Date(article.created_at).toLocaleString()}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
