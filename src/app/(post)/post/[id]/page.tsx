import IconHeart from "@/components/icons/IconHeart";
import ActionBarItem from "@/components/shared/ActionBarItem";
import MetaItem from "@/components/shared/MetaItem";
import ParseHTML from "@/components/shared/ParseHTML";
import { Button } from "@/components/ui/button";
import { getPostById } from "@/lib/actions/post.action";
import Image from "next/image";
import Link from "next/link";

async function PostDetailsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: URLSearchParams;
}) {
  const post = await getPostById({
    postId: params.id,
  });
  if (!post) return null;
  return (
    <div className="grid grid-cols-[250px_1fr_320px] gap-10 items-start">
      <div className="bg-white p-5 rounded-lg flex flex-col gap-5">
        <ActionBarItem
          icon={<IconHeart />}
          text="24,299 hearts"
        ></ActionBarItem>
        <ActionBarItem
          icon={<IconHeart />}
          text="24,299 bookmarks"
        ></ActionBarItem>
        <ActionBarItem
          icon={<IconHeart />}
          text="24,299 upvotes"
        ></ActionBarItem>
        <ActionBarItem
          icon={<IconHeart />}
          text="24,299 downvotes"
        ></ActionBarItem>
      </div>
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="relative h-[275px]">
          <Image
            src="https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            fill
            className="w-full h-full object-cover"
          ></Image>
          <div className="absolute top-5 right-5 bg-white p-2 rounded-lg flex items-center gap-3">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-5">
          <div className="flex flex-col">
            <h1 className="font-semibold text-[26px] mb-3">{post.title}</h1>
            <div className="flex items-center gap-10 mb-5">
              <MetaItem
                icon="/icons/icon-clock.svg"
                text="created 10 minutes ago"
              ></MetaItem>
              <MetaItem
                icon="/icons/icon-comment.svg"
                text="100 comments"
              ></MetaItem>
              <MetaItem icon="/icons/icon-eye.svg" text="1000 views"></MetaItem>
            </div>
            <div className="flex flex-wrap gap-5 mb-5">
              <Link href="#" className="text-[#EC9F41] inline-block">
                #payment
              </Link>
            </div>
            <ParseHTML data={post.content}></ParseHTML>
            <div id="comment"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="bg-white rounded-lg p-5 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 mb-3"></div>
          <h3 className="text-xl font-semibold">Evondev</h3>
          <p className="text-sm text-secondary-color-3 mb-5">
            Frontend Developer
          </p>
          <Button className="text-white p-3 w-full mb-5">Follow</Button>
          <p className="text-secondary-color-3 text-sm">joined 6 months ago</p>
        </div>
        <div className="bg-white rounded-lg p-5">
          <h2 className="font-semibold text-lg pb-5 mb-5 border-b border-b-gray-100">
            More posts from Evondev
          </h2>
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-medium mb-1">
                Self-Taught Developer Journal, Day 51: TOP Building Rock Paper
                Scissors UI cont.
              </h3>
              <div className="flex flex-wrap gap-2 text-sm text-secondary-color-3">
                <span>#evondev</span>
                <span>#css</span>
                <span>#scss</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailsPage;
