import { uuid } from "@/lib/uui";
import { pool } from "./db";

export const ClinicsDB = {
   approvedClinics: async () => {
     const res = await pool.query(
       "SELECT * FROM clinics WHERE approved = true"
     );
     return res.rows as Clinic[];
   },
 
   unApprovedClinics: async () => {
     const res = await pool.query(
       "SELECT * FROM clinics WHERE approved = false"
     );
     return res.rows as Clinic[];
   },
 
   approveClinic: async (clinicId: string) => {
     const res = await pool.query(
       "UPDATE clinics SET approved = true WHERE clinic_id = $1 AND approved = false",
       [clinicId]
     );
     return res.rowCount === 1;
   },
 
   addClinic: async (params: AddClinicParams) => {
     let { name, email, address, telephone, website, tiktok, instagram, facebook, date } = params;
     const res = await pool.query(
       "INSERT INTO clinics (clinic_id, name, email, address, telephone, website, instagram, facebook, tiktok, date_joined, approved) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
       [
         uuid.clinicid(),
         name,
         email,
         address,
         telephone,
         website || '',
         instagram || '',
         facebook || '',
         tiktok || '',
         date,
         false
       ]
     );
     return res.rowCount === 1;
   }
 };
 