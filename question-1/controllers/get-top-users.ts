import { Response, Request } from "express";
import { apiUserClient } from "../utils/init";

export const getTopUsers = async function (req: Request, res: Response): Promise<any> {
  try {
    const token = await apiUserClient();
    const response = await token.get("http://20.244.56.144/evaluation-service/users");
    const users = response.data.users;

    let userPostCounts: Record<string, number> = {};

    // Fetch posts for each user
    const postRequests = Object.keys(users).map(async (userId) => {
      try {
        const postsResponse = await token.get(`/users/${userId}/posts`);
        userPostCounts[userId] = postsResponse.data.posts.length;
      } catch (error: any) {
        console.error(`Error fetching posts for user ${userId}:`, error.message);
      }
    });

    await Promise.all(postRequests);

    // Sort users by post count in descending order and get the top 5
    const topUsers = Object.entries(userPostCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([userId]) => ({
      id: userId,
      name: users[userId],
      postCount: userPostCounts[userId],
    }));

    return res.json({ topUsers }).status(200);

  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};
