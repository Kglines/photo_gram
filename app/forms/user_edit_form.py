from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length

class UserEditForm(FlaskForm):
    firstname = StringField('firstname', validators=[Length(max=40)])
    lastname = StringField('lastname', validators=[Length(max=40)])
    bio = StringField('bio', validators=[Length(max=500)])
