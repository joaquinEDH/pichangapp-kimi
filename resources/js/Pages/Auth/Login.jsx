import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Iniciar Sesión" />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full px-6">
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-2">⚽</div>
                        <h1 className="text-2xl font-bold text-green-600">PichangApp</h1>
                    </div>

                    <div className="card">
                        <h2 className="text-xl font-semibold mb-6 text-center">Iniciar Sesión</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border-gray-300"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-1">Contraseña</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-lg border-gray-300"
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary w-full"
                            >
                                {processing ? 'Entrando...' : 'Iniciar Sesión'}
                            </button>
                        </form>

                        <div className="mt-4 text-center">
                            <Link href={route('register')} className="text-green-600 hover:underline text-sm">
                                ¿No tienes cuenta? Regístrate
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
