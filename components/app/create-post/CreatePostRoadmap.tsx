"use client";

import React from "react";
import { Step, Stepper } from "react-form-stepper";
import { useMediaQuery } from "react-responsive";
type StepperProps = {
   activeIndex: number;
   list: string[];
};
export default function CreatePostRoadmap({ activeIndex, list }: StepperProps) {
   const isMobile = useMediaQuery({
      query: "(max-width: 640px)",
   });

   return (
      <div className="max-w-5xl mx-auto flex justify-center items-center py-6">
         <Stepper
            className="w-full"
            activeStep={activeIndex}
            styleConfig={{
               activeBgColor: "#f5b61a",
               activeTextColor: "#094050",
               completedBgColor: "#094050",
               completedTextColor: "#fff",
               inactiveBgColor: "#e0e0e0",
               inactiveTextColor: "#000",
               size: isMobile ? "1.5em" : "2em",
               circleFontSize: isMobile ? "0.75em" : "1em",
               labelFontSize: isMobile ? "0.7em" : "0.875rem",
               borderRadius: "50%",
               fontWeight: 500,
            }}
            connectorStyleConfig={{
               activeColor: "#f5b61a",
               completedColor: "#094050",
               disabledColor: "#bdbdbd",
               size: isMobile ? 0 : 1,
               stepSize: "2em",
               style: "solid",
            }}
         >
            {list.map((step) => (
               <Step key={step} label={step} />
            ))}
         </Stepper>
      </div>
   );
}
