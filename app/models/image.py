from .db import db
from .user import User
from datetime import datetime

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    caption = db.Column(db.String(2000), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='images')
    comments = db.relationship('Comment', back_populates='image', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='image', cascade='all, delete-orphan')


    def num_comments(self):
        return len(self.comments)


    def num_likes(self):
        return len(self.likes)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'caption': self.caption,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'num_comments': self.num_comments(),
            'num_likes': self.num_likes()
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
            'Likes': [like.to_dict() for like in self.likes]
        }
