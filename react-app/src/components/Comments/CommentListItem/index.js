import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Modal } from '../../../context/Modal'
import CommentDelete from '../CommentDelete'
import CommentEditForm from '../CommentEditForm'
import './CommentListItem.css'

function CommentListItem({ comment }) {
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const sessionUser = useSelector(state => state.session.user)
  const isOwner = sessionUser.id === comment?.user?.id

  return (
    <div>
      <NavLink className='user-link' to={`/users/${comment?.userId}`}>
        <p className='comment-user'>{comment?.user?.username}</p>
      </NavLink>
      <p className='comment-body'>{comment?.body}</p>
      {isOwner && 
      <button onClick={() => setEditModal(true)}>Edit</button>
      }
      {editModal && (
        <Modal onClose={() => setEditModal(false)}>
          <CommentEditForm comment={comment} setEditModal={setEditModal}/>
        </Modal>
      )}
      {isOwner && 
        <button onClick={() => setDeleteModal(true)}>Delete</button>
      }
      {deleteModal && (
        <Modal onClose={() => setDeleteModal(false)}>
          <CommentDelete comment={comment} setDeleteModal={setDeleteModal}/>
        </Modal>
      )}
    </div>
  );
}

export default CommentListItem
