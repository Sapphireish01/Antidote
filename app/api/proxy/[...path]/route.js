import { NextResponse } from "next/server";

const rawTarget =
  process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
const BACKEND_TARGET = (
  rawTarget.startsWith("http://") || rawTarget.startsWith("https://")
    ? rawTarget
    : "http://3.72.105.190"
).replace(/\/+$/, "");

async function handleProxy(req, context) {
  try {
    const params = await context.params;
    const pathSegments = params?.path || [];
    const joinedPath = pathSegments.join("/");

    const urlObj = new URL(req.url);

    // Django REST Framework requires trailing slashes on endpoints.
    // If there is no file extension (like .png or .jpg), enforce the trailing slash.
    const hasExtension = joinedPath.includes(".");
    const needsTrailingSlash = !joinedPath.endsWith("/") && !hasExtension;
    const targetPath = `${joinedPath}${needsTrailingSlash ? "/" : ""}`;
    const targetUrl = `${BACKEND_TARGET}/${targetPath}${urlObj.search}`;

    const headers = new Headers();
    const forwardHeaderNames = [
      "authorization",
      "content-type",
      "accept",
      "user-agent",
    ];

    for (const [key, value] of req.headers.entries()) {
      if (forwardHeaderNames.includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    }

    // Set Host header matching the backend host
    const backendUrlObj = new URL(BACKEND_TARGET);
    headers.set("host", backendUrlObj.host);

    const fetchOptions = {
      method: req.method,
      headers,
      cache: "no-store",
    };

    if (["POST", "PUT", "PATCH"].includes(req.method)) {
      const contentType = req.headers.get("content-type") || "";
      if (contentType.includes("multipart/form-data")) {
        fetchOptions.body = await req.arrayBuffer();
      } else {
        fetchOptions.body = await req.text();
      }
    }

    const backendRes = await fetch(targetUrl, fetchOptions);

    if (backendRes.status === 204) {
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const responseBody = await backendRes.arrayBuffer();
    const responseHeaders = new Headers();

    const forwardResHeaders = [
      "content-type",
      "cache-control",
    ];
    for (const [key, value] of backendRes.headers.entries()) {
      if (forwardResHeaders.includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    }

    responseHeaders.set("Access-Control-Allow-Origin", "*");

    return new NextResponse(responseBody, {
      status: backendRes.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Backend proxy error:", error);
    return NextResponse.json(
      {
        error: "Failed to connect to backend server.",
        details: error.message,
      },
      {
        status: 502,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;
