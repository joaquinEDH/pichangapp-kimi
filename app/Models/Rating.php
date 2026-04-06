<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'match_id',
        'rater_team_id',
        'rated_team_id',
        'fair_play',
        'punctuality',
        'level_accuracy',
        'comment',
    ];

    protected $casts = [
        'fair_play' => 'integer',
        'punctuality' => 'integer',
        'level_accuracy' => 'integer',
    ];

    public function match()
    {
        return $this->belongsTo(Match::class);
    }

    public function raterTeam()
    {
        return $this->belongsTo(Team::class, 'rater_team_id');
    }

    public function ratedTeam()
    {
        return $this->belongsTo(Team::class, 'rated_team_id');
    }

    public function getOverallAttribute()
    {
        return ($this->fair_play + $this->punctuality + $this->level_accuracy) / 3;
    }
}
