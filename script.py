from app import app, db, Article  # make sure this imports from your actual app file

# Query all articles
with app.app_context():
    articles = Article.query.order_by(Article.created_at.desc()).all()
# Print results
for article in articles:
    print(f"ID: {article.id}")
    print(f"Title: {article.title}")
    print(f"Content: {article.content}")
    print(f"Created At: {article.created_at}")
    print(f"Image Path: {article.image_path}")
    print("-" * 40)
