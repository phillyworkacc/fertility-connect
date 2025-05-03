"use client"
import "@/styles/main.css"
import "@/styles/bmi-calc.css"
import bmiCalculator from "@/utils/bmi";
import { useState } from "react";
import { BMIResultUI } from "@/components/bmi-results-ui/bmi-results-ui";
import AppWrapper from "@/components/app-wrapper/app-wrapper";
import { useSession } from "next-auth/react";
import BackToHome from "@/components/back-to-home/back-to-home";

export default function BMICalculatorForm() {
   const { data: session } = useSession();
   const [weight, setWeight] = useState("0")
   const [height, setHeight] = useState("0")
   const [results, setResults] = useState("")
   const [bmi, setBMI] = useState(0)

   const calculateUserBMI = () => {
      try {
         let { bmi, category, error } = bmiCalculator(parseFloat(weight), parseFloat(height));
         if (!error || error == undefined) {
            setResults(category);
            setBMI(parseFloat(bmi));
         } else setResults(error);
      } catch (error) {
         alert('Please enter a valid weight or height')
      }
   }

	return (
      <AppWrapper username={session?.user?.name!}>
         <div className="bmi-calculator">
            <BackToHome />

            <div className="title">BMI Calculator</div>

            <div className="form-content weight">
               <input 
                  type="number" 
                  name="weight" 
                  placeholder="Weight (kg)" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} />
            </div>

            <div className="form-content height">
               <input 
                  type="number" 
                  name="height" 
                  placeholder="Height (m)" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} />
            </div>

            <div className="form-content">
               <button onClick={() => calculateUserBMI()}>Calculate BMI</button>
            </div>

            {results !== "" ? (<>
               <br /><br />
               <div className="title">Results</div>
               <div><BMIResultUI result={results} bmi={bmi} /></div>
            </>) : (<></>)}
         </div>
      </AppWrapper>
	)
}
