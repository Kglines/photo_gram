from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length

class UserEditForm(FlaskForm):
    firstname = StringField('firstname', Length(max=40))
    lastname = StringField('lastname', Length(max=40))
    bio = StringField('bio', Length(max=500))
    profile_img = StringField('profile_img')
