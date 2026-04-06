<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::with('captain')
            ->lookingForMatch()
            ->paginate(12);

        return Inertia::render('Teams/Index', [
            'teams' => $teams,
        ]);
    }

    public function show($slug)
    {
        $team = Team::with(['captain', 'players', 'homeMatches', 'awayMatches'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Teams/Show', [
            'team' => $team,
        ]);
    }

    public function create()
    {
        return Inertia::render('Teams/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'level' => 'required|in:principiante,intermedio,avanzado,pro',
            'players_count' => 'required|integer|min:1|max:30',
            'needed_players' => 'nullable|integer|min:0|max:10',
            'preferred_locations' => 'nullable|array',
            'preferred_times' => 'nullable|array',
        ]);

        $validated['slug'] = \Str::slug($validated['name']) . '-' . uniqid();
        $validated['captain_id'] = auth()->id();

        $team = Team::create($validated);
        
        $team->players()->attach(auth()->id(), ['role' => 'capitan']);

        return redirect()->route('teams.show', $team->slug)
            ->with('success', 'Equipo creado exitosamente!');
    }

    public function edit($slug)
    {
        $team = Team::where('slug', $slug)->firstOrFail();
        
        if ($team->captain_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Teams/Edit', [
            'team' => $team,
        ]);
    }

    public function update(Request $request, $slug)
    {
        $team = Team::where('slug', $slug)->firstOrFail();
        
        if ($team->captain_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'level' => 'required|in:principiante,intermedio,avanzado,pro',
            'players_count' => 'required|integer|min:1|max:30',
            'needed_players' => 'nullable|integer|min:0|max:10',
            'looking_for_match' => 'boolean',
            'preferred_locations' => 'nullable|array',
            'preferred_times' => 'nullable|array',
        ]);

        $team->update($validated);

        return redirect()->route('teams.show', $team->slug)
            ->with('success', 'Equipo actualizado!');
    }

    public function toggleLookingForMatch($slug)
    {
        $team = Team::where('slug', $slug)->firstOrFail();
        
        if ($team->captain_id !== auth()->id()) {
            abort(403);
        }

        $team->update([
            'looking_for_match' => !$team->looking_for_match
        ]);

        return back()->with('success', 
            $team->looking_for_match 
                ? 'Ahora estás buscando rival!' 
                : 'Ya no estás buscando rival.'
        );
    }
}
