/** The ways a recruiter can reach the owner. */
export type Contact = {
  readonly email: string;
  /** Subject prefilled when a visitor emails from the page. */
  readonly emailSubject: string;
  readonly linkedin: string;
  readonly github: string;
  readonly whatsapp: {
    /** The number as people read it. */
    readonly display: string;
    /** Country code and number, digits only, as wa.me expects them. */
    readonly digits: string;
    /** The first message, ready to send. */
    readonly greeting: string;
  };
};

export function mailtoUrl(contact: Contact, { withSubject = true } = {}): string {
  const subject = withSubject ? `?subject=${encodeURIComponent(contact.emailSubject)}` : "";
  return `mailto:${contact.email}${subject}`;
}

export function whatsappUrl({ whatsapp }: Contact): string {
  if (!/^\d+$/.test(whatsapp.digits)) throw new Error(`WhatsApp number must be digits only: ${whatsapp.digits}`);
  return `https://wa.me/${whatsapp.digits}?text=${encodeURIComponent(whatsapp.greeting)}`;
}
