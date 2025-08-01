import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("Received request to /api/generate_questions");

    const formData = await request.formData();
    const file = formData.get("file") as File;

    const backendResponse = await fetch(
      "http://127.0.0.1:8000/api/create_questions",
      {
        method: "POST",
        body: formData,
      }
    );
    if (!backendResponse.ok) {
      console.error("Backend returned an error:", backendResponse.statusText);
      return NextResponse.json(
        { message: "Error on backend" },
        { status: backendResponse.status }
      );
    }

    const backendData = await backendResponse.json();
    return NextResponse.json(backendData);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
