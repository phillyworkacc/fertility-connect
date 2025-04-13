"use server"
import mammoth from "mammoth";

export async function convertWordDocToText (wordDocBuffer: Buffer) {
   try {
      const { value } = await mammoth.extractRawText({ buffer: wordDocBuffer });
      return value;
   } catch (err) {
      return false;
   }
}