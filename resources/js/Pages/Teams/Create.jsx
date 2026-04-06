import { Head, Link, useForm } from '@inertiajs/react';

export default function TeamsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        level: 'intermedio',
        players_count: 7,
        needed_players: 0,
        preferred_locations: [],
        preferred_times: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('teams.store'));
    };

    return (
        <>
            <Head title="Crear Equipo" />
            <div className="py-8">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="card">
                        <h1 className="text-2xl font-bold mb-6">Crear Nuevo Equipo</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Nombre del Equipo *</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-lg border-gray-300"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Descripción</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full rounded-lg border-gray-300"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nivel *</label>
                                    <select
                                        value={data.level}
                                        onChange={(e) => setData('level', e.target.value)}
                                        className="w-full rounded-lg border-gray-300"
                                    >
                                        <option value="principiante">Principiante</option>
                                        <option value="intermedio">Intermedio</option>
                                        <option value="avanzado">Avanzado</option>
                                        <option value="pro">Pro</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Jugadores Actuales *</label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={30}
                                        value={data.players_count}
                                        onChange={(e) => setData('players_count', parseInt(e.target.value))}
                                        className="w-full rounded-lg border-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-1">Jugadores que Faltan</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={10}
                                    value={data.needed_players}
                                    onChange={(e) => setData('needed_players', parseInt(e.target.value))}
                                    className="w-full rounded-lg border-gray-300"
                                />
                            </div>

                            <div className="flex gap-4">
                                <Link href={route('teams.index')} className="btn-secondary flex-1 text-center">
                                    Cancelar
                                </Link>
                                <button type="submit" disabled={processing} className="btn-primary flex-1">
                                    {processing ? 'Creando...' : 'Crear Equipo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
