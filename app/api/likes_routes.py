from flask import Blueprint, request
from app.models import db, Image, Like
from flask_login import current_user, login_required

like_routes = Blueprint('like', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get Likes
@like_routes.route('')
@login_required
def all_likes():
    likes = Like.query.all()
    return {'likes': [like.to_dict() for like in likes]}, 200

# Get Likes for an image by id
@like_routes.route('/images/<int:id>')
@login_required
def image_likes(id):
    image = Image.query.get(id)
    if image is None:
        return {'errors': ['Image not found']}, 404
    likes = Like.query.filter(Like.image_id == image.id).all()
    return {'Likes': [like.to_dict() for like in likes]}, 200

