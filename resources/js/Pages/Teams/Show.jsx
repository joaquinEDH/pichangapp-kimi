import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function TeamsShow({ team }) {
    const { auth } = usePage().props;
    const isCaptain = auth.user?.id === team.captain_id;
    
    const { post } = useForm();

    const handleToggleLooking = () => {
        post(route('teams.toggle-looking', team.slug));
    };

    return (
        <>
            <Head title={team.name} />
            <div className="py-8">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="card mb-6">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                                    team.level === 'principiante' ? 'bg-green-100 text-green-800' :
                                    team.level === 'intermedio' ? 'bg-yellow-100 text-yellow-800' :
                                    team.level === 'avanzado' ? 'bg-orange-100 text-orange-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {team.level}
                                </span>
                                <h1 className="text-3xl font-bold">{team.name}</h1>
                            </div>
                            
                            {team.looking_for_match && (
                                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                                    🔥 Buscando Rival
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 mb-6">{team.description || 'Sin descripción'}</p>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold">{team.players_count}</div>
                                <div className="text-sm text-gray-600">Jugadores</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold">{team.rating}⭐</div>
                                <div className="text-sm text-gray-600">Valoración</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold">{team.matches_played}</div>
                                <div className="text-sm text-gray-600">Partidos</div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {isCaptain ? (
                                <>
                                    <Link 
                                        href={route('teams.edit', team.slug)}
                                        className="btn-secondary"
                                    >
                                        Editar Equipo
                                    </Link>
                                    <button
                                        onClick={handleToggleLooking}
                                        className={team.looking_for_match ? "btn-secondary" : "btn-primary"}
                                    >
                                        {team.looking_for_match ? 'Dejar de Buscar' : 'Buscar Rival'}
                                    </button>
                                </>
                            ) : team.looking_for_match && (
                                <Link
                                    href={route('match-requests.create', team.slug)}
                                    className="btn-primary"
                                >
                                    🎯 Solicitar Partido
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-xl font-semibold mb-4">Capitán</h2>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl">
                                👤
                            </div>
                            <div>
                                <div className="font-medium">{team.captain.name}</div>
                                <div className="text-sm text-gray-500">{team.captain.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
