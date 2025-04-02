import {apiUserClient} from "../utils/init";
import {Response, Request} from "express";

export const getTopPosts = async function (
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { type } = req.query;
    const { userid } = req.params;

    if (!type || !["latest", "popular"].includes(type as string)) {
      return res
      .status(400)
      .json({ error: "Invalid type parameter. Use 'latest' or 'popular'." });
    }
    const token = await apiUserClient();
    let users = [];
    if (!userid) {
      const usersResponse = await token.get("/users");
      users = Object.keys(usersResponse.data.users);
    } else {
      users = [userid];
    }

    const postsPromises = users.map((user) =>
      token
      .get(`users/${user}/posts`)
    .then((res) => res.data)
    .catch(() => [])
  );

    const usersPosts = await Promise.all(postsPromises);
    const posts = usersPosts.flat();

    if (!Array.isArray(posts) || posts.length === 0) {
      return res.status(404).json({ error: "No posts found." });
    }

    if (type === "popular") {
      const commentsPromises = posts.map((post) =>
        token
        .get(`/posts/${post.id}/comments`)
      .then((res) => ({
        post,
        comments: res.data?.comments || [],
      }))
      .catch(() => ({ post, comments: [] }))
    );

      const postsWithComments = await Promise.all(commentsPromises);
      const maxComments = Math.max(
        ...postsWithComments.map((p) => p.comments.length)
      );
      const result = postsWithComments
      .filter((p) => p.comments.length === maxComments)
      .map((p) => p.post);

      return res.json(result);
    } else {
      const result = posts.slice(0, 5);
      return res.json(result);
    }
  } catch (error: any) {
    res
    .status(500)
    .json({ error: "Failed to fetch posts.", details: error.message });
  }
};