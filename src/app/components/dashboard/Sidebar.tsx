'use client';

import { links } from '@/constants/constants';
import { Link } from '@/i18n/navigation';
import React, { useEffect, useState } from 'react';

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const logoPlaceholder = '/images/Tun Black.png';

  // Initialize links with default internal URLs
  const [dynamicLinks, setDynamicLinks] = useState(links.map(link => ({
    ...link,
    href: '/dashboard' + link.href,
    external: false,
  })));

  // Handle access token and update links client-side
  useEffect(() => {
    // Process URL query parameter for access token
    const urlParams = new URLSearchParams(window.location.search);
    const accessTokenFromUrl = urlParams.get('q');
    if (accessTokenFromUrl) {
      sessionStorage.setItem('accessToken', accessTokenFromUrl);
      urlParams.delete('q');
      const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}${window.location.hash}`;
      window.history.replaceState({}, '', newUrl);
      console.log('Access token found in URL and saved:', accessTokenFromUrl);
    }

    // Get access token from sessionStorage
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      // Update links for /dashboard and /advert to external URLs
      setDynamicLinks(links.map(link => {
        // if (link.href === '/dashboard' || link.href === '/advert') {
        if (link.href === '/advert') {
          return {
            ...link,
            href: `https://advertmanager.tunycemedia.com/?q=${accessToken}`,
            external: true,
          };
        }
        return { ...link, href: '/dashboard' + link.href, external: false };
      }));
    }
  }, []); // Run only once on mount

  // Use client-side path for active link highlighting
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/dashboard';

  return (
    <aside
      className={`bg-[var(--tunyce-maroon)] text-white h-screen fixed top-0 left-0 transition-all duration-300 z-40
        ${collapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="flex items-center h-16 px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <img src={logoPlaceholder} alt="Tunyce Logo" className="h-14 w-14" />
          {!collapsed && (
            <span className="text-xl font-bold tracking-wide text-white">Tunyce</span>
          )}
        </Link>
      </div>

      <nav className="space-y-2 mt-6 px-2">
        {dynamicLinks.map(({ href, label, icon: Icon, external }) => (
          <a
            key={href}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm cursor-pointer
                ${currentPath === href ? 'bg-red' : 'hover:bg-yellow hover:text-black'}`}
            >
              <Icon size={20} />
              {!collapsed && label}
            </div>
          </a>
        ))}
      </nav>
    </aside>
  );
}