import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const purify = DOMPurify(window as any);

export function sanitizeInput(input: string) {
  return purify.sanitize(input);
}