import { Head, Link, useForm } from '@inertiajs/react';

export default function MatchRequestsCreate({ targetTeam, myTeams }) {
    const { data, setData, post, processing, errors } = useForm({
        requesting_team_id: myTeams[0]?.id || '',
        target_team_id: targetTeam.id,
        proposed_date: '',
        proposed_location: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('match-requests.store'));
    };

    return (
        <>
            <Head title="Solicitar Partido" />
            <div className="py-8">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="card">
                        <h1 className="text-2xl font-bold mb-2">Solicitar Partido</h1>
                        <p className="text-gray-600 mb-6">
                            vs <strong>{targetTeam.name}</strong> ({targetTeam.level})
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Tu Equipo *</label>
                                <select
                                    value={data.requesting_team_id}
                                    onChange={(e) => setData('requesting_team_id', e.target.value)}
                                    className="w-full rounded-lg border-gray-300"
                                    required
                                >
                                    {myTeams.map((team) => (
                                        <option key={team.id} value={team.id}>
                                            {team.name} ({team.level})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Fecha y Hora Propuestas *</label>
                                <input
                                    type="datetime-local"
                                    value={data.proposed_date}
                                    onChange={(e) => setData('proposed_date', e.target.value)}
                                    className="w-full rounded-lg border-gray-300"
                                    required
                                />
                                {errors.proposed_date && <p className="text-red-500 text-sm mt-1">{errors.proposed_date}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Lugar / Cancha</label>
                                <input
                                    type="text"
                                    value={data.proposed_location}
                                    onChange={(e) => setData('proposed_location', e.target.value)}
                                    placeholder="Ej: Cancha Universidad, Cancha Parque..."
                                    className="w-full rounded-lg border-gray-300"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-1">Mensaje</label>
                                <textarea
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Ej: ¿Jugamos un partido amistoso? Traemos balón..."
                                    className="w-full rounded-lg border-gray-300"
                                    rows={3}
                                />
                            </div>

                            <div className="flex gap-4">
                                <Link href={route('discover.index')} className="btn-secondary flex-1 text-center">
                                    Cancelar
                                </Link>
                                <button type="submit" disabled={processing} className="btn-primary flex-1">
                                    {processing ? 'Enviando...' : '🎯 Enviar Solicitud'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
