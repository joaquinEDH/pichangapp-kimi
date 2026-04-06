<?php

namespace App\Http\Controllers;

use App\Models\MatchRequest;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MatchRequestController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $teamIds = $user->teams->pluck('id');

        $received = MatchRequest::with(['requestingTeam', 'requestingTeam.captain'])
            ->whereIn('target_team_id', $teamIds)
            ->pending()
            ->latest()
            ->get();

        $sent = MatchRequest::with(['targetTeam'])
            ->whereIn('requesting_team_id', $teamIds)
            ->latest()
            ->get();

        return Inertia::render('MatchRequests/Index', [
            'received' => $received,
            'sent' => $sent,
        ]);
    }

    public function create($teamSlug)
    {
        $targetTeam = Team::where('slug', $teamSlug)->firstOrFail();
        
        if (!$targetTeam->looking_for_match) {
            return back()->with('error', 'Este equipo no está buscando rival actualmente.');
        }

        $userTeams = auth()->user()->teams()
            ->where('captain_id', auth()->id())
            ->get();

        if ($userTeams->isEmpty()) {
            return redirect()->route('teams.create')
                ->with('error', 'Necesitas ser capitán de un equipo para solicitar un partido.');
        }

        return Inertia::render('MatchRequests/Create', [
            'targetTeam' => $targetTeam,
            'myTeams' => $userTeams,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'requesting_team_id' => 'required|exists:teams,id',
            'target_team_id' => 'required|exists:teams,id|different:requesting_team_id',
            'proposed_date' => 'required|date|after:now',
            'proposed_location' => 'nullable|string|max:255',
            'message' => 'nullable|string|max:500',
        ]);

        $requestingTeam = Team::find($validated['requesting_team_id']);
        
        if ($requestingTeam->captain_id !== auth()->id()) {
            abort(403);
        }

        $validated['status'] = 'pendiente';
        $validated['expires_at'] = now()->addDays(3);

        MatchRequest::create($validated);

        return redirect()->route('match-requests.index')
            ->with('success', 'Solicitud enviada! Espera la respuesta del otro equipo.');
    }

    public function accept($id)
    {
        $matchRequest = MatchRequest::findOrFail($id);
        $user = auth()->user();

        if (!$user->teams->contains($matchRequest->target_team_id)) {
            abort(403);
        }

        $matchRequest->accept();

        return redirect()->route('matches.index')
            ->with('success', 'Partido confirmado! A jugar! ⚽');
    }

    public function reject($id)
    {
        $matchRequest = MatchRequest::findOrFail($id);
        $user = auth()->user();

        if (!$user->teams->contains($matchRequest->target_team_id)) {
            abort(403);
        }

        $matchRequest->reject();

        return back()->with('info', 'Solicitud rechazada.');
    }
}
