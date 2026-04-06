export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: 'localhost',
        port: 5173,
    },
});
refresh: true,
        }),
        react(),
    ],
});
