<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatchRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'requesting_team_id',
        'target_team_id',
        'status',
        'proposed_date',
        'proposed_location',
        'message',
        'expires_at',
    ];

    protected $casts = [
        'proposed_date' => 'datetime',
        'expires_at' => 'datetime',
    ];

    public function requestingTeam()
    {
        return $this->belongsTo(Team::class, 'requesting_team_id');
    }

    public function targetTeam()
    {
        return $this->belongsTo(Team::class, 'target_team_id');
    }

    public function accept()
    {
        $this->update(['status' => 'aceptada']);
        
        Match::create([
            'home_team_id' => $this->requesting_team_id,
            'away_team_id' => $this->target_team_id,
            'scheduled_at' => $this->proposed_date,
            'location' => $this->proposed_location,
            'status' => 'programado',
        ]);

        $this->requestingTeam->update(['looking_for_match' => false]);
        $this->targetTeam->update(['looking_for_match' => false]);
    }

    public function reject()
    {
        $this->update(['status' => 'rechazada']);
    }

    public function isExpired()
    {
        return $this->expires_at && $this->expires_at->isPast();
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pendiente');
    }
}
