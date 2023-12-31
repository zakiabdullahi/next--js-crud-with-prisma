import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className=" max-w-4xl  mx-auto flex justify-between">
      <Link href={"/"}>Logo</Link>
      <div className="flex gap-2">
        <Link href={"/new"}>createPost</Link>
        <Link href={"/posts"}>Posts</Link>
      </div>
    </div>
  );
};

export default Navbar;
