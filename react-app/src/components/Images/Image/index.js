import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import ImageEditForm from '../ImageEditForm';
import ImageDelete from '../ImageDelete';
import './Image.css'
import { useSelector } from 'react-redux';

function Image({ image, user }) {
  const { imageId } = useParams()
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const sessionUser = useSelector(state => state.session.user)
  const isOwner = sessionUser.id === image?.Image?.user_id

  return (
    <div>
      <div>
        <NavLink to={`/users/${user?.id}`}>
          <p>{user?.username}</p>
        </NavLink>
        {isOwner && <button onClick={() => setEditModal(true)}>Edit</button>}
        {editModal && (
          <Modal onClose={() => setEditModal(false)}>
            <ImageEditForm setEditModal={setEditModal} imageId={imageId} image={image}/>
          </Modal>
        )}
        {isOwner && <button onClick={() => setDeleteModal(true)}>Delete</button>}
        {deleteModal && (
          <Modal onClose={() => setDeleteModal(false)}>
            <ImageDelete setDeleteModal={setDeleteModal} imageId={imageId} image={image}/>
          </Modal>
        )}
      </div>
      <img src={image?.Image?.image_url} alt={image?.Image?.caption} />
      <p>{image?.Image?.caption}</p>
      <p>{image?.Image?.num_likes} Likes</p>
      <p>{image?.Image?.num_comments} Comments</p>
      <div>
        {image?.Image?.Comments.map((comment) => (
          <div key={comment?.id}>
            <p>{comment?.body}</p>
            <p>{comment?.user?.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Image
