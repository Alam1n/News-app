from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import pytz
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:/Users/muham/OneDrive/Desktop/HTML/news_app/database.db'
db = SQLAlchemy(app)

def get_nigeria_time():
    return datetime.now(pytz.timezone('Africa/Lagos'))
                        
# Define the Article model
class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_path = db.Column(db.String(300))  # New field
    created_at = db.Column(db.DateTime, default=get_nigeria_time())

# Create DB
with app.app_context():
    db.create_all()


UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#display website
@app.route('/')
def index():
    return render_template('index.html')

# Route to post new article
@app.route('/articles', methods=['POST'])
def create_article():
    title = request.form.get('title')
    content = request.form.get('content')
    image = request.files.get('image')

    image_path = None
    if image:
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    new_article = Article(title=title, content=content, image_path=image_path)
    db.session.add(new_article)
    db.session.commit()

    return jsonify({'message': 'Article created successfully!'})


# Route to get all articles
@app.route('/articles', methods=['GET'])
def get_articles():
    articles = Article.query.order_by(Article.created_at.desc()).all()
    return jsonify([
        {
            'id': article.id,
            'title': article.title,
            'content': article.content,
            'image_path': article.image_path,
            'created_at': article.created_at.isoformat()
        } for article in articles
    ])

@app.route('/view_articles')
def view_articles():
    return render_template('view_articles.html')

@app.route('/article/<int:article_id>', methods=['GET'])
def get_article(article_id):
    article = Article.query.get_or_404(article_id)
    return render_template('view_article.html', article=article)

if __name__ == '__main__':
    app.run(debug=True)

