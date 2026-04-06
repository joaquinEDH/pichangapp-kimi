import { Head, Link } from '@inertiajs/react';

export default function MatchesIndex({ upcoming, finished }) {
    return (
        <>
            <Head title="Mis Partidos" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold mb-6">Mis Partidos</h1>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            📅 Próximos Partidos
                        </h2>
                        
                        {upcoming.length === 0 ? (
                            <div className="card text-center py-8">
                                <p className="text-gray-600">No tienes partidos programados</p>
                                <Link href={route('discover.index')} className="btn-primary mt-4 inline-block">
                                    Buscar Rival
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {upcoming.map((match) => (
                                    <Link key={match.id} href={route('matches.show', match.id)}>
                                        <div className="card hover:shadow-md transition-shadow">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-center">
                                                        <div className="font-semibold">{match.home_team.name}</div>
                                                        <div className="text-sm text-gray-500">Local</div>
                                                    </div>
                                                    <div className="text-2xl font-bold text-gray-400">VS</div>
                                                    <div className="text-center">
                                                        <div className="font-semibold">{match.away_team.name}</div>
                                                        <div className="text-sm text-gray-500">Visita</div>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <div className="text-sm font-medium">
                                                        {new Date(match.scheduled_at).toLocaleDateString('es-CL', {
                                                            weekday: 'short',
                                                            day: 'numeric',
                                                            month: 'short',
                                                        })}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(match.scheduled_at).toLocaleTimeString('es-CL', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {match.location && (
                                                <div className="mt-3 text-sm text-gray-600">
                                                    📍 {match.location}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {finished.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                ✅ Partidos Finalizados
                            </h2>
                            
                            <div className="space-y-4">
                                {finished.map((match) => (
                                    <Link key={match.id} href={route('matches.show', match.id)}>
                                        <div className="card hover:shadow-md transition-shadow opacity-75">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-center">
                                                        <div className="font-semibold">{match.home_team.name}</div>
                                                        <div className="text-xl font-bold">{match.home_score ?? '-'}</div>
                                                    </div>
                                                    <div className="text-gray-400">VS</div>
                                                    <div className="text-center">
                                                        <div className="font-semibold">{match.away_team.name}</div>
                                                        <div className="text-xl font-bold">{match.away_score ?? '-'}</div>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-sm text-gray-500">
                                                    {new Date(match.scheduled_at).toLocaleDateString('es-CL')}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
