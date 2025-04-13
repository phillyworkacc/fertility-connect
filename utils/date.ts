export const formatDate = (day: number, month: number, year: number) => {
   const date = new Date(year, month - 1, day);
   return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
   });
}