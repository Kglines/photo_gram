from .db import db, environment, SCHEMA
from datetime import datetime

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='likes')
    image = db.relationship('Image', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_id': self.image_id
        }
