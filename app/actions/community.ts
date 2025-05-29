"use server"
import { PostsDB } from "@/db/posts";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { getCurrentUser } from "./user";
import { RepliesDB } from "@/db/replies";
import { UserDB } from "@/db/user";
import isSubscribed from "@/utils/checkSubscription";

export async function getAllCommunityPosts (): Promise<CommunityPost[]> {
   try {
      const posts = await PostsDB.getAllPosts();
      if (!posts) return [];

      const communityPosts: CommunityPost[] = await Promise.all(
         posts.map(async (post) => {
            const user = await UserDB.getUserById(post.userid);
            const replies = await getCommunityPostReplies(post.postid);
            return {
               postid: post.postid,
               message: post.message,
               username: user ? user.username : 'Nomad',
               isSubscribed: user ? isSubscribed(user.subscribed) : false,
               date: post.date,
               replies: replies ? replies : []
            };
         })
      );

      return communityPosts;
   } catch (err) { return []; }
}

export async function getCommunityPost (postId: string): Promise<CommunityPost | false> {
   try {
      const post = await PostsDB.getPost(postId);
      if (!post) return false;

      const user = await UserDB.getUserById(post.userid);
      const replies = await getCommunityPostReplies(post.postid);

      return {
         postid: post.postid,
         message: post.message,
         username: user ? user.username : 'Nomad',
         isSubscribed: user ? isSubscribed(user.subscribed) : false,
         date: post.date,
         replies: replies ? replies : []
      }
   } catch (err) { return false; }
}

export async function getCommunityPostReplies (postId: string): Promise<CommunityReply[] | false> {
   try {
      const replies = await RepliesDB.getPostReplies(postId);
      if (!replies) return [];

      const communityReplies: CommunityReply[] = await Promise.all(
         replies.map(async (reply) => {
            const user = await UserDB.getUserById(reply.userid);
            return {
               replyid: reply.replyid,
               message: reply.message,
               username: user ? user.username : 'Nomad',
               isSubscribed: user ? isSubscribed(user.subscribed) : false,
               date: reply.date
            };
         })
      );

      return communityReplies;
   } catch (err) { return []; }
}

export async function addUserCommunityPost (message: string, date: string): Promise<boolean> {
   try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return false;

      const user = await getCurrentUser(session.user.email!);
      if (!user) return false;

      const postSent = await PostsDB.addPost(user.userid, message, date);
      return postSent;
   } catch (err) { return false; }
}

export async function addUserReplyToCommunityPost (postId: string, message: string, date: string): Promise<boolean> {
   try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return false;

      const user = await getCurrentUser(session.user.email!);
      if (!user) return false;

      const replySent = await RepliesDB.addPostReply(user.userid, postId, message, date);
      return replySent;
   } catch (err) { return false; }
}