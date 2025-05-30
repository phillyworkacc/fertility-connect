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

   getClinicFromCode: async (clinicCode: string) => {
     const res = await pool.query(
       "SELECT * FROM clinics WHERE clinic_code = $1", [clinicCode]
     );
     return res.rows[0] as Clinic;
   },
 
   addClinic: async (params: AddClinicParams) => {
     let { name, email, type, address, telephone, website, tiktok, instagram, facebook, date, clinic_code } = params;
     const res = await pool.query(
       "INSERT INTO clinics (clinic_id, name, type, email, address, telephone, website, instagram, facebook, tiktok, date_joined, approved, clinic_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
       [
         uuid.clinicid(),
         name,
         type,
         email,
         address,
         telephone,
         website || '',
         instagram || '',
         facebook || '',
         tiktok || '',
         date,
         false,
         clinic_code
       ]
     );
     return res.rowCount === 1;
   },
 
   updateClinic: async (params: AddClinicParams) => {
     let { name, email, type, address, telephone, website, tiktok, instagram, facebook, date, clinic_code } = params;
     const res = await pool.query(
       "UPDATE clinics SET name = $1, type = $2, email = $3, address = $4, telephone = $5, website = $6, instagram = $7, facebook = $8, tiktok = $9, date_joined = $10 WHERE clinic_code = $11 AND approved = true",
       [
         name,
         type,
         email,
         address,
         telephone,
         website || '',
         instagram || '',
         facebook || '',
         tiktok || '',
         date,
         clinic_code
       ]
     );
     return res.rowCount === 1;
   }
 };
 