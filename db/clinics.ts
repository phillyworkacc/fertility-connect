import { uuid } from "@/lib/uui";
import { pool } from "./db";

export const ClinicsDB = {
   approvedClinics: async () => {
      const [clinics]: any = await pool.query("SELECT * FROM clinics WHERE `approved` = true;");
      clinics as Clinic[];
      return clinics;
   },

   unApprovedClinics: async () => {
      const [clinics]: any = await pool.query("SELECT * FROM clinics WHERE `approved` = false;");
      clinics as Clinic[];
      return clinics;
   },

   approveClinic: async (clinicId: string) => {
      const data: any = await pool.query(
         "UPDATE clinics SET `approved` = True WHERE `clinic_id` = ? AND `approved` = false;",
         [ clinicId ]
      );
      return (data[0].affectedRows == 1 || data[0].changedRows == 1);
   },

   addClinic: async (params: AddClinicParams) => {
      let { name, email, address, telephone, website, tiktok, instagram, facebook, date } = params;
      const data: any = await pool.query(
         "INSERT INTO clinics (`clinic_id`, `name`, `email`, `address`, `telephone`, `website`, `instagram`, `facebook`, `tiktok`, `date_joined`, `approved`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ", 
         [ uuid.clinicid(), name, email, address, telephone, website || '', instagram || '', facebook || '', tiktok || '', date, false ]
      );
      return (data[0].affectedRows == 1);
   }
}