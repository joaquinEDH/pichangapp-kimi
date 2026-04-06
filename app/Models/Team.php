<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'captain_id',
        'name',
        'slug',
        'description',
        'logo',
        'level',
        'players_count',
        'needed_players',
        'looking_for_match',
        'preferred_locations',
        'preferred_times',
        'rating',
        'matches_played',
        'wins',
    ];

    protected $casts = [
        'looking_for_match' => 'boolean',
        'preferred_locations' => 'array',
        'preferred_times' => 'array',
        'rating' => 'decimal:2',
    ];

    public function captain()
    {
        return $this->belongsTo(User::class, 'captain_id');
    }

    public function players()
    {
        return $this->belongsToMany(User::class, 'player_team')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function homeMatches()
    {
        return $this->hasMany(Match::class, 'home_team_id');
    }

    public function awayMatches()
    {
        return $this->hasMany(Match::class, 'away_team_id');
    }

    public function allMatches()
    {
        return $this->homeMatches->merge($this->awayMatches);
    }

    public function matchRequestsSent()
    {
        return $this->hasMany(MatchRequest::class, 'requesting_team_id');
    }

    public function matchRequestsReceived()
    {
        return $this->hasMany(MatchRequest::class, 'target_team_id');
    }

    public function ratingsReceived()
    {
        return $this->hasMany(Rating::class, 'rated_team_id');
    }

    public function scopeLookingForMatch($query)
    {
        return $query->where('looking_for_match', true);
    }

    public function scopeByLevel($query, $level)
    {
        return $query->where('level', $level);
    }

    public function updateRating()
    {
        $avgRating = $this->ratingsReceived()->avg(
            fn ($r) => ($r->fair_play + $r->punctuality + $r->level_accuracy) / 3
        );
        
        if ($avgRating) {
            $this->update(['rating' => $avgRating]);
        }
    }
}
