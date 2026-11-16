'use client';

import React, { useState } from 'react';
import { Search, Plus, FolderGit2, Star, GitFork, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
}

const mockProjects: Project[] = [
  { id: '1', name: 'nexus-ai-v2', description: 'Plataforma DevSecOps con Next.js y Supabase', language: 'TypeScript', stars: 12, forks: 3, url: '#' },
  { id: '2', name: 'api-gateway', description: 'Gateway de microservicios con Go', language: 'Go', stars: 45, forks: 8, url: '#' },
  { id: '3', name: 'security-scanner', description: 'Escáner de vulnerabilidades automatizado', language: 'Python', stars: 89, forks: 21, url: '#' },
];

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const filtered = mockProjects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Proyectos</h2>
          <p className="text-slate-400 text-sm mt-1">Gestiona tus repositorios y su seguridad.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Conectar Repositorio
        </button>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 text-slate-500 absolute left-3 top-2.5" />
        <input
          type="text" placeholder="Buscar proyectos..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <div key={project.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <FolderGit2 className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{project.name}</h3>
              </div>
              <a href={project.url} className="text-slate-500 hover:text-white"><ExternalLink className="w-4 h-4" /></a>
            </div>
            <p className="text-sm text-slate-400 mt-3 line-clamp-2">{project.description}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span>{project.language}</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3" />{project.stars}</span>
              <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{project.forks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
