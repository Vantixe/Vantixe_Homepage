/**
 * Meeting booking, one source of truth.
 *
 * Every "book a meeting" button on the site points at BOOK_PATH, a page on our
 * own domain that records the click for advertising measurement and then sends
 * the visitor on to Microsoft Bookings. Only that page may use BOOKING_URL
 * directly; scripts/check-invariants.mjs enforces this on every build.
 */
export const BOOK_PATH = '/book'

export const BOOKING_URL =
  'https://outlook.office.com/bookwithme/user/184e1354d8d240b697a8d06658814a03@vantixe.com?anonymous&ismsaljsauthenabled&ep=plink'
