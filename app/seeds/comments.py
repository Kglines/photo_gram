from app.models import Comment, db, environment, SCHEMA

def seed_comments():
    comment1 = Comment(
        image_id=1, user_id=2, body="Looks like a great day!"
    )
    comment2 = Comment(
        image_id=1, user_id=1, body="Thanks, it was!"
    )
    comment3 = Comment(
        image_id=2, user_id=1, body="Wow, looks great!"
    )
    comment4 = Comment(
        image_id=2, user_id=3, body="I'm hungry now."
    )
    comment5 = Comment(
        image_id=3, user_id=1, body="Me too!"
    )
    comment6 = Comment(
        image_id=3, user_id=1, body="Enjoy!"
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")
        
    db.session.commit()
