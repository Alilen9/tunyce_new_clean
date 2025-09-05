import { Home, Tv,Store,Bus, Settings } from "lucide-react";

export const links = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/advert', label: 'Advert', icon: Tv },
  { href: '/outlets', label: 'Outlets', icon: Store },
  { href: '/matatu', label: 'Matatu', icon: Bus },  // ← FIXED THIS
  { href: '/settings', label: 'Settings', icon: Settings },
];

export const plansData = [
  {
    name: 'Basic',
    price: 'ksh 9,000',
    features: [
      'Access to standard features',
      '5 projects',
      'Basic analytics',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: 'Ksh 29,000',
    features: [
      'All Basic features',
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    features: [
      'All Pro features',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
      'On-premise deployment',
    ],
  },
];
