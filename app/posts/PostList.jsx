import { getBaseUrl } from "@/util/baseUrl";
import React from "react";
import Post from "./components/Post";
export const dynamic = "force-dynamic";

const PostList = async () => {
  const baseUrl = getBaseUrl();
  const data = await fetch(`${baseUrl}/api/post`, {
    cache: "no-store",
  });

  const posts = await data.json();

  return (
    <div className="w-full h-96 p-6 grid  md:grid-col-2 lg:grid-cols-3">
      {posts.length > 0 &&
        posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;
