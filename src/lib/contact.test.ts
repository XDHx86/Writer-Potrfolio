import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact";

const valid = { name: "A Reader", email: "reader@example.com", subject: "Script enquiry", message: "I would like to discuss a new script project with you.", website: "" };

describe("contact validation", () => {
  it("accepts a complete enquiry", () => { expect(contactSchema.safeParse(valid).success).toBe(true); });
  it("rejects invalid email and short messages", () => { expect(contactSchema.safeParse({ ...valid, email: "bad", message: "short" }).success).toBe(false); });
  it("rejects oversized messages", () => { expect(contactSchema.safeParse({ ...valid, message: "x".repeat(5001) }).success).toBe(false); });
});
