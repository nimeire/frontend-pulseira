type ClassValue = string | false | null | undefined;

/** Joins the truthy class names into a single `className` string. */
export function classNames(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
