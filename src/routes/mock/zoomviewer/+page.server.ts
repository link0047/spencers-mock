import parser from "ua-parser-js";

export async function load({ locals }) {
  const ua = parser(locals.ua);
  const isMobile: boolean = ua.device.type === "mobile" || ua.device.type === "tablet";

  return { 
    isMobile,
  }
}