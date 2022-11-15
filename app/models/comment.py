from .db import db, environment, SCHEMA
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    body = db.Column(db.String(2000))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    image = db.relationship('Image', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'image_id': self.image_id,
            'user_id': self.user_id,
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict()
        }
