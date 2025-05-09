const wait = async (seconds: number) => {
   return new Promise((resolve) => {
      setTimeout(resolve, (seconds * 1000));
   })
}
export default wait;