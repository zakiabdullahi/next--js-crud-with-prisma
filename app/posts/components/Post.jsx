"use client";
import { getBaseUrl } from "@/util/baseUrl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

/* eslint-disable react/prop-types */
const Post = ({ post }) => {
  const router = useRouter();
  const baseUrl = getBaseUrl();

  const handleDelete = async (id) => {
    const data = await fetch(`${baseUrl}/api/post/${id}`, {
      method: "DELETE",
    });

    if (data.ok) {
      router.refresh();
      router.push("/posts");
    }
  };
  return (
    <div className="flex flex-col space-y-2 border border-gray-300 m-1 ">
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <Image
        className="object-cover"
        src={post.imageUrl}
        width={500}
        height={100}
      />

      <div className="flex justify-between p-1">
        <button
          onClick={() => handleDelete(post.id)}
          className="py-2 px-3 bg-red-500 text-white  rounded-sm "
        >
          Delete
        </button>
        <Link
          href={`/posts/${post.id}`}
          className="py-2 px-3 bg-indigo-500 text-white  rounded-sm "
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Post;
