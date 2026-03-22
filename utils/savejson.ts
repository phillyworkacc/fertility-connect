import fs from "fs"

export function saveJson (object: any, filename: string) {
   fs.writeFileSync(filename, JSON.stringify(object), "utf8");
}

export function getDatabaseData (filename: string) {
   return JSON.parse(fs.readFileSync(`${filename}.json`, "utf8"));
}