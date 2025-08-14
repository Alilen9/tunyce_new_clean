"use client";
import React from 'react';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Define the type for a single plan object to fix the TypeScript error
interface Plan {
  nameKey: string;
  priceKey: string;
  featuresKeys: string[];
  isPopular?: boolean;
}

// Data for the different subscription plans.
// The strings are now keys that point to the translation file.
const plansData: Plan[] = [
  {
    nameKey: 'PlansPage.Plans.basic.name',
    priceKey: 'PlansPage.Plans.basic.price',
    featuresKeys: [
      'PlansPage.Plans.basic.features.0',
      'PlansPage.Plans.basic.features.1',
      'PlansPage.Plans.basic.features.2',
      'PlansPage.Plans.basic.features.3',
    ],
  },
  {
    nameKey: 'PlansPage.Plans.pro.name',
    priceKey: 'PlansPage.Plans.pro.price',
    featuresKeys: [
      'PlansPage.Plans.pro.features.0',
      'PlansPage.Plans.pro.features.1',
      'PlansPage.Plans.pro.features.2',
      'PlansPage.Plans.pro.features.3',
      'PlansPage.Plans.pro.features.4',
    ],
    isPopular: true,
  },
  {
    nameKey: 'PlansPage.Plans.enterprise.name',
    priceKey: 'PlansPage.Plans.enterprise.price',
    featuresKeys: [
      'PlansPage.Plans.enterprise.features.0',
      'PlansPage.Plans.enterprise.features.1',
      'PlansPage.Plans.enterprise.features.2',
      'PlansPage.Plans.enterprise.features.3',
      'PlansPage.Plans.enterprise.features.4',
    ],
  },
];

// A reusable Card component to keep the code clean.
// It takes a plan object as a prop and displays the details.
const PlanCard = ({ plan }: { plan: Plan }) => {
  const t = useTranslations();
  const getButtonText = () => {
    return plan.priceKey === 'PlansPage.Plans.enterprise.price'
      ? t('PlansPage.contactSalesButton')
      : t('PlansPage.getStartedButton');
  };

  return (
    <div className={`
      relative
      bg-white
      shadow-lg
      p-8
      flex
      flex-col
      items-center
      text-center
      transform
      transition-transform
      hover:scale-105
      hover:shadow-xl
      cursor-pointer
      ${plan.isPopular ? 'border-4 border-amber-500' : 'border border-gray-200'}
    `}>
      {plan.isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
          {t('PlansPage.mostPopular')}
        </span>
      )}
      <h3 className="text-2xl font-bold text-[#58181C] mb-2">{t(plan.nameKey)}</h3>
      <p className="text-4xl font-extrabold text-gray-800 mb-6">
        {t(plan.priceKey)}
      </p>

      <ul className="text-gray-600 mb-8 w-full text-left">
        {plan.featuresKeys.map((featureKey, index) => (
          <li key={index} className="flex items-center space-x-2 py-1">
            <Check className="h-4 w-4 text-emerald-500" />
            <span className="text-sm">{t(featureKey)}</span>
          </li>
        ))}
      </ul>
      
      <button className={`
        mt-auto
        w-full
        py-3
        px-6
        font-semibold
        shadow-md
        transition-colors
        duration-300
        cursor-pointer
        ${plan.isPopular 
          ? 'bg-amber-500 text-white hover:bg-amber-600'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
      `}>
        {getButtonText()}
      </button>
    </div>
  );
};


// This is the Plans component you originally provided.
// I've added the plan cards and made it responsive.
function Plans() {
  const t = useTranslations('PlansPage');

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#58181C] mb-2">{t('title')}</h2>
        <p className="text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        {plansData.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
}

// This is the main component that renders the Plans dashboard.
// It is set up to be the default export as required.
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Plans />
    </div>
  );
}
