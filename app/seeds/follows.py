from app.models import db, Follow, environment, SCHEMA

def seed_follows():
    follow1_2 = Follow(
        user_id=1,
        follows_id=2
    )
    follow2_3 = Follow(
        user_id=2,
        follows_id=3
    )
    follow3_1 = Follow(
        user_id=3,
        follows_id=1
    )

    db.session.add(follow1_2)
    db.session.add(follow2_3)
    db.session.add(follow3_1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM follows")
        
    db.session.commit()
