import { useEffect, useRef, useState } from 'react'

import { getDocs, collection } from 'firebase/firestore'
import { db } from '../firebase/config'

import { PostCard } from '../components/PostCard'
import { useTitle } from '../hooks/useTitle'
import { SkeletonCard } from '../components'

export const HomePage = () => {
  useTitle('Home')
  const [posts, setPosts] = useState(new Array(3).fill(false))
  const postRef = useRef(collection(db, 'posts'))
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    async function getPosts() {
      const data = await getDocs(postRef.current)
      // console.log(data.docs)
      setPosts(
        data.docs.map(document => ({ ...document.data(), id: document.id }))
      )
    }
    // console.log('-----')
    getPosts()
  }, [postRef, toggle])

  return (
    <section>
      {posts.map((post, index) =>
        post ? (
          <PostCard
            key={post.id}
            post={post}
            toggle={toggle}
            setToggle={setToggle}
          />
        ) : (
          <SkeletonCard key={index} />
        )
      )}
    </section>
  )
}
