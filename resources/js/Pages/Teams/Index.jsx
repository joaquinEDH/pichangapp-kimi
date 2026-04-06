import { Head, Link, usePage } from '@inertiajs/react';

export default function TeamsIndex({ teams }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Equipos" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">Equipos Buscando Rival</h1>
                        <Link href={route('teams.create')} className="btn-primary">
                            + Crear Equipo
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.data.map((team) => (
                            <div key={team.id} className="card">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                            team.level === 'principiante' ? 'bg-green-100 text-green-800' :
                                            team.level === 'intermedio' ? 'bg-yellow-100 text-yellow-800' :
                                            team.level === 'avanzado' ? 'bg-orange-100 text-orange-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {team.level}
                                        </span>
                                    </div>
                                    {team.looking_for_match && (
                                        <span className="text-green-600 text-sm font-medium">🔥 Buscando rival</span>
                                    )}
                                </div>

                                <Link href={route('teams.show', team.slug)} className="block">
                                    <h3 className="text-xl font-semibold mb-2 hover:text-green-600">
                                        {team.name}
                                    </h3>
                                </Link>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {team.description || 'Sin descripción'}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <span>👥 {team.players_count} jugadores</span>
                                    <span>⭐ {team.rating}</span>
                                </div>

                                {team.needed_players > 0 && (
                                    <div className="text-sm text-orange-600 mb-3">
                                        Necesitan {team.needed_players} jugadores
                                    </div>
                                )}

                                {auth.user && team.captain_id !== auth.user.id && team.looking_for_match && (
                                    <Link
                                        href={route('match-requests.create', team.slug)}
                                        className="btn-primary w-full text-center block"
                                    >
                                        🎯 Solicitar Partido
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
