import { getCommunityPost } from "@/app/actions/community";
import CommunityPostPageClient from "./post-client";

type CommunityPostPageProps = {
   params: Promise<{
      postid: string;
   }>
}

export default async function CommunityPostPage ({ params }: CommunityPostPageProps) {
   const { postid } = await params;

   const post = await getCommunityPost(postid);
   if (!post) return <CommunityPostPageClient postInfo={post || null} postOwnerName={'Unknown User'} />

   return <CommunityPostPageClient postInfo={post} postOwnerName={post.username} />
}
