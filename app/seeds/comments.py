from app.models import Comment, db, environment, SCHEMA

def seed_comments():
    comment1 = Comment(
        image_id=1, user_id=2, body="Looks like a great day!"
    )
    comment2 = Comment(
        image_id=1, user_id=3, body="Beautiful!"
    )
    comment3 = Comment(
        image_id=2, user_id=1, body="Wow, looks great!"
    )
    comment4 = Comment(
        image_id=2, user_id=3, body="I'm hungry now."
    )
    comment5 = Comment(
        image_id=3, user_id=2, body="Oh wow!"
    )
    comment6 = Comment(
        image_id=3, user_id=3, body="Nope...not for me."
    )
    comment7 = Comment(
        image_id=4, user_id=1, body="It's 5 o'clock somewhere!"
    )
    comment8 = Comment(
        image_id=5, user_id=3, body="If you have enough beers, everything looks that way!"
    )
    comment9 = Comment(
        image_id=5, user_id=2, body="That looks really cool!"
    )
    comment10 = Comment(
        image_id=6, user_id=1, body="Looks fun!"
    )
    comment11 = Comment(
        image_id=7, user_id=1, body="Who doesn't when the food looks that good?!"
    )
    comment12 = Comment(
        image_id=8, user_id=1, body="Oh. My. God."
    )
    comment13 = Comment(
        image_id=8, user_id=3, body="Yes please."
    )
    comment14 = Comment(
        image_id=9, user_id=2, body="Ha, not quite!"
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)

    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")
        
    db.session.commit()
