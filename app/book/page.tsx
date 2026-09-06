import type { Metadata } from 'next'
import { BookRedirect } from '@/components/contact/BookRedirect'

/**
 * Booking interstitial. Every "book a meeting" button on both domains lands
 * here (see lib/booking.ts) so the visit is recorded on our own domain before
 * the visitor continues to Microsoft Bookings. Counted in LinkedIn Campaign
 * Manager with a page-load rule: URL contains /book.
 */
export const metadata: Metadata = {
  title: 'Book a meeting',
  description: 'Opening the booking calendar for a meeting with Vantixe Advisory.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.vantixe.com/book',
  },
}

export default function BookPage() {
  return <BookRedirect />
}
