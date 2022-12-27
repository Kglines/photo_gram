from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', firstname='Demo', lastname='Lition', email='demo@aa.io', password='password', bio="Here's a little bit about me...", profile_img=''
        )
    marnie = User(
        username='marnie', firstname="Marnie", lastname="Smith", email='marnie@aa.io', password='password', bio="Hi, my name is Marnie!", profile_img=''
        )
    bobbie = User(
        username='bobbie', firstname="Bobbie", lastname="Brown", email='bobbie@aa.io', password='password', bio="They call me Bobbie.", profile_img=""
        )
    EllieB = User(
        username='Ellie', firstname='Ellie', lastname='B.', email='ellie@aa.io', password='password', bio="I'm Ellie. I'm in love with my dentist and I can't get enough of beefy nacho feet. I'm also a great Software Engineer!!!", profile_img=""
        )
    KateC = User(
        username='KateC', firstname='Kate', lastname='C.', email='kate@aa.io', password='password',
        bio="I'm Kate. I'm a great mom with a new direction in life as a Software Engineer!", profileImg="" 
        )
    MarielV = User(
        username='MarielV', firstname='Mariel', lastname='V.', email='mariel@aa.io', password='password',
        bio="Hi, I'm Mariel. I'm bilingual, a UI/UX designer, and an amazing Software Engineer!", profileImg=""
        )
    AustinF = User(
        username='AustinF', firstname='Austin', lastname='F.', email='austin@aa.io', password='password',
        bio="Hey there, I'm Austin. I live in Minnesota and it's cold outside, but I heat things up with the speed of my fingers on my keyboard as a Software Engineer!", profileImg=''
        )
    IsaacD = User(
        username='IsaacD', firstname='Isaac', lastname='D.', email='isaac@aa.io', password='password', bio="I'm Isaac. I live in sunny Florida. I'm the best dad ever...I have a t-shirt that proves it. I'm also a pretty amazing Software Engineer!", profileImg=""
        )
    PeterM = User(
        username='PeterM', firstname='Peter', lastname='M.', email='peter@aa.io', password='password',
        bio="Hi, I'm Peter. I'm a new dad, for the second time, which is really exciting. The second most exciting thing right is that I'm a new Software Engineer!", profileImg=""
        )
    ScottyW = User(
        username='ScottyW', firstname='Scotty', lastname='W.', email='scotty@aa.io', password='password',
        bio="Hi there, I'm Scotty. I work in the tech field already but I'm really excited about being a brand new Software Engineer! Look out VR World, here I come!!!", profileImg=""
        )
    Boots = User(
        username='Boots', firstname="Keith", lastname='G.', email='keith@aa.io', password='password',
        bio="Hi, I'm Keith, but people call me Boots. It's a nickname from my baseball team. I look forward to playing baseball this season. I took off last year as I was becoming a Software Engineer!", profileImg=""
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(EllieB)
    db.session.add(KateC)
    db.session.add(MarielV)
    db.session.add(AustinF)
    db.session.add(IsaacD)
    db.session.add(PeterM)
    db.session.add(ScottyW)
    db.session.add(Boots)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()
