import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link href={route('discover.index')} className="card hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">🔍</div>
                            <h3 className="text-lg font-semibold">Descubrir</h3>
                            <p className="text-gray-600 text-sm">Buscar equipos rivales</p>
                        </Link>

                        <Link href={route('teams.index')} className="card hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">👕</div>
                            <h3 className="text-lg font-semibold">Mis Equipos</h3>
                            <p className="text-gray-600 text-sm">Gestionar tus equipos</p>
                        </Link>

                        <Link href={route('matches.index')} className="card hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">📅</div>
                            <h3 className="text-lg font-semibold">Partidos</h3>
                            <p className="text-gray-600 text-sm">Ver tus partidos</p>
                        </Link>

                        <Link href={route('match-requests.index')} className="card hover:shadow-md transition-shadow">
                            <div className="text-3xl mb-3">📨</div>
                            <h3 className="text-lg font-semibold">Solicitudes</h3>
                            <p className="text-gray-600 text-sm">Ver invitaciones</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
