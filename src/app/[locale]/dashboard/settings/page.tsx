'use client';
import { ContactSettingsForm } from "@/app/components/dashboard/forms/contact-settings";
import { ProfileSettingsForm } from "@/app/components/dashboard/forms/profile-settings";
import { SecuritySettingsForm } from "@/app/components/dashboard/forms/security-settings";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function SettingsPage() {
  const [activeSetting, setActiveSetting] = useState('profile');
  const t = useTranslations('SettingsPage');

  const renderContent = () => {
    switch (activeSetting) {
      case 'profile':
        return <ProfileSettingsForm />;
      case 'contact':
        return <ContactSettingsForm />;
      case 'security':
        return <SecuritySettingsForm />;
      default:
        return <ProfileSettingsForm />;
    }
  };

  const navItems = [
    { id: 'profile', label: t('nav.profile') },
    { id: 'contact', label: t('nav.contact') },
    { id: 'security', label: t('nav.security') },
  ];

  return (
    <div className="min-h-screen bg-red-50 p-2">
      <div className="w-full">
        <h1 className="text-4xl font-extrabold mb-8 text-[var(--tunyce-maroon)]">
          {t('title')}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Settings Navigation Sidebar */}
          <aside className="md:col-span-3 bg-white shadow-sm border border-gray-200 p-4 h-fit">
            <nav>
              <ul>
                {navItems.map((item) => (
                  <li key={item.id} className="mb-2">
                    <button
                      onClick={() => setActiveSetting(item.id)}
                      className={`w-full text-left p-3 font-semibold transition-colors duration-200 ${
                        activeSetting === item.id
                          ? 'bg-[var(--tunyce-maroon)] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Settings Content Area */}
          <main className="md:col-span-9">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
