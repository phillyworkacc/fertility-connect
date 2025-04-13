"use client"
import { AlertCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import "./bmi-results-ui.css"

export const BMIResultUI = ({ result, bmi }: { result: BMICategory | string, bmi: number }) => {

   const bmiIcon = () => {
      if (result == "Underweight") return <AlertTriangle />;
      if (result == "Normal Weight") return <CheckCircle />;
      if (result == "Overweight") return <AlertCircle />;
      if (result == "Obesity Class I" || result == "Obesity Class II" || result == "Obesity Class III" || result == "Invalid Input") return <XCircle />;
   }

   const bmiIconColor = () => {
      if (result == "Underweight") return "blue";
      if (result == "Normal Weight") return "green";
      if (result == "Overweight") return "orange";
      if (result == "Obesity Class I" || result == "Obesity Class II" || result == "Obesity Class III" || result == "Invalid Input") return "red";
   }

   const bmiText = () => {
      if (result == "Underweight") return "Consider adding more nutrient-dense foods to your diet to maintain a healthy weight.";
      if (result == "Normal Weight") return "Great job! Keep up your balanced diet and active lifestyle to maintain your health.";
      if (result == "Overweight") return "A small adjustment in diet and exercise can help you reach a healthier weight. Focus on balanced meals and regular movement!";
      if (result == "Obesity Class I" || result == "Obesity Class II" || result == "Obesity Class III") return "Prioritizing a healthy diet and consistent activity can make a big difference. Small changes lead to lasting results!";
      if (result == "Invalid Input") return "";
   }

   return <>
      <div className="bmi-result-ui">
         <div className="bubble">
            <div className="text">
               {result}
               {result == "Invalid Input" ? '' : ` (${bmi})`}
            </div>
            <div className={`icon ${bmiIconColor()}`}>{bmiIcon()}</div>
         </div>
      </div>
      <div className="helpful-text">{bmiText()}</div>
   </>
}
