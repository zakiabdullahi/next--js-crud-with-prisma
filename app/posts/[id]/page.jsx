import { getBaseUrl } from "@/util/baseUrl";
import EditForm from "./EditForm";
export const dynamic = "force-dynamic";

const page = async ({ params }) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/post/${params.id}`, {
    method: "GET",
    cache: "no-store",
  });

  const post = response.ok ? await response.json() : null;

  return (
    <div className="max-w-4xl mx-auto ">
      <EditForm post={post} />
    </div>
  );
};

export default page;
