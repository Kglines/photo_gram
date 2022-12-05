from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Follow
from app.forms import UserEditForm
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.user_details_to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.user_details_to_dict()


# Edit a User
# @user_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def edit_user(id):
#     user = User.query.get(id)
#     if user is None:
#         return {'errors': ['User not found.']}, 404
#     if user.id != current_user.id:
#         return {'errors': ['Unauthorized, please sign in.']}, 401
#     form = UserEditForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     # if "profile_img" not in request.files:
#     #     return {'errors': 'image url required'}, 400
#     file = request.files['profile_img']
#     if form.validate_on_submit():
#         user.firstname=form.data['firstname']
#         user.lastname=form.data['lastname']
#         user.bio=form.data['bio']
#         user.profile_img=form.data['profile_img']
#         if not allowed_file(file.filename):
#                 return {'errors': 'file type not permitted'}, 400
#         file.filename = get_unique_filename(file.filename)
#         upload = upload_file_to_s3(file)
#         if 'url' not in upload:
#             return upload, 400
#         user.profile_img =upload['url']
#         db.session.commit()
#         return user.to_dict(), 200
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Edit a User - no image
@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):
    user = User.query.get(id)
    if user is None:
        return {'errors': ['User not found.']}, 404
    if user.id != current_user.id:
        return {'errors': ['Unauthorized, please sign in.']}, 401
    form = UserEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.firstname=form.data['firstname']
        user.lastname=form.data['lastname']
        user.bio=form.data['bio']
        db.session.commit()
        return user.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Create a Follow
@user_routes.route('/<int:id>/follows', methods=['POST'])
@login_required
def follow(id):
    user = User.query.get(id)
    if user is None:
        return {'errors': ['User not found.']}, 404
    if user.id == current_user.id:
        return {'errors': ['User not able to follow yourself']}, 401
    follow = Follow.query.filter(Follow.follows_id == current_user.id, Follow.user_id == user.id).first()
    if follow is None:
        follow = Follow(
            follows_id=current_user.id,
            user_id=user.id
        )
        db.session.add(follow)
        db.session.commit()
        return follow.to_dict()
    return {'errors': ['Not able to follow']}, 401
    

# Unfollow/Delete a follow
@user_routes.route('/<int:id>/unfollow', methods=['DELETE'])
@login_required
def unfollow(id):
    user = User.query.get(id)
    if user is None:
        return {'errors': ['User not found']}, 404
    if user.id == current_user.id:
        return {'errors': ['Not able to unfollow']}, 401
    follow = Follow.query.filter(Follow.follows_id == current_user.id, Follow.user_id == user.id).first()
    if follow is None:
        return {'errors': ['Not currently following']}, 401
    db.session.delete(follow)
    db.session.commit()
    return {'follows': [follow.to_dict() for follow in user.follows]}
    
# Get Follows
@user_routes.route('/<int:id>/follows')
@login_required
def follows(id):
    user = User.query.get(id)
    return {'follows': user.user_details_to_dict()}
