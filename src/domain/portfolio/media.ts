export type Image = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
};

/** A screen of a product, as published (personal data already removed). */
export type Screenshot = Image & {
  readonly title: string;
  readonly alt: string;
};
