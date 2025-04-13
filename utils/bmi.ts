function bmiCalculator (weight: number, height: number): BMIResults {
   if (weight <= 0 || height <= 0) return {
      category: "Normal Weight",
      bmi: "0",
      error: "Invalid Input"
   };
   
   let bmi = weight / (height ** 2);
   let category: BMICategory = "Normal Weight";

   if (bmi < 18.5) {
      category = "Underweight"
   } else if (bmi < 25) {
      category = "Normal Weight"
   } else if (bmi < 30) {
      category = "Overweight"
   } else if (bmi < 35) {
      category = "Obesity Class I"
   } else if (bmi <= 40) {
      category = "Obesity Class II"
   } else if (bmi > 40) {
      category = "Obesity Class III"
   }

   return {
      category: category,
      bmi: `${bmi.toFixed(2)}`,
      error: undefined
   };
}
export default bmiCalculator;