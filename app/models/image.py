from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .like import Like
from flask_login import current_user
from datetime import datetime

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    caption = db.Column(db.String(500), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, onupdate=datetime.now())

    user = db.relationship('User', back_populates='images')
    comments = db.relationship('Comment', back_populates='image', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='image', cascade='all, delete-orphan')


    def num_comments(self):
        return len(self.comments)


    def num_likes(self):
        return len(self.likes)

    def liked(self):
        liked = True
        num_of_likes = Like.query.filter(Like.user_id == current_user.id).filter(Like.image_id == self.id).first()
        if num_of_likes is None:
            liked = False
        return liked


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'num_comments': self.num_comments(),
            'num_likes': self.num_likes(),
            
        }


    def image_details_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'num_comments': self.num_comments(),
            'num_likes': self.num_likes(),
            'Comments': [comment.to_dict() for comment in self.comments],
            'Likes': {
                'total': self.num_likes(),
                'liked': self.liked()
            },
            'owner': self.user.to_dict()
        }
