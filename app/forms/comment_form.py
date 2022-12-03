from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    body = StringField('body', validators=[DataRequired(), Length(min=1,max=200)])
