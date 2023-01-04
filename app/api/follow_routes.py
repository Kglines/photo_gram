from flask import Blueprint, request
from app.models import db, Follow, User
from flask_login import current_user, login_required

follow_routes = Blueprint('follow', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get Follows
@follow_routes.route('')
@login_required
def get_follows():
    follows = Follow.query.all()
    return {follow.to_dict() for follow in follows}, 200
    

# Create a Follow
@follow_routes.route('/users/<int:id>/follow', methods=['POST'])
@login_required
def create_follow(id):
    user = User.query.get(id)
    if user is None:
        return {'errors': ['User not found.']}, 404
    if user.id == current_user.id:
        return {'errors': ['User not able to follow yourself']}, 401
    follow = Follow.query.filter(Follow.follows_id == user.id).filter(Follow.user_id == current_user.id).first()
    if follow is not None:
        return {'errors': 'Not able to follow'}, 401
    follow = Follow(
        follows_id=user.id,
        user_id=current_user.id
    )
    db.session.add(follow)
    db.session.commit()
    return follow.to_dict(), 200


# UnFollow/Delete a Follow
@follow_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def unfollow(id):
    follow = Follow.query.get(id)
    if follow is None:
        return {'errors': ['Follow not found']}, 404
    if follow.user_id != current_user.id:
        return {'errors': ['Unauthorized. Please sign in.']}, 401
    db.session.delete(follow)
    db.session.commit()
    return {'Message': 'Successfully deleted.'}, 200


# Get all accounts User Follows
@follow_routes.route('/users')
@login_required
def user_follows():
    user = User.query.get(current_user.id)
    return {'follows': [follow.follow_details_to_dict() for follow in user.follows]}


# Get Followers
@follow_routes.route('/users/<int:id>/followers')
@login_required
def get_followers(id):
    user = User.query.get(id)
    return {'followers': [follower.followers_details_to_dict() for follower in user.followers]}
