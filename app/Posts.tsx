import { Post, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface PostsProps {
  posts: Array<Post & { author: User }>;
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <>
      {posts.map((post, idx) => (
        <div key={idx} className="flex p-3 gap-4 my-3 rounded-xl border-[1px] border-zinc-600 w-3/4">
          <div>
            <Image
              src={post.author.imageUrl || ""}
              alt="avatar"
              height={52}
              width={52}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Link href={`user/${post.author.id}`}>
              <span className="text-xl font-semibold">{post.author.name}</span>
            </Link>
            <span className="text-lg font-light">{post.body}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
