import { addDoc, collection } from 'firebase/firestore'

import { db, auth } from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'

export const CreatePost = () => {
  useTitle('Create New Post')
  const postRef = collection(db, 'posts')
  const navigate = useNavigate()

  async function handleCreatePost(e) {
    e.preventDefault()
    console.log(auth)
    const document = {
      title: e.target.title.value,
      description: e.target.description.value,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    }

    await addDoc(postRef, document)
    navigate('/')
  }
  return (
    <section className="create">
      <div className="heading">
        <h1>Add New Post</h1>
      </div>
      <form onSubmit={handleCreatePost} className="createPost">
        <input
          type="text"
          name="title"
          className="title"
          placeholder="Title"
          maxLength="50"
          required
          autoFocus
        />
        <textarea
          name="description"
          placeholder="Description"
          maxLength="600"
          required
          className="description"
        ></textarea>
        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </section>
  )
}
