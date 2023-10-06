"use client";
import React, { useState } from "react";
import { getBaseUrl } from "@/util/baseUrl";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";

export const dynamic = "force-dynamic";

const EditForm = ({ post }) => {
  console.log("post", post);
  const baseUrl = getBaseUrl();

  const [title, setTitle] = useState(post ? post.title : null);
  const [content, setContent] = useState(post ? post.content : null);
  const [imageUrl, setImageUrl] = useState(post ? post.imageUrl : null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api/post/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content, imageUrl }),
    });

    console.log(imageUrl);

    if (response.ok) {
      router.refresh();
      router.push("/posts");
    }
  };
  return (
    <div className="w-full h-screen  py-16">
      <h1 className="text-center ">Create Post</h1>
      <div className=" flex justify-center items-center">
        <form
          className="w-1/2 flex flex-col  space-y-2"
          onSubmit={handleSubmit}
        >
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="border border-gray-300"
            type="text"
            placeholder="Title"
          />
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="border border-gray-300"
            cols="30"
            rows="10"
          ></textarea>

          <CldUploadWidget
            uploadPreset="kdgkfb03"
            onUpload={(result, widget) => {
              setImageUrl(result.info.url);
            }}
          >
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button className="button" onClick={handleOnClick}>
                  Upload an Image
                </button>
              );
            }}
          </CldUploadWidget>

          {imageUrl && (
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">
                Image Preview:
              </label>
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
          )}

          <button className="w-28 py-2 px-3 bg-indigo-600 text-white rounded-lg">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
