"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface User {
  id: number
  username: string
  postCount: number
  avatar: string
}

export default function TopUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/top-users")
        console.log(response)
        const data = await response.json()

        const usersWithAvatars = data.map((user: any) => ({
          ...user,
          avatar: `/placeholder.svg?height=100&width=100&text=${user.username.charAt(0).toUpperCase()}`,
        }))

        setUsers(usersWithAvatars)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching top users:", error)
        setLoading(false)
      }
    }

    fetchTopUsers()
  }, [])

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Top Users</h1>
      <p className="text-gray-500 mb-8">Users with the highest number of posts</p>

      <div className="grid gap-6">
        {loading
          ? Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-center gap-4">
                    <div className="skeleton h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <div className="skeleton h-4 w-[200px]" />
                      <div className="skeleton h-4 w-[100px]" />
                    </div>
                    <div className="skeleton h-10 w-20 ml-auto" />
                  </div>
                </div>
              ))
          : users.map((user) => (
              <div key={user.id} className="card p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image src={user.avatar || "/placeholder.svg"} alt={user.username} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{user.username}</h3>
                    <p className="text-gray-500">User ID: {user.id}</p>
                  </div>
                  <div className="ml-auto bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                    {user.postCount} posts
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

