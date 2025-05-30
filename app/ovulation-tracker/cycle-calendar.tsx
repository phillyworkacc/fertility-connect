'use client';
import { useMemo } from 'react';

interface CycleCalendarProps {
   startDate: string;
   cycleLength?: number;
   periodLength?: number;
}

const getDateArray = (start: Date, length: number) => {
   return Array.from({ length }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d.toDateString();
   });
};

export default function CycleCalendar({
   startDate,
   cycleLength = 28,
   periodLength = 5,
}: CycleCalendarProps) {
   const today = new Date();
   const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
   const monthDays = Array.from({ length: 42 }, (_, i) => {
      const d = new Date(monthStart);
      d.setDate(d.getDate() + i);
      return d;
   });

   const data = useMemo(() => {
      const start = new Date(startDate);
      const ovulation = new Date(start);
      ovulation.setDate(start.getDate() + (cycleLength - 14));

      const fertileWindow = getDateArray(new Date(ovulation.getTime() - 2 * 86400000), 5);
      const periodDays = getDateArray(start, periodLength);
      const ovulationDay = ovulation.toDateString();

      return {
         fertileWindow,
         periodDays,
         ovulationDay,
      };
   }, [startDate, cycleLength, periodLength]);

   const getBgColor = (dateStr: string) => {
      if (data.periodDays.includes(dateStr)) return 'period';
      if (data.fertileWindow.includes(dateStr)) return 'fertile';
      if (dateStr === data.ovulationDay) return 'ovulation';
      return '';
   };

   return (
      <>
         <div className="calendar">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
               <div key={day} className="day-name">{day}</div>
            ))}
            {monthDays.map((date, index) => (
               <div key={index} className={`calendar-day ${getBgColor(date.toDateString())}`}>
                  <span className="day-number">{date.getDate()}</span>
                  <span className="month-label">
                     {date.toLocaleString('default', { month: 'short' })}
                  </span>
               </div>
            ))}
         </div>
         <div className="labels">
            <div className="color-id">
               <div className="color period"></div>
               <span className='text-c-s'>Period</span>
            </div>
            <div className="color-id">
               <div className="color fertile"></div>
               <span className='text-c-s'>Fertile</span>
            </div>
            <div className="color-id">
               <div className="color ovulation"></div>
               <span className='text-c-s'>Ovulation</span>
            </div>
         </div>
         <br />
      </>
   );
}
