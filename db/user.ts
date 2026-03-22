import { db } from "@/db";
import { usersTable } from "@/db/schemas";
import { eq, and } from "drizzle-orm";
import { uuid } from "@/lib/uui";

export const UserDB = {
   login: async (email: string, password: string) => {
      const res = await db
         .select()
         .from(usersTable)
         .where(
            and(
               eq(usersTable.email, email),
               eq(usersTable.password, password)
            )
         )
         .limit(1);

      return res.length > 0 ? (res[0] as any) : false;
   },

   getAllUsers: async (): Promise<User[]> => {
      return (await db.select().from(usersTable)) as any[];
   },

   getUser: async (email: string) => {
      const res = await db
         .select()
         .from(usersTable)
         .where(eq(usersTable.email, email))
         .limit(1);

      return res.length > 0 ? res[0] : false;
   },

   getUserById: async (userid: string) => {
      const res = await db
         .select()
         .from(usersTable)
         .where(eq(usersTable.userid, userid))
         .limit(1);

      return res.length > 0 ? res[0] : false;
   },

   isSubscribed: async (userid: string) => {
      const res = await db
         .select({ subscribed: usersTable.subscribed })
         .from(usersTable)
         .where(eq(usersTable.userid, userid))
         .limit(1);

      return res.length > 0 ? res[0].subscribed : null;
   },

   insert: async (user: Omit<User, "subscribed" | "userid">) => {
      const res = await db
         .insert(usersTable)
         .values({
            userid: uuid.userid(),
            username: user.username,
            email: user.email,
            password: user.password,
            subscribed: "0",
            created_at: user.created_at
         })
         .returning();

      return res.length === 1;
   },

   subscribeUser: async (userid: string) => {
      const res = await db
         .update(usersTable)
         .set({ subscribed: "1" })
         .where(eq(usersTable.userid, userid))
         .returning();

      return res.length === 1;
   },

   changePwd: async (email: string, newPassword: string) => {
      const res = await db
         .update(usersTable)
         .set({ password: newPassword })
         .where(eq(usersTable.email, email))
         .returning();

      return res.length === 1;
   },

   updateName: async (email: string, newName: string) => {
      const res = await db
         .update(usersTable)
         .set({ username: newName })
         .where(eq(usersTable.email, email))
         .returning();

      return res.length === 1;
   },

   updateEmail: async (email: string, newEmail: string) => {
      const res = await db
         .update(usersTable)
         .set({ email: newEmail })
         .where(eq(usersTable.email, email))
         .returning();

      return res.length === 1;
   },

   resetPwd: async (userid: string, newPassword: string) => {
      const res = await db
         .update(usersTable)
         .set({ password: newPassword })
         .where(eq(usersTable.userid, userid))
         .returning();

      return res.length === 1;
   },

   delete: async (email: string) => {
      const res = await db
         .delete(usersTable)
         .where(eq(usersTable.email, email))
         .returning();

      return res.length === 1;
   }
};