import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url, language = "en" } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: "URL is required" },
        { status: 400 }
      );
    }

    // Extract video ID from XHS URL
    const videoIdMatch = url.match(/video\/(\d+)/);
    if (!videoIdMatch) {
      return NextResponse.json(
        { success: false, error: "Invalid XHS URL" },
        { status: 400 }
      );
    }

    // TODO: Integrate with actual transcript service
    // For now, return a placeholder
    const transcript = `[Transcript for video ${videoIdMatch[1]}]

This is a placeholder transcript. In production, this would be:
1. Extracted from the video using speech-to-text API
2. Translated to the requested language
3. Formatted and returned

Supported languages: English, Chinese (Simplified), Chinese (Traditional), Spanish, French`;

    return NextResponse.json({
      success: true,
      transcript,
      language,
      videoId: videoIdMatch[1],
    });
  } catch (error) {
    console.error("Transcript error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get transcript" },
      { status: 500 }
    );
  }
}
