from flask import Blueprint, request
from app.models import db, Image, Comment, Like
from app.forms import ImageForm, CommentForm
from flask_login import current_user, login_required
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename

image_routes = Blueprint('image', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# GET all images
@image_routes.route('')
@login_required
def all_images():
    images = Image.query.order_by(Image.created_at.desc())
    return {'Images': [image.image_details_to_dict() for image in images]}, 200


# Get Image Details of one Image
@image_routes.route('/<int:id>')
@login_required
def image_detail(id):
    image = Image.query.get(id)
    return {'Image': image.image_details_to_dict()}, 200


# Create a new Image
@image_routes.route('', methods=['POST'])
@login_required
def create_image():
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if "image_url" not in request.files:
        return {'errors': 'image url required'}, 400
    file = request.files['image_url']

    if form.validate_on_submit():
        image = Image(
            user_id=current_user.id,
            caption=form.data['caption'],
            image_url=form.data['image_url']
        )
        if not allowed_file(file.filename):
            return {'errors': 'file type not permitted'}, 400
            
        file.filename = get_unique_filename(file.filename)
        upload = upload_file_to_s3(file)
        if 'url' not in upload:
            return upload, 400
        image.image_url = upload['url']
        db.session.add(image)
        db.session.commit()
        return image.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Edit an Image
@image_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_image(id):
    image = Image.query.get(id)
    if image is None:
        return {'errors': ['Image not found']}, 404
    if image.user_id != current_user.id:
        return {'errors': ['Unauthorized, please sign in.']}, 401
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image.caption=form.data['caption']
        image.image_url=form.data['image_url']
        db.session.commit()
        return image.image_details_to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Delete an Image
@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_image(id):
    image = Image.query.get(id)
    if image is None:
        return {'errors': ['Image not found.']}, 404
    if image.user_id != current_user.id:
        return {'errors': ['Unauthorized. Please sign in.']}, 401
    db.session.delete(image)
    db.session.commit()
    return {'Message': 'Successfully deleted.'}, 200


# Get Comments for an image based on image id
@image_routes.route('<int:id>/comments')
@login_required
def get_comments(id):
    image = Image.query.get(id)
    if image is None:
        return {'errors': ['Image not found']}, 404
    comments = Comment.query.filter(Comment.image_id == image.id).all()
    return {'Comments': [comment.to_dict() for comment in comments]}, 200


# Create a Comment
@image_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def create_comment(id):
    image = Image.query.get(id)
    if image is None:
        return {'errors': ['Image not found']}, 404
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            image_id=id,
            user_id=current_user.id,
            body=form.data['body']
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# GET Likes from an Image ID
@image_routes.route('/<int:id>/likes')
@login_required
def get_likes(id):
    image = Image.query.get(id)
    if image is None:
        return {'errors': ['Image not found']}, 404
    likes = Like.query.filter(Like.image_id == image.id).all()
    return {'Likes': [like.to_dict() for like in likes]}, 200


# Create a Like
@image_routes.route('/<int:id>/likes', methods=['POST'])
@login_required
def like_image(id):
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

# Delete a Like
@image_routes.route('/<int:id>/like', methods=['DELETE'])
@login_required
def unlike_image(id):
    image = Image.query.get(id)
    if image is None:
        return {'errors': ['Image not found']}, 404
    like = Like.query.filter(Like.user_id == current_user.id).filter(Like.image_id == image.id).first()
    if like is None:
        return {"errors": "Image not found."}
    db.session.delete(like)
    db.session.commit()
    return {"Message": "Image unliked" }
    
