"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { MessageCircle, ThumbsUp, RefreshCw } from "lucide-react"

interface Post {
  id: number
  userId: number
  username: string
  title: string
  content: string
  commentCount: number
  likeCount: number
  createdAt: string
  image: string
  userAvatar: string
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchPosts = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:3001/api/posts")
      const data = await response.json()

      // Map the data to include random images and format dates
      const postsWithImages = data.map((post: any) => ({
        ...post,
        image: `/placeholder.svg?height=400&width=600&text=Post+${post.id}`,
        userAvatar: `/placeholder.svg?height=50&width=50&text=${post.username.charAt(0).toUpperCase()}`,
      }))

      // Sort by createdAt (newest first)
      postsWithImages.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      setPosts(postsWithImages)
      setLoading(false)
      setRefreshing(false)
    } catch (error) {
      console.error("Error fetching posts:", error)
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchPosts()

    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchPosts()
    }, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchPosts()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Live Feed</h1>
          <p className="text-gray-500">Latest posts in real-time</p>
        </div>
        <button
          onClick={handleRefresh}
          className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="grid gap-8">
        {loading
          ? Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="card overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-row items-center gap-3 mb-4">
                      <div className="skeleton h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <div className="skeleton h-4 w-[200px]" />
                        <div className="skeleton h-3 w-[100px]" />
                      </div>
                    </div>
                    <div className="skeleton h-[300px] w-full mb-6" />
                    <div className="skeleton h-5 w-full mb-2" />
                    <div className="skeleton h-4 w-full mb-2" />
                    <div className="skeleton h-4 w-2/3 mb-4" />
                    <div className="skeleton h-8 w-[120px]" />
                  </div>
                </div>
              ))
          : posts.map((post) => (
              <div key={post.id} className="card overflow-hidden hover:shadow-md transition-shadow">
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
                      <div className="font-medium">{post.username}</div>
                      <div className="text-sm text-gray-500">{formatDate(post.createdAt)}</div>
                    </div>
                  </div>
                  <div className="relative h-[300px] w-full mb-6">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.content}</p>
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

