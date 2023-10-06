import React from "react";
import PostList from "./PostList";
export const dynamic = "force-dynamic";

const PostsPage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-4">
      <PostList />
    </div>
  );
};

export default PostsPage;
