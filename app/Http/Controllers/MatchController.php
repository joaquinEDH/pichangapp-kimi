<?php

namespace App\Http\Controllers;

use App\Models\Match;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MatchController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $teamIds = $user->teams->pluck('id');

        $upcoming = Match::with(['homeTeam', 'awayTeam'])
            ->where(function ($q) use ($teamIds) {
                $q->whereIn('home_team_id', $teamIds)
                    ->orWhereIn('away_team_id', $teamIds);
            })
            ->upcoming()
            ->orderBy('scheduled_at')
            ->get();

        $finished = Match::with(['homeTeam', 'awayTeam'])
            ->where(function ($q) use ($teamIds) {
                $q->whereIn('home_team_id', $teamIds)
                    ->orWhereIn('away_team_id', $teamIds);
            })
            ->finished()
            ->latest('scheduled_at')
            ->take(10)
            ->get();

        return Inertia::render('Matches/Index', [
            'upcoming' => $upcoming,
            'finished' => $finished,
        ]);
    }

    public function show($id)
    {
        $match = Match::with(['homeTeam', 'awayTeam', 'ratings'])->findOrFail($id);

        return Inertia::render('Matches/Show', [
            'match' => $match,
        ]);
    }

    public function updateScore(Request $request, $id)
    {
        $match = Match::findOrFail($id);
        $user = auth()->user();
        
        $isCaptain = $user->teams->contains($match->home_team_id) || 
                     $user->teams->contains($match->away_team_id);

        if (!$isCaptain) {
            abort(403);
        }

        $validated = $request->validate([
            'home_score' => 'required|integer|min:0',
            'away_score' => 'required|integer|min:0',
        ]);

        $match->update([
            ...$validated,
            'status' => 'finalizado',
        ]);

        $match->homeTeam->increment('matches_played');
        $match->awayTeam->increment('matches_played');

        $winner = $match->winner();
        if ($winner) {
            $winner->increment('wins');
        }

        return back()->with('success', 'Resultado registrado!');
    }
}
