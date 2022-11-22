from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
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
    return {'users': [user.to_dict() for user in users]}


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
#     # if "profile_img" not in request.files:
#     #     return {'errors': 'image url required'}, 400
#     file = request.files['profile_img']
#     if form.validate_on_submit():
#         user.profile_img = upload['url']
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
#         db.session.commit()
#         return user.to_dict(), 200
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
