import { db } from "@/db";
import { dietTipsTable, lifestyleTipsTable, fertilityTipsTable } from "@/db/schemas";
import { desc } from "drizzle-orm";

export const DietTipsDB = {
   insert: async (title: string, text: string, date: string, image?: string) => {
      const res = await db
         .insert(dietTipsTable)
         .values({
            title, text, image: image || "", date
         })
         .returning();

      return res.length === 1;
   },

   all: async (): Promise<any[] | false> => {
      const res = await db
         .select({
            title: dietTipsTable.title,
            text: dietTipsTable.text,
            image: dietTipsTable.image,
            date: dietTipsTable.date
         })
         .from(dietTipsTable)
         .orderBy(desc(dietTipsTable.id));

      return res.length > 0 ? res : false;
   }
};

export const LifestyleTipsDB = {
   insert: async (title: string, text: string, date: string, image?: string) => {
      const res = await db
         .insert(lifestyleTipsTable)
         .values({
            title,
            text,
            image: image || "",
            date
         })
         .returning();

      return res.length === 1;
   },

   all: async (): Promise<any[] | false> => {
      const res = await db
         .select({
            title: lifestyleTipsTable.title,
            text: lifestyleTipsTable.text,
            image: lifestyleTipsTable.image,
            date: lifestyleTipsTable.date
         })
         .from(lifestyleTipsTable)
         .orderBy(desc(lifestyleTipsTable.id));

      return res.length > 0 ? res : false;
   }
};

export const FertilityTipsDB = {
   insert: async (title: string, text: string, date: string, image?: string) => {
      const res = await db
         .insert(fertilityTipsTable)
         .values({
            title, text, image: image || "", date
         })
         .returning();

      return res.length === 1;
   },

   all: async (): Promise<any[] | false> => {
      const res = await db
         .select({
            title: fertilityTipsTable.title,
            text: fertilityTipsTable.text,
            image: fertilityTipsTable.image,
            date: fertilityTipsTable.date
         })
         .from(fertilityTipsTable)
         .orderBy(desc(fertilityTipsTable.id));

      return res.length > 0 ? res : false;
   },
};