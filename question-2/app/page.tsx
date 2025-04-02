import Link from "next/link"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Social Media Analytics Dashboard
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Get real-time insights into your social media performance
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/top-users">
                  <button className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    View Analytics
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Link href="/top-users" className="flex flex-col items-center space-y-4">
                <div className="w-full rounded-lg border bg-white shadow-sm hover:shadow-lg transition-shadow p-6">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="text-xl font-bold">Top Users</h3>
                    <BarChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">View the top five users with the highest number of posts</p>
                  </div>
                </div>
              </Link>
              <Link href="/trending-posts" className="flex flex-col items-center space-y-4">
                <div className="w-full rounded-lg border bg-white shadow-sm hover:shadow-lg transition-shadow p-6">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="text-xl font-bold">Trending Posts</h3>
                    <PieChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Discover posts with the maximum number of comments</p>
                  </div>
                </div>
              </Link>
              <Link href="/feed" className="flex flex-col items-center space-y-4">
                <div className="w-full rounded-lg border bg-white shadow-sm hover:shadow-lg transition-shadow p-6">
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h3 className="text-xl font-bold">Live Feed</h3>
                    <LineChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">View posts in real-time with newest appearing at the top</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

