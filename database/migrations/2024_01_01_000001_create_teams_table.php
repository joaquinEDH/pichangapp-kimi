<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('captain_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->enum('level', ['principiante', 'intermedio', 'avanzado', 'pro'])->default('intermedio');
            $table->integer('players_count')->default(0);
            $table->integer('needed_players')->default(0);
            $table->boolean('looking_for_match')->default(false);
            $table->json('preferred_locations')->nullable();
            $table->json('preferred_times')->nullable();
            $table->decimal('rating', 3, 2)->default(5.00);
            $table->integer('matches_played')->default(0);
            $table->integer('wins')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
