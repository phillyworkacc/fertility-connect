"use server"
import fs from "fs";
import path from "path";

export async function saveTipImage(base64: string, imageName: string): Promise<string | false> {
   // handling folder destinations
   const folder = 'tip-image'

   // format to image buffer
   let base64Data = base64.replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, '');

   // get extension
   const match = base64.match(/^data:image\/([a-zA-Z0-9+]+);base64,/);
   let extension = ""
   if (match && match[1]) { extension = match[1]; } // "png", "jpeg", "gif", etc.

   // save into pictures or vendors folder
   try {
      fs.writeFileSync(path.join('public', `${folder}`, `${imageName}.${extension}`), base64Data, 'base64');
      return `${imageName}.${extension}`;
   } catch (err) {
      return false
   }
}