<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('match_id')->constrained();
            $table->foreignId('rater_team_id')->constrained('teams');
            $table->foreignId('rated_team_id')->constrained('teams');
            $table->integer('fair_play')->default(5);
            $table->integer('punctuality')->default(5);
            $table->integer('level_accuracy')->default(5);
            $table->text('comment')->nullable();
            $table->timestamps();
            
            $table->unique(['match_id', 'rater_team_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
