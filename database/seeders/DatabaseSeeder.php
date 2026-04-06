<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Usuario demo
        $user = User::create([
            'name' => 'Jugador Demo',
            'email' => 'demo@pichangapp.com',
            'password' => Hash::make('password'),
        ]);

        // Equipos de ejemplo
        $teams = [
            [
                'name' => 'Los cracks de Ingeniería',
                'level' => 'intermedio',
                'players_count' => 8,
                'needed_players' => 2,
                'looking_for_match' => true,
                'description' => 'Equipo de la facultad de ingeniería. Jugamos los martes y jueves.',
            ],
            [
                'name' => 'Los Ingenieros del Gol',
                'level' => 'principiante',
                'players_count' => 6,
                'needed_players' => 0,
                'looking_for_match' => true,
                'description' => 'Recién empezando pero con muchas ganas!',
            ],
            [
                'name' => 'FC Arquitectura',
                'level' => 'avanzado',
                'players_count' => 11,
                'needed_players' => 0,
                'looking_for_match' => true,
                'description' => 'Equipo competitivo, buscamos rivales de nivel.',
            ],
        ];

        foreach ($teams as $index => $teamData) {
            $team = Team::create([
                ...$teamData,
                'slug' => 'equipo-' . ($index + 1),
                'captain_id' => $user->id,
                'rating' => rand(35, 50) / 10,
            ]);
            
            $team->players()->attach($user->id, ['role' => 'capitan']);
        }
    }
}
