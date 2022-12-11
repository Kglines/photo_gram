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


# Create a Like for an image
@like_routes.route('/likes/images/<int:id>', methods=['POST'])
@login_required
def create_like():
    image = Image.query.get(id)
    if image is None:
        return {'errors': ['Image not found']}, 404
    like = Like.query.filter(Like.user_id == current_user.id).filter(Like.image_id == image.id).first()
    if like is None:
        like = Like(
            user_id=current_user.id,
            image_id=image.id
        )
        db.session.add(like)
        db.session.commit()
        return like.to_dict()
    return {"errors": ["Already liked image"]}, 401


# Delete a like
@like_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_like(id):
    like = Like.query.get(id)
    if like is None:
        return {'errors': ['Like not found.']}, 404
    if like.user_id != current_user.id:
        return {'errors': ['Unauthorized. Please sign in.']}, 401
    db.session.delete(like)
    db.session.commit()
    return {'Message': 'Successfully deleted.'}, 200
