<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('home_team_id')->constrained('teams');
            $table->foreignId('away_team_id')->constrained('teams');
            $table->dateTime('scheduled_at');
            $table->string('location')->nullable();
            $table->string('field_type')->default('cancha_7');
            $table->decimal('cost', 10, 2)->nullable();
            $table->enum('cost_split', ['mitades', 'ganador', 'perdedor', 'invitado'])->default('mitades');
            $table->enum('status', ['programado', 'en_curso', 'finalizado', 'cancelado'])->default('programado');
            $table->integer('home_score')->nullable();
            $table->integer('away_score')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
