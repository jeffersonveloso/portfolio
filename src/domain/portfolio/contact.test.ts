import { describe, expect, it } from "vitest";
import { mailtoUrl, whatsappUrl, type Contact } from "@/domain/portfolio/contact";

const contact: Contact = {
  email: "ada@example.com",
  emailSubject: "Remote role — let's talk",
  linkedin: "https://www.linkedin.com/in/ada",
  github: "https://github.com/ada",
  whatsapp: { display: "+44 20 7946 0000", digits: "442079460000", greeting: "Hi Ada, let's talk." },
};

describe("mailtoUrl", () => {
  it("prefills the encoded subject", () => {
    expect(mailtoUrl(contact)).toBe("mailto:ada@example.com?subject=Remote%20role%20%E2%80%94%20let's%20talk");
  });

  it("can leave the subject out", () => {
    expect(mailtoUrl(contact, { withSubject: false })).toBe("mailto:ada@example.com");
  });
});

describe("whatsappUrl", () => {
  it("opens a chat with the greeting ready to send", () => {
    expect(whatsappUrl(contact)).toBe("https://wa.me/442079460000?text=Hi%20Ada%2C%20let's%20talk.");
  });

  it("rejects a number that is not digits only", () => {
    const formatted = { ...contact, whatsapp: { ...contact.whatsapp, digits: "+44 20 7946 0000" } };
    expect(() => whatsappUrl(formatted)).toThrow(/digits only/);
  });
});
