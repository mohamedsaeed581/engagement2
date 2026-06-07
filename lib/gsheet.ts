export interface RSVPData {
  name: string;
  attendance: "yes" | "no";
  guests?: number;
  message?: string;
}

export async function submitRSVP(
  data: RSVPData
): Promise<{ success: boolean; message: string }> {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!url) {
    await new Promise((r) => setTimeout(r, 1200));
    return {
      success: true,
      message:
        "Thank you! (Demo mode — RSVP was not saved. Add NEXT_PUBLIC_GOOGLE_SCRIPT_URL to enable submissions.)",
    };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        attendance: data.attendance,
        guests: data.guests ?? 1,
        message: data.message ?? "",
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }

    const result = (await response.json()) as { success?: boolean };
    if (result.success) {
      return {
        success: true,
        message: "Thank you! Your RSVP has been recorded.",
      };
    }

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  } catch {
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
