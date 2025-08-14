"use client"

import React from 'react'
import { Button } from '@/app/components/dashboard/ui/buttons'
import { FaUpload } from 'react-icons/fa'
import { useTranslations } from 'next-intl'
import { Settings } from 'lucide-react'
import Chart from "@/app/components/dashboard/Charts"

const DashboardPage = () => {
  const t = useTranslations('DashboardPage')

  // Token for link
  const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null
  const linkHref = `https://advertmanager.tunycemedia.com/?q=${accessToken}`

  // Matatu Data
  const matatuData = [
    { id: 1, name: "Matatu One", route: "CBD - Westlands" },
    { id: 2, name: "Matatu Two", route: "CBD - Rongai" },
    { id: 3, name: "Matatu Three", route: "CBD - Thika" },
  ]

  // Outlets Data
  const outletsData = [
    { id: 1, name: "Outlet One", location: "Westlands" },
    { id: 2, name: "Outlet Two", location: "Rongai" },
    { id: 3, name: "Outlet Three", location: "Thika" },
  ]

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

      {/* Matatus Table */}
      <div className="bg-white shadow p-6 mb-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-[#58181C] mb-4">Matatus</h3>
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border-b border-t">ID</th>
              <th className="p-3 border-b border-t">Name</th>
              <th className="p-3 border-b border-t">Route</th>
            </tr>
          </thead>
          <tbody>
            {matatuData.map((matatu) => (
              <tr key={matatu.id} className="hover:bg-gray-50">
                <td className="p-3 border-b text-gray-800">{matatu.id}</td>
                <td className="p-3 border-b text-gray-800">{matatu.name}</td>
                <td className="p-3 border-b text-gray-600">{matatu.route}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Outlets Table */}
      <div className="bg-white shadow p-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-[#58181C] mb-4">Outlets</h3>
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border-b border-t">ID</th>
              <th className="p-3 border-b border-t">Name</th>
              <th className="p-3 border-b border-t">Location</th>
            </tr>
          </thead>
          <tbody>
            {outletsData.map((outlet) => (
              <tr key={outlet.id} className="hover:bg-gray-50">
                <td className="p-3 border-b text-gray-800">{outlet.id}</td>
                <td className="p-3 border-b text-gray-800">{outlet.name}</td>
                <td className="p-3 border-b text-gray-600">{outlet.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DashboardPage
