'use client'
import "@/styles/main.css"
import "@/styles/community.css"
import BackToHome from "@/components/back-to-home/back-to-home";
import { getCommunityPost } from "@/app/actions/community";
import { useEffect, useState } from "react";
import { appUrl } from "@/utils/constants";
import CommunityPost from "@/components/community-post/community-post";


export default function CommunityPostPageClient ({ postOwnerName, postInfo }: { postOwnerName: string, postInfo: CommunityPost | null }) {
   const [post, setPost] = useState<CommunityPost | null>(postInfo);

   return <div className="community">
      <div className="community-container">
         <div className="community-wrapper">

            <div className="community-header">
               <div className="logo">
                  <img src={appUrl + '/logo.png'} alt="logo" />
               </div>
               <span className="text-c-xl bold-800">{postOwnerName}'s Post</span>
            </div>

            <div className="community-content">
               <div className="text-c-s dfb full">
                  <BackToHome url="/community">Community</BackToHome>
               </div>
               {post == null ? <>
                  <div className="text-c-s">Post could not be found</div>
               </> : <>
                  <CommunityPost
                     username={post.username}
                     isSubscribed={post.isSubscribed}
                     message={post.message}
                     postid={post.postid}
                     date={post.date}
                     replies={post.replies}
                     showFullReplies
                  />
               </>}
            </div>

         </div>
      </div>
   </div>
}