import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN no configurado' }, { status: 500 });
  }

  try {
    const res = await fetch('https://api.github.com/user/repos?sort=updated&per_page=10', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
      next: { revalidate: 60 }, // Cache de 60 segundos
    });

    if (!res.ok) {
      throw new Error(`GitHub API respondió con ${res.status}`);
    }

    const data = await res.json();
    const projects = data.map((repo: any) => ({
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description || 'Sin descripción',
      language: repo.language || 'Desconocido',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
    }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error al conectar con GitHub:', error);
    return NextResponse.json({ error: 'Error al obtener repositorios' }, { status: 500 });
  }
}
