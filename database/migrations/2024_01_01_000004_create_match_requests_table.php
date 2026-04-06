<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('match_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('requesting_team_id')->constrained('teams');
            $table->foreignId('target_team_id')->constrained('teams')->nullable();
            $table->enum('status', ['pendiente', 'aceptada', 'rechazada', 'expirada'])->default('pendiente');
            $table->dateTime('proposed_date');
            $table->string('proposed_location')->nullable();
            $table->text('message')->nullable();
            $table->dateTime('expires_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('match_requests');
    }
};
