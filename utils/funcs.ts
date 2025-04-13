export const zeroNumber = (num: number) => {
   return (num < 10) ? `0${num}` : num;
}

export const bookingToColor = (name: BookingStatus) => {
   const colors = {
      "pending": "#ff9300",
      "cancelled": "#ff1818",
      "completed": "#00b305"
   }
   return colors[name];
}