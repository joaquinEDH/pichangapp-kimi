<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('player_team', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('team_id')->constrained()->onDelete('cascade');
            $table->enum('role', ['capitan', 'jugador'])->default('jugador');
            $table->timestamps();
            
            $table->unique(['user_id', 'team_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('player_team');
    }
};
