'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, FolderGit2, Star, GitFork, ExternalLink, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/github/repos');
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Error cargando proyectos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

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

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <div key={project.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors group">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-lg">
                    <FolderGit2 className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors truncate max-w-[150px]">{project.name}</h3>
                </div>
                <a href={project.url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white"><ExternalLink className="w-4 h-4" /></a>
              </div>
              <p className="text-sm text-slate-400 mt-3 line-clamp-2 h-10">{project.description}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span>{project.language}</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3" />{project.stars}</span>
                <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{project.forks}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
