import React from 'react';
import { GitCommit, GitPullRequest, ShieldAlert, Cpu } from 'lucide-react';

export default function DashboardPage() {
  const metrics = [
    { title: 'Commits (30d)', value: '1,248', icon: GitCommit, trend: '+12%' },
    { title: 'Pull Requests', value: '34', icon: GitPullRequest, trend: '+5%' },
    { title: 'Vulnerabilidades', value: '2', icon: ShieldAlert, trend: '-80%' },
    { title: 'Cobertura de Tests', value: '94%', icon: Cpu, trend: '+2%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Resumen General</h2>
        <p className="text-slate-400 text-sm mt-1">Estado actual de tu infraestructura.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <m.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">{m.trend}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-white">{m.value}</h3>
              <p className="text-sm text-slate-400 mt-1">{m.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 h-96 flex flex-col justify-center items-center text-slate-500">
          Gráfico de Actividad (Placeholder)
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 h-96 flex flex-col justify-center items-center text-slate-500">
          Gráfico de Seguridad (Placeholder)
        </div>
      </div>
    </div>
  );
}
