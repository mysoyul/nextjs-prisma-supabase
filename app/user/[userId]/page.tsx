import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import Link from "next/link";

type Params = {
  params: {
    userId: string;
  };
};

function getCreatedDate(createdAtDate: Date): string {
    return new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' }).format(createdAtDate)
}

export default async function UserPage({ params: { userId } }: Params) {
  const userData = await prisma.user.findUnique({
    where: { id: userId },
  });
  const user = await userData;

  if (!user) return notFound();

  const userPostData = await prisma.post.findMany({
    where: { authorId: userId },
  });
  const posts = await userPostData;

  if (!posts) return undefined;
  
  return (
    <>
      <h2 className="m-5">
        <Link className="px-6 py-3 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200" href="/">Back to Home</Link>
        <Link className="ml-6 px-6 py-3 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200"
            href={{ pathname: '/postForm', query: { id: user.id, name: user.name } }}>New Post</Link>
      </h2>
      <div className="flex p-3 gap-4 my-3 rounded-xl border-[1px] border-zinc-600 w-3/4">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-light">Id : {user.id}</span>
          <span className="text-lg font-semibold">Name : {user.name}</span>
          <span className="text-xl font-light">Posts written by {user.name}</span>
          <ul className="max-w-6xl space-y-2 text-gray-500 list-disc list-inside dark:text-gray-400">
          {posts.map((post, idx) => 
            (<li key={idx} className="text-justify text-base font-light">{post.body} / {getCreatedDate(post.createdAt)}</li>))}
          </ul>
        </div>
      </div>
      <br />
    </>
  );
}