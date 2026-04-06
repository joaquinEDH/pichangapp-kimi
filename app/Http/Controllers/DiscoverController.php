<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscoverController extends Controller
{
    public function index(Request $request)
    {
        $query = Team::with('captain')
            ->lookingForMatch();

        if ($request->has('level')) {
            $query->byLevel($request->level);
        }

        if ($request->has('location')) {
            $query->whereJsonContains('preferred_locations', $request->location);
        }

        $teams = $query->inRandomOrder()
            ->paginate(10);

        $userTeamIds = auth()->check() 
            ? auth()->user()->teams->pluck('id')
            : collect();

        return Inertia::render('Discover/Index', [
            'teams' => $teams,
            'filters' => $request->only(['level', 'location']),
            'userTeamIds' => $userTeamIds,
        ]);
    }

    public function swipe()
    {
        $user = auth()->user();
        $myTeamIds = $user->teams->pluck('id');

        $team = Team::with('captain')
            ->lookingForMatch()
            ->whereNotIn('id', $myTeamIds)
            ->inRandomOrder()
            ->first();

        if (!$team) {
            return Inertia::render('Discover/Empty');
        }

        $myTeams = $user->teams()
            ->where('captain_id', $user->id)
            ->get();

        return Inertia::render('Discover/Swipe', [
            'team' => $team,
            'myTeams' => $myTeams,
        ]);
    }
}
