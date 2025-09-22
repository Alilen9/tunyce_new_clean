'use client'

import React from 'react'
import { Button } from '@/app/components/dashboard/ui/buttons'
import { FaUpload } from 'react-icons/fa'
import { useTranslations } from 'next-intl'
import Chart from "@/app/components/dashboard/Charts"
import OutletList from '@/app/components/dashboard/outlets/OutletList'
import MatatuList from '@/app/components/dashboard/matatu/MatatuList'

const DashboardPage = () => {
  const t = useTranslations('DashboardPage')

  const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null
  const linkHref = `https://advertmanager.tunycemedia.com/?q=${accessToken}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4 sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#58181C]">
          {t('title')}
        </h1>
        <p className="text-gray-600 sm:text-lg">
          Welcome back! Here's what's happening with your dashboard.
        </p>
      </div>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#58181C] mb-4">
          {t('quickActions.title')}
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-bold px-5 py-3 rounded-xl shadow-md hover:scale-105 transform transition"
            onClick={() => window.location.href = linkHref}
          >
            <FaUpload size={18} />
            {t('quickActions.uploadAdvertButton')}
          </Button>
          {/* You can add more quick action buttons here */}
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 w-full hover:shadow-xl transition">
          <Chart title={t('chart.revenueTitle')} />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 w-full hover:shadow-xl transition">
          <Chart title={t('chart.adPerformanceTitle')} />
        </div>
      </section>

      {/* Matatus List */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#58181C] mb-4">Matatus</h2>
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
          <MatatuList />
        </div>
      </section>

      {/* Outlets List */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-[#58181C] mb-4">Outlets</h2>
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
          <OutletList />
        </div>
      </section>

    </div>
  )
}

export default DashboardPage
