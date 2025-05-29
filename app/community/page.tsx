'use client'
import "@/styles/main.css"
import "@/styles/community.css"
import CommunityPost from "@/components/community-post/community-post";
import BackToHome, { BackToAction } from "@/components/back-to-home/back-to-home";
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addUserCommunityPost, getAllCommunityPosts } from "../actions/community";
import { getCurrentUser } from "../actions/user";


function UserMakePostForm ({ cancelAction, postedPostAction }: { cancelAction: Function, postedPostAction: Function }) {
   const { data: session } = useSession();
   const router = useRouter();
   const [postMessage, setPostMessage] = useState("");
   const [error, setError] = useState(false)

   const postMessageButton = async () => {
      setError(false)
      const user = await getCurrentUser(session?.user?.email!);
      if (!user) {
         setError(true)
         return;
      }
      const response = await addUserCommunityPost(postMessage, `${Date.now()}`);
      if (response) {
         alert('Posted!');
         cancelAction();
         postedPostAction();
      } else {
         setError(true)
      }
   }

   return <>
      {session?.user ? <>
         <div className="make-post">
            {error && <div className="text-c-sm pd-1 error">Failed to make post. Please try again later</div>}
            <div className="mp-form-content">
               <textarea name="post" placeholder="What's on your mind..." value={postMessage} onChange={(e) => setPostMessage(e.target.value)} />
            </div>
            <div className="mp-form-content-buttons">
               <button onClick={postMessageButton}>Post</button>
               <button className="outline" onClick={() => cancelAction()}>Cancel</button>
            </div>
         </div>
      
      </> : <>
         <div className="text-c-sm pd-1 full">
            Create an account or sign in to make a post.
         </div>
         <div className="text-c-sm full">
            <button onClick={() => router.push('/login')}>Sign In</button>
         </div>
      </>}
   </>
}

function CommunityPostsFeed ({ cpFeed }: { cpFeed: CommunityPost[] }) {
   return <>
      <div className="text-c-s dfb full">
         <BackToHome>Homepage</BackToHome>
      </div>
      {cpFeed.map((cp, index) => {
         return <CommunityPost 
            key={index}
            username={cp.username}
            isSubscribed={cp.isSubscribed}
            message={cp.message}
            postid={cp.postid}
            date={cp.date}
            replies={cp.replies}
         />
      })}
   </>
}

export default function CommunityPage () {
   const [userMakePost, setUserMakePost] = useState(false);
   const [postFeed, setPostFeed] = useState<CommunityPost[] | null>(null);

   const getPostFeed = async () => {
      const feed = await getAllCommunityPosts();
      setPostFeed(feed);
   }

   useEffect(() => {
      getPostFeed();
   }, [])

   return <div className="community">
      <div className="community-container">
         <div className="community-wrapper">
            <div className="new-post">
               <button onClick={() => setUserMakePost(true)}>
                  <Plus size={35} />
               </button>
            </div>

            <div className="community-header">
               <div className="logo">
                  <img src="./logo.png" alt="logo" />
               </div>
               <span className="text-c-xl bold-800">Community</span>
            </div>

            <div className="community-content">
               {userMakePost ? <>
                  <div className="text-c-s dfb full">
                     <BackToAction action={() => setUserMakePost(false)}>Community Feed</BackToAction>
                  </div>
                  <UserMakePostForm cancelAction={() => setUserMakePost(false)} postedPostAction={() => getPostFeed()} />
               </> : <>
                  {postFeed == null ? <>
                     <div className="text-c-s">Loading Posts...</div>
                  </> : <>
                     {postFeed.length > 0 ? <>
                        <CommunityPostsFeed cpFeed={postFeed} />
                     </> : <>
                        <div className="text-c-s">No posts</div>
                     </>}
                  </>}
               </>}
            </div>

         </div>
      </div>
   </div>
}
