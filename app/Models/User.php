<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'position',
        'avatar',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class, 'player_team')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function captainedTeams()
    {
        return $this->hasMany(Team::class, 'captain_id');
    }

    public function isCaptainOf($teamId)
    {
        return $this->teams()
            ->where('teams.id', $teamId)
            ->wherePivot('role', 'capitan')
            ->exists();
    }
}
