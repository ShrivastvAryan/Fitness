// app/api/pincode/[pincode]/route.js
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { pincode } = params;

  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch pincode data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error from pincode route:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
