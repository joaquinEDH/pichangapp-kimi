# PichangApp ⚽

**Tinder para equipos de fútbol.** Encuentra equipos para jugar partidos en tu universidad.

## Características

- 🔍 **Descubrir equipos** - Busca equipos por nivel (principiante a pro)
- 🎯 **Match/Swipe** - Sistema de "match" entre equipos buscando rival
- 👕 **Gestión de equipos** - Crea tu equipo, administra jugadores
- 📅 **Programar partidos** - Coordina fecha, lugar y condiciones
- ⭐ **Sistema de ratings** - Valora fair play, puntualidad y nivel real

## Tech Stack

- **Backend:** Laravel 11 (PHP 8.2+)
- **Frontend:** React + Inertia.js + Tailwind CSS
- **Database:** SQLite (desarrollo) / MySQL (producción)
- **Auth:** Laravel Sanctum

## Instalación Local

```bash
# 1. Clonar o copiar el proyecto
cd pichangapp

# 2. Instalar dependencias PHP
composer install

# 3. Instalar dependencias JS
npm install

# 4. Configurar entorno
cp .env.example .env
php artisan key:generate

# 5. Crear DB SQLite
touch database/database.sqlite
php artisan migrate

# 6. Correr el proyecto
php artisan serve
npm run dev
```

Visita: http://localhost:8000

## Estructura de Carpetas Importante

```
pichangapp/
├── app/
│   ├── Http/Controllers/    # Lógica de negocio
│   ├── Models/              # Equipos, Partidos, Usuarios
│   └── ...
├── database/migrations/     # Schema de la DB
├── resources/js/Pages/      # Vistas React
├── routes/web.php           # Rutas
└── ...
```

## Modelos Principales

| Modelo | Descripción |
|--------|-------------|
| `User` | Jugadores/Capitanes |
| `Team` | Equipos con nivel, jugadores, rating |
| `Match` | Partidos programados/finalizados |
| `MatchRequest` | Solicitudes de partido (matchmaking) |
| `Rating` | Valoraciones post-partido |

## Features por Hacer (MVP v2)

- [ ] Sistema de chat entre equipos
- [ ] Notificaciones push
- [ ] Geolocalización de canchas
- [ ] Integración con mercadopago (dividir costo)
- [ ] App móvil (React Native)

## Deploy (Railway/Render)

1. Crear proyecto en Railway
2. Conectar repo de GitHub
3. Variables de entorno:
   - `APP_KEY` (generar con `php artisan key:generate --show`)
   - `APP_ENV=production`
   - `DB_CONNECTION=mysql` (Railway provee MySQL)
4. Deploy automático con cada push

---

**Creado por:** JD + IA (vibecoding session)
