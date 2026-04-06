import { Head, Link } from '@inertiajs/react';

export default function DiscoverIndex({ teams, filters }) {
    return (
        <>
            <Head title="Descubrir Equipos" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold">Descubrir Equipos</h1>
                            <p className="text-gray-600">Encuentra equipos de tu nivel para jugar</p>
                        </div>
                        
                        <Link href={route('discover.swipe')} className="btn-primary">
                            🎲 Modo Swipe
                        </Link>
                    </div>

                    <div className="mb-6 flex gap-2">
                        {['principiante', 'intermedio', 'avanzado', 'pro'].map((level) => (
                            <Link
                                key={level}
                                href={route('discover.index', { level })}
                                className={`px-3 py-1 rounded-full text-sm ${
                                    filters.level === level
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {level}
                            </Link>
                        ))}
                        {filters.level && (
                            <Link
                                href={route('discover.index')}
                                className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700"
                            >
                                ✕ Limpiar
                            </Link>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.data.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <div className="text-6xl mb-4">😔</div>
                                <h3 className="text-xl font-medium mb-2">No hay equipos disponibles</h3>
                                <p className="text-gray-600">Intenta con otros filtros o vuelve más tarde.</p>
                            </div>
                        ) : (
                            teams.data.map((team) => (
                                <div key={team.id} className="card">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            team.level === 'principiante' ? 'bg-green-100 text-green-800' :
                                            team.level === 'intermedio' ? 'bg-yellow-100 text-yellow-800' :
                                            team.level === 'avanzado' ? 'bg-orange-100 text-orange-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {team.level}
                                        </span>
                                        <span className="text-green-600 text-sm font-medium">🔥 Activo</span>
                                    </div>

                                    <Link href={route('teams.show', team.slug)}>
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

                                    <Link
                                        href={route('match-requests.create', team.slug)}
                                        className="btn-primary w-full text-center block"
                                    >
                                        🎯 Jugar contra ellos
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
