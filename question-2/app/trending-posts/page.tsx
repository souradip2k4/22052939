"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { MessageCircle, ThumbsUp } from "lucide-react"

interface Post {
  id: number
  userId: number
  username: string
  title: string
  content: string
  commentCount: number
  likeCount: number
  image: string
  userAvatar: string
}

export default function TrendingPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {

        const response = await fetch("http://localhost:3000/api/top-posts?type=popular")
        const data = await response.json()

        const postsWithImages = data.map((post: any) => ({
          ...post,
          image: `/placeholder.svg?height=400&width=600&text=Post+${post.id}`,
          userAvatar: `/placeholder.svg?height=50&width=50&text=${post.username.charAt(0).toUpperCase()}`,
        }))

        setPosts(postsWithImages)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching trending posts:", error)
        setLoading(false)
      }
    }

    fetchTrendingPosts()
  }, [])

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Trending Posts</h1>
      <p className="text-gray-500 mb-8">Posts with the highest number of comments</p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="card overflow-hidden">
                  <div className="skeleton h-[200px] w-full" />
                  <div className="p-6">
                    <div className="skeleton h-5 w-[250px] mb-4" />
                    <div className="skeleton h-4 w-full mb-2" />
                    <div className="skeleton h-4 w-full mb-2" />
                    <div className="skeleton h-4 w-2/3" />
                  </div>
                  <div className="px-6 pb-6">
                    <div className="skeleton h-8 w-[120px]" />
                  </div>
                </div>
              ))
          : posts.map((post) => (
              <div key={post.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-[200px] w-full">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex flex-row items-center gap-3 mb-4">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={post.userAvatar || "/placeholder.svg"}
                        alt={post.username}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{post.title}</h3>
                      <p className="text-sm text-gray-500">by {post.username}</p>
                    </div>
                  </div>
                  <p className="line-clamp-3 text-gray-600 mb-4">{post.content}</p>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1 text-blue-600">
                      <MessageCircle className="h-5 w-5" />
                      <span className="font-medium">{post.commentCount} comments</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <ThumbsUp className="h-5 w-5" />
                      <span>{post.likeCount} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

