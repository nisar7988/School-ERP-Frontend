import React from 'react';
import { TrendingUp, Users, DollarSign, PieChart, ArrowRight, Wallet, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function PaymentAnalyticsDashboard() {
  const analytics = [
    { label: 'Revenue Growth', value: '+18.4%', sub: 'vs last month', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Total Enrollment', value: '1,240', sub: 'active students', icon: Users, color: 'text-blue-500' },
    { label: 'Collection Rate', value: '84.2%', sub: 'target 90%', icon: Activity, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <PieChart className="w-10 h-10 text-brand-orange" />
          Financial Analytics
        </h1>
        <p className="text-gray-500 font-semibold italic">
          Deep dive into school revenue, collection trends, and payment health.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {analytics.map((item, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl bg-gray-50 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <Badge variant="secondary" className="bg-gray-50 text-gray-400 border-none font-bold">Monthly</Badge>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{item.label}</h3>
              <h2 className="text-4xl font-black text-gray-900 mt-1">{item.value}</h2>
              <p className="text-sm font-bold text-gray-400 italic mt-1">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Collection Breakdown */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-8">
          <h2 className="text-2xl font-black text-gray-900">Collection Breakdown</h2>
          <div className="space-y-6">
            {[
              { label: 'Tuition Fees', value: 85, color: 'bg-brand-orange' },
              { label: 'Exam Fees', value: 65, color: 'bg-blue-500' },
              { label: 'Transport Fees', value: 45, color: 'bg-green-500' },
              { label: 'Hostel Fees', value: 30, color: 'bg-purple-500' },
            ].map((bar, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-900">{bar.label}</span>
                  <span className="text-gray-400">{bar.value}%</span>
                </div>
                <div className="h-3 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${bar.color} rounded-full transition-all duration-1000 delay-300`} 
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Significant Payments */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-gray-900">High-Value Transactions</h2>
            <Button variant="ghost" className="text-brand-orange font-bold hover:bg-orange-50">View All</Button>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Alex Johnson', amount: '$4,200', date: '2 hours ago', status: 'PAID' },
              { name: 'Sarah Williams', amount: '$3,800', date: '5 hours ago', status: 'PAID' },
              { name: 'Michael Brown', amount: '$2,900', date: 'Yesterday', status: 'PARTIAL' },
            ].map((txn, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-black text-gray-400 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                    {txn.name[0]}
                  </div>
                  <div>
                    <span className="block font-black text-gray-900">{txn.name}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{txn.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-black text-gray-900 text-lg">{txn.amount}</span>
                  <Badge variant="secondary" className="bg-green-50 text-green-600 border-none font-bold text-[10px]">{txn.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
