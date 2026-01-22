interface SeoData {
  title: string;
  description: string;
  url: string;
}


export const SEO_ROUTES: { [key: string]: SeoData } = {
  '': { title: 'BuddyRide | Home', description: 'Find carpool rides quickly and easily.', url: '/' },
  'first': { title: 'Get Started | BuddyRide', description: 'Welcome to BuddyRide. Start your journey now.', url: '/first' },
  'home': { title: 'Dashboard | BuddyRide', description: 'Your rides and bookings at a glance.', url: '/home' },
  'search': { title: 'Search a Ride | BuddyRide', description: 'Find carpool rides near you.', url: '/search' },
  'publish-ride': { title: 'Publish a Ride | BuddyRide', description: 'Publish your carpool ride and find passengers.', url: '/publish-ride' },
  'signup': { title: 'Sign Up | BuddyRide', description: 'Create your BuddyRide account to start carpooling.', url: '/signup' },
  'login': { title: 'Login | BuddyRide', description: 'Login to your BuddyRide account.', url: '/login' },
  'forgot': { title: 'Forgot Password | BuddyRide', description: 'Reset your BuddyRide password easily.', url: '/forgot' },
  'reset': { title: 'Reset Password | BuddyRide', description: 'Set a new password for your account.', url: '/reset' },
  'change-pass': { title: 'Change Password | BuddyRide', description: 'Update your BuddyRide account password.', url: '/change-pass' },
  'logout': { title: 'Logout | BuddyRide', description: 'You have successfully logged out.', url: '/logout' },
  'published': { title: 'Published Rides | BuddyRide', description: 'View your published rides.', url: '/published' },
  'book': { title: 'Book a Ride | BuddyRide', description: 'Book a ride with BuddyRide drivers.', url: '/book' },
  'complaint': { title: 'Complaint Box | BuddyRide', description: 'Submit your complaints or feedback.', url: '/complaint' },
  'profile': { title: 'Profile | BuddyRide', description: 'View and edit your BuddyRide profile.', url: '/profile' },
  'pick-up': { title: 'Pick-Up Location | BuddyRide', description: 'Select your pick-up point for rides.', url: '/pick-up' },
  'select-route': { title: 'Select Route | BuddyRide', description: 'Choose your route for carpooling.', url: '/select-route' },
  'term-cond': { title: 'Terms & Conditions | BuddyRide', description: 'Read the BuddyRide terms and conditions.', url: '/term-cond' },
  'blog': { title: 'Blog | BuddyRide', description: 'Read the latest news and tips.', url: '/blog' },
  'safety': { title: 'Safety & Trust | BuddyRide', description: 'Learn about BuddyRide safety measures.', url: '/safety' },
  'calander': { title: 'Ride Calendar | BuddyRide', description: 'Check published ride dates.', url: '/calander' },
  'time': { title: 'Ride Time | BuddyRide', description: 'Set the time for your published rides.', url: '/time' },
  'thanks': { title: 'Thank You | BuddyRide', description: 'Thank you for using BuddyRide.', url: '/thanks' },
  'ride-detail': { title: 'Ride Details | BuddyRide', description: 'View detailed information about rides.', url: '/ride-detail' },
  'my-ride': { title: 'My Rides | BuddyRide', description: 'View your booked rides.', url: '/my-ride' },
  'contact': { title: 'Contact Us | BuddyRide', description: 'Get in touch with BuddyRide support.', url: '/contact' },
  'faqs': { title: 'FAQs | BuddyRide', description: 'Find answers to frequently asked questions.', url: '/faqs' },
  'buddyride-guide': { title: 'BuddyRide Guide', description: 'Learn how to use BuddyRide effectively.', url: '/buddyride-guide' },
};
