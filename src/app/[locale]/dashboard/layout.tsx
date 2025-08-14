'use client';
import Header from "@/app/components/dashboard/header";
import Sidebar from "@/app/components/dashboard/Sidebar";
import { store } from "@/store/store";
import { useState } from "react";
import { Provider } from "react-redux";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <section>
            <Provider store={store}>
                <Sidebar collapsed={collapsed} />
                <div className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
                    <Header onToggle={() => setCollapsed(!collapsed)} />
                    <main className="p-6">{children}</main>
                </div>
            </Provider>
            
        </section>
    );
}