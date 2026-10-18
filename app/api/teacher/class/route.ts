import { NextResponse } from "next/server";

export async function GET() {
  const classData = {
    className: "Class 10-A",
    studentCount: 42,
    academicAverage: 76,
    growthSignals: {
      focusGrowth: "+14%",
      perseveranceGrowth: "+11%",
      selfRelianceGrowth: "+18%",
      initiativeGrowth: "+7%"
    },
    actionableInterventions: [
      {
        studentName: "Aviral Gupta",
        insight: "Higher independent attempts (+21%), but seeks hints early on open-ended logic.",
        suggestedAction: "Give open-ended assignment where goal is provided but method is not."
      }
    ]
  };

  return NextResponse.json({ success: true, data: classData });
}
