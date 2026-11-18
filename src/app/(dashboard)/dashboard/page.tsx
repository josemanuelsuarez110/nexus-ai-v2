'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, CreditCard, Activity, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function FintechDashboard() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      if (!supabase) return;

      const { data: accounts } = await supabase.from('accounts').select('*');
      if (accounts) {
        // AÑADIDOS LOS TIPOS : number y : any
        const totalBalance = accounts.reduce((acc: number, curr: any) => acc + Number(curr.balance), 0);
        setBalance(totalBalance);
      }

      const { data: tx } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (tx) {
        setTransactions(tx);
        let inc = 0;
        let exp = 0;
        // AÑADIDO EL TIPO : any
        tx.forEach((t: any) => {
          if (t.amount > 0) inc += Number(t.amount);
          else exp += Math.abs(Number(t.amount));
        });
        setIncome(inc);
        setExpenses(exp);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Panel Financiero</h1>
        <p className="text-slate-400 mt-1">Resumen de tus cuentas y movimientos recientes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 shadow-2xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-400">Balance Total</p>
              <h2 className="text-4xl font-bold text-white mt-2">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
            </div>
            <div className="p-3 bg-indigo-500/20 rounded-xl">
              <Wallet className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-400">
            <ArrowUpRight className="w-4 h-4 mr-1" /> +2.5% este mes
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-400">Ingresos</p>
              <h2 className="text-3xl font-bold text-white mt-2">${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <ArrowUpRight className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">Basado en las últimas transacciones</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-400">Gastos</p>
              <h2 className="text-3xl font-bold text-white mt-2">${expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
            </div>
            <div className="p-3 bg-red-500/10 rounded-xl">
              <ArrowDownRight className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">Basado en las últimas transacciones</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            Transacciones Recientes
          </h2>
        </div>
        
        {transactions.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No hay transacciones aún. Añade datos de prueba en Supabase.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Descripción</th>
                <th className="px-6 py-4 font-medium">Categoría</th>
                <th className="px-6 py-4 font-medium text-right">Monto</th>
                <th className="px-6 py-4 font-medium text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${tx.amount > 0 ? 'bg-emerald-500/10' : 'bg-slate-800'}`}>
                        {tx.amount > 0 ? <ArrowDownRight className="w-4 h-4 text-emerald-400" /> : <CreditCard className="w-4 h-4 text-slate-400" />}
                      </div>
                      <span className="font-medium text-white">{tx.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{tx.category || 'General'}</td>
                  <td className={`px-6 py-4 text-right font-medium ${tx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                    {tx.amount > 0 ? '+' : ''}{Number(tx.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tx.status === 'completed' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'
                    }`}>
                      {tx.status === 'completed' ? 'Completado' : 'Pendiente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
