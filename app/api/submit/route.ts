import { NextRequest, NextResponse } from "next/server";

/**
 * Type guard to check if an unknown error object has a message property.
 *
 * @param error - The error to check.
 * @returns True if error is an object containing a string message property.
 */
function isErrorMessage(error: unknown): error is { message: string } {
  return typeof error === "object" && error !== null && "message" in error;
}

/**
 * Handles POST requests to process business data and forward it to a configured webhook.
 *
 * Expects the request body to contain:
 * - `name`: string (user name)
 * - `businesses`: array of business objects, each with properties like
 *    `business_name`, `business_category`, `business_link`, etc.
 *
 * Validates input and sends each business record as a JSON payload to the webhook URL
 * configured in the `GOOGLE_WEBHOOK_URL` environment variable.
 *
 * Returns a JSON response indicating success or failure.
 *
 * @param req - The incoming Next.js API request.
 * @returns A NextResponse with JSON indicating success or error details.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const webhookUrl = process.env.GOOGLE_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { success: false, message: "Webhook URL not set" },
      { status: 500 }
    );
  }

  const { name, businesses } = body;

  if (!Array.isArray(businesses)) {
    return NextResponse.json(
      { success: false, message: "Invalid businesses format" },
      { status: 400 }
    );
  }

  try {
    const now = new Date().toLocaleString();

    for (const business of businesses) {
      // Build the object with all required keys, mapping business fields exactly
      const row = {
        date_and_time: now,
        name: name ?? "",
        business_name: business.business_name ?? "",
        business_category: business.business_category ?? "",
        business_link: Array.isArray(business.business_link)
          ? business.business_link.join(", ")
          : "",
        business_website: business.business_website ?? "",
        business_number: business.business_number ?? "",
        business_address: business.business_address ?? "",
        business_note: business.business_note ?? "",
        business_owner_name: business.business_owner_name ?? "",
        business_owner_relation: business.business_owner_relation ?? "",
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
      });

      if (!response.ok) {
        throw new Error("Failed to forward a business record to webhook");
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (isErrorMessage(error)) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
