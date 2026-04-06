<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Match extends Model
{
    use HasFactory;

    protected $table = 'matches';

    protected $fillable = [
        'home_team_id',
        'away_team_id',
        'scheduled_at',
        'location',
        'field_type',
        'cost',
        'cost_split',
        'status',
        'home_score',
        'away_score',
        'notes',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'cost' => 'decimal:2',
        'home_score' => 'integer',
        'away_score' => 'integer',
    ];

    public function homeTeam()
    {
        return $this->belongsTo(Team::class, 'home_team_id');
    }

    public function awayTeam()
    {
        return $this->belongsTo(Team::class, 'away_team_id');
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function isUpcoming()
    {
        return $this->scheduled_at->isFuture();
    }

    public function isFinished()
    {
        return $this->status === 'finalizado';
    }

    public function winner()
    {
        if (!$this->isFinished() || $this->home_score === null) {
            return null;
        }
        
        if ($this->home_score > $this->away_score) {
            return $this->homeTeam;
        } elseif ($this->away_score > $this->home_score) {
            return $this->awayTeam;
        }
        return null;
    }

    public function scopeUpcoming($query)
    {
        return $query->where('scheduled_at', '>', now())
            ->whereIn('status', ['programado', 'en_curso']);
    }

    public function scopeFinished($query)
    {
        return $query->where('status', 'finalizado');
    }
}
