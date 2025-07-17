import { formatDate } from "./date";

function ovulationCalculator (lastPeriodDate: string, cycleLength: number) {
   if (!lastPeriodDate) return "Invalid Input.";
   if (cycleLength < 21 || cycleLength > 35) return "Cycle length should be between 21 and 35 days.";
   
   let lastPeriod = new Date(lastPeriodDate);
   const ovulationOffset = cycleLength - 14;

   let ovulationDate = new Date(lastPeriod);
   ovulationDate.setDate(lastPeriod.getDate() + ovulationOffset);

   return `Your estimated ovulation date is on ${formatDate(ovulationDate.getDate(), ovulationDate.getMonth() + 1, ovulationDate.getFullYear())}.`;
}
export default ovulationCalculator;