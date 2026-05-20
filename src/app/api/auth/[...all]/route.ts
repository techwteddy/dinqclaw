import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "~/server/auth";
import { checkSignUpRateLimit } from "~/server/clients/ratelimit";

const handler = toNextJsHandler(auth);

function isSignUpRequest(request: Request): boolean {
  const { pathname } = new URL(request.url);
  return pathname.includes("/sign-up");
}

export async function GET(request: Request) {
  return handler.GET(request);
}

export async function POST(request: Request) {
  if (isSignUpRequest(request)) {
    const rateLimited = await checkSignUpRateLimit(request);
    if (rateLimited) return rateLimited;
  }
  return handler.POST(request);
}
