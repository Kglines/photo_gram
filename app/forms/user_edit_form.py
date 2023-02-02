from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length

class UserEditForm(FlaskForm):
    firstname = StringField('firstname', validators=[Length(max=25)])
    lastname = StringField('lastname', validators=[Length(max=25)])
    # profile_img = StringField('profile_img')
    bio = StringField('bio', validators=[Length(max=500)])
