import { db } from "@/db";
import { eq, and } from "drizzle-orm";
import { uuid } from "@/lib/uui";
import { clinicsTable } from "./schemas";

export const ClinicsDB = {
   approvedClinics: async (): Promise<Clinic[]> => {
      return (await db
         .select()
         .from(clinicsTable)
         .where(eq(clinicsTable.approved, true))) as any[];
   },

   unApprovedClinics: async (): Promise<Clinic[]> => {
      return (await db
         .select()
         .from(clinicsTable)
         .where(eq(clinicsTable.approved, false))) as any[];
   },

   approveClinic: async (clinicId: string) => {
      const res = await db
         .update(clinicsTable)
         .set({ approved: true })
         .where(
            and(
               eq(clinicsTable.clinic_id, clinicId),
               eq(clinicsTable.approved, false)
            )
         )
         .returning();

      return res.length === 1;
   },

   getClinicFromCode: async (clinicCode: string) => {
      const res = await db
         .select()
         .from(clinicsTable)
         .where(eq(clinicsTable.clinic_code, clinicCode))
         .limit(1);

      return res[0] as Clinic;
   },

   getAllClinics: async (): Promise<Clinic[]> => {
      return (await db.select().from(clinicsTable)) as any[];
   },

   addClinic: async (params: AddClinicParams) => {
      const {
			name,
			email,
			type,
			address,
			telephone,
			website,
			tiktok,
			instagram,
			facebook,
			date,
			clinic_code
      } = params;

      const res = await db
         .insert(clinicsTable)
         .values({
            clinic_id: uuid.clinicid(),
            name,
            type,
            email,
            address,
            telephone,
            website: website || "",
            instagram: instagram || "",
            facebook: facebook || "",
            tiktok: tiktok || "",
            date_joined: date,
            approved: false,
            clinic_code
         })
         .returning();

      return res.length === 1;
   },

   updateClinic: async (params: AddClinicParams) => {
      const {
         name,
         email,
         type,
         address,
         telephone,
         website,
         tiktok,
         instagram,
         facebook,
         date,
         clinic_code
      } = params;

      const res = await db
         .update(clinicsTable)
         .set({
            name,
            type,
            email,
            address,
            telephone,
            website: website || "",
            instagram: instagram || "",
            facebook: facebook || "",
            tiktok: tiktok || "",
            date_joined: date
         })
         .where(
            and(
               eq(clinicsTable.clinic_code, clinic_code),
               eq(clinicsTable.approved, true)
            )
         )
         .returning();

      return res.length === 1;
   }
};