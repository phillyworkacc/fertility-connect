import { createHash } from 'crypto'

export const hashPasswordT = (unhashedpwd: string) => {
    return createHash('sha1').update(unhashedpwd).digest('hex');
}

export function generateRandomCode (length = 6) {
   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let result = '';

   for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
   }

   return result;
}