"use client"

import React from 'react'
import { Button } from '@/app/components/dashboard/ui/buttons'
import { FaUpload } from 'react-icons/fa'
import { useTranslations } from 'next-intl'
import { Settings } from 'lucide-react'
import Chart from "@/app/components/dashboard/Charts"
import OutletList from '@/app/components/dashboard/outlets/OutletList'
import MatatuList from '@/app/components/dashboard/matatu/MatatuList'

const DashboardPage = () => {
  const t = useTranslations('DashboardPage')

  // Token for link
  const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null
  const linkHref = `https://advertmanager.tunycemedia.com/?q=${accessToken}`

  return (
    <div className="p-2 bg-red-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#58181C]">{t('title')}</h2>
        <Button
          className="flex items-center gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
          onClick={() => window.location.href = '/dashboard'}
        >
          <Settings size={16} />
          {t('settingsButton')}
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#58181C] mb-4">{t('quickActions.title')}</h3>
        <div className="flex flex-wrap gap-4">
          <Button className="flex items-center gap-2 bg-[#F4C542] font-bold hover:bg-[#E8B93D]" onClick={() => window.location.href = linkHref}>
            <FaUpload size={16} />
            {t('quickActions.uploadAdvertButton')}
          </Button>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow p-4 border border-gray-100">
          <Chart title={t('chart.revenueTitle')} />
        </div>
        <div className="bg-white shadow p-4 border border-gray-100">
          <Chart title={t('chart.adPerformanceTitle')} />
        </div>
      </div>

      {/* Matatus List */}
      <div className="mb-6">
        <MatatuList />
      </div>

      {/* Outlets List */}
      <div className="mb-6">
        <OutletList />
      </div>
    </div>
  )
}

export default DashboardPage
