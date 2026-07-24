import type { APIRoute } from 'astro';

export const prerender = true;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface NewsletterPayload {
  email?: string;
  type?: string;
  name?: string;
  subject?: string;
  message?: string;
}

function jsonResponse(data: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as NewsletterPayload;
    const type = body.type || 'newsletter';

    if (type === 'contact') {
      const { name, email, subject, message } = body;

      if (!name || name.trim().length < 2) {
        return jsonResponse({ success: false, message: 'Please provide your full name.' }, 400);
      }
      if (!email || !EMAIL_REGEX.test(email.trim())) {
        return jsonResponse({ success: false, message: 'Please provide a valid email address.' }, 400);
      }
      if (!subject) {
        return jsonResponse({ success: false, message: 'Please select a subject.' }, 400);
      }
      if (!message || message.trim().length < 10) {
        return jsonResponse({ success: false, message: 'Message must be at least 10 characters.' }, 400);
      }

      return jsonResponse({
        success: true,
        message: 'Thank you! Your message has been received. We will respond within 2–3 business days.',
      });
    }

    const email = body.email?.trim();
    if (!email || !EMAIL_REGEX.test(email)) {
      return jsonResponse({ success: false, message: 'Please enter a valid email address.' }, 400);
    }

    return jsonResponse({
      success: true,
      message: 'Thanks for subscribing! Check your inbox for a confirmation email.',
    });
  } catch {
    return jsonResponse({ success: false, message: 'Invalid request body.' }, 400);
  }
};

export const GET: APIRoute = () => {
  return jsonResponse({
    success: true,
    message: 'WealthHarbor newsletter API. POST with { "email": "you@example.com" } to subscribe.',
  });
};
