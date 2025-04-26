import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateArticle from './components/CreateArticles';
import ViewArticles from './components/ViewArticles';
import ViewArticle from './components/ViewArticle';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CreateArticle />} />
                <Route path="/articles" element={<ViewArticles />} />
                <Route path="/article/:id" element={<ViewArticle />} />
            </Routes>
        </Router>
    );
}

export default App;
