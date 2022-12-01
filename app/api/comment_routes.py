from flask import Blueprint, request
from app.models import db, Comment
from app.forms import CommentForm
from flask_login import current_user, login_required

comment_routes = Blueprint('comment', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get Comments
@comment_routes.route('')
@login_required
def get_comments():
    comments = Comment.query.all()
    return {'Comments': [comment.to_dict() for comment in comments]}, 200


# Edit a Comment
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    comment = Comment.query.get(id)
    if comment is None:
        return {'errors': ['Comment not found.']}, 404
    if comment.user_id != current_user.id:
        return {'errors': ['Unauthorized. Please sign in.']}, 401
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.body=form.data['body']
        db.session.commit()
        return comment.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Delete a Comment
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment is None:
        return {'errors': ['Comment not found.']}, 404
    if comment.user_id != current_user.id:
        return {'errors': ['Unauthorized. Please sign in.']}, 401
    db.session.delete(comment)
    db.session.commit()
    return {'Message': 'Successfully deleted.'}, 200
