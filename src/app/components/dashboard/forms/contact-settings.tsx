import { useTranslations } from "next-intl";

export const ContactSettingsForm = () => {
  const t = useTranslations('SettingsPage.Contact');
  return (
    <div className="bg-white p-6 shadow-sm border border-gray-200">
      <h3 className="text-xl font-bold mb-4">{t('title')}</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('emailLabel')}</label>
          <input
            type="email"
            placeholder={t('emailPlaceholder')}
            className="w-full p-3 border border-gray-300 rounded-xl placeholder-gray-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('phoneLabel')}</label>
          <input
            type="tel"
            placeholder={t('phonePlaceholder')}
            className="w-full p-3 border border-gray-300 rounded-xl placeholder-gray-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('companyLabel')}</label>
          <input
            type="text"
            placeholder={t('companyPlaceholder')}
            className="w-full p-3 border border-gray-300 rounded-xl placeholder-gray-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">{t('addressLabel')}</label>
          <input
            type="text"
            placeholder={t('addressPlaceholder')}
            className="w-full p-3 border border-gray-300 rounded-xl placeholder-gray-500"
          />
        </div>
        <button className="bg-[var(--tunyce-maroon)] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#A94C4C] transition">
          {t('updateButton')}
        </button>
      </form>
    </div>
  );
};