from app.models import Image, db, environment, SCHEMA

def seed_images():
    image1_1 = Image(
        user_id=1, caption='My day at the park', image_url='https://images.unsplash.com/photo-1504810935423-dbbe9a698963?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
    )
    image1_2 = Image(
        user_id=1, caption='This was so much fun!', image_url='https://images.unsplash.com/photo-1592912807899-df995a7dd731?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    )
    image1_3 = Image(
        user_id=1, caption='My life is clearly better than yours!', image_url='https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
    )
    image2_1 = Image(user_id=2, caption="Doesn't this look delicious?!", image_url="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80")
    image2_2 = Image(user_id=2, caption='I love to eat!', image_url='https://images.unsplash.com/photo-1526016650454-68a6f488910a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80')
    image2_3 = Image(user_id=2, caption='Mmmm...dessert!', image_url='https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80')
    image3_1 = Image(user_id=3, caption="I love Saturday's!", image_url="https://images.unsplash.com/photo-1598276804630-ce622f446cb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80")
    image3_2 = Image(user_id=3, caption='This new spot looks amazing!', image_url='https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80')
    image3_3 = Image(user_id=3, caption='Sophisticated? Yep!', image_url='https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')

    db.session.add(image1_1)
    db.session.add(image2_1)
    db.session.add(image1_2)
    db.session.add(image3_1)
    db.session.add(image1_3)
    db.session.add(image3_2)
    db.session.add(image2_2)
    db.session.add(image2_3)
    db.session.add(image3_3)

    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")
        
    db.session.commit()
