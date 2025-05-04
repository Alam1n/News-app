import { useState } from 'react';

export default function CreateArticle() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('Sport'); 
    const [preview, setPreview] = useState('');
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setMessage('Title is required!');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        if (image) formData.append('image', image);

        try {
            const response = await fetch('https://alaminapi.pythonanywhere.com/articles', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Article saved successfully!');
                setTitle('');
                setContent('');
                setCategory(''); 
                setImage(null);
                setPreview('');
            } else {
                setMessage('Failed to save the article!');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    console.log(category); // Add this before sending the data to the backend

    return (
        <div>
            <h1>Create New Article</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label><br />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /><br /><br />

                <label>Category:</label><br />
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="Sport">Sport</option>
                <option value="Business">Business</option>
                <option value="Innovation">Innovation</option>
                <option value="Culture">Culture</option>
                <option value="Arts">Arts</option>
                <option value="Travel">Travel</option>
                <option value="Earth">Earth</option>
                </select><br /><br />
                



                <label>Article Content:</label><br />
                <textarea rows="4" value={content} onChange={(e) => setContent(e.target.value)} required></textarea><br /><br />

                <label>Select Image:</label><br />
                <input type="file" onChange={handleImageChange} /><br /><br />

                {preview && <img src={preview} alt="Preview" style={{ maxWidth: '300px' }} />}
                <br /><br />
                <button type="submit">Submit</button>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
}
