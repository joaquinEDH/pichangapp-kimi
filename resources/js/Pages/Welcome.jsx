import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Bienvenido" />
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-green-600">⚽ PichangApp</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="btn-primary"
                                    >
                                        Ir al Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="btn-secondary">
                                            Iniciar Sesión
                                        </Link>
                                        <Link href={route('register')} className="btn-primary">
                                            Registrarse
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Encuentra equipos para jugar fútbol
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            ¿Te falta gente para completar tu equipo? ¿Buscas rival para un partido? 
                            PichangApp te conecta con equipos de tu nivel en tu universidad.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href={route('discover.index')} className="btn-primary text-lg px-8 py-3">
                                Descubrir Equipos
                            </Link>
                            <Link href={route('register')} className="btn-secondary text-lg px-8 py-3">
                                Crear mi Equipo
                            </Link>
                        </div>
                    </div>

                    <div className="mt-20 grid md:grid-cols-3 gap-8">
                        <div className="card text-center">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold mb-2">Crea tu Equipo</h3>
                            <p className="text-gray-600">Registra tu equipo con tu nivel, horarios y cancha preferida.</p>
                        </div>
                        <div className="card text-center">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-2">Haz Match</h3>
                            <p className="text-gray-600">Encuentra equipos disponibles y solicita un partido con un click.</p>
                        </div>
                        <div className="card text-center">
                            <div className="text-4xl mb-4">🏆</div>
                            <h3 className="text-xl font-semibold mb-2">Juega y Valora</h3>
                            <p className="text-gray-600">Disputa el partido y califica al equipo rival para mejorar la comunidad.</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
