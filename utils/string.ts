export function reverseString (str: string) {
   let newStr = "";
   for (let i = str.length-1; i > -1; i--) {
      newStr += str[i];
   }
   return newStr;
}

export function titlize(str: string) {
   return str[0].toUpperCase() + str.substring(1).toLowerCase();
}