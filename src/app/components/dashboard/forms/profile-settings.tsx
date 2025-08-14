"use client";
import React from 'react';
import { useTranslations } from 'next-intl';

// Dummy form components for different settings categories
export const ProfileSettingsForm = () => {
  const t = useTranslations('SettingsPage.Profile');
  return (
    <div className="bg-white p-6 shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold mb-4">{t('title')}</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('usernameLabel')}</label>
          <input
            type="text"
            placeholder={t('usernamePlaceholder')}
            className="w-full p-3 border border-gray-300 rounded-xl placeholder-gray-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('bioLabel')}</label>
          <textarea
            rows={3}
            placeholder={t('bioPlaceholder')}
            className="w-full p-3 border border-gray-300 rounded-xl placeholder-gray-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('profileImageLabel')}</label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded-xl"
          />
        </div>
        <button className="bg-[var(--tunyce-maroon)] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#A94C4C] transition">
          {t('updateButton')}
        </button>
      </form>
    </div>
  );
};