from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class ImageForm(FlaskForm):
    caption = StringField('caption', validators=[Length(min=1,max=500)])
    image_url = StringField('image_url', validators=[DataRequired()])
