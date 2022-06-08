<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('city_id');
            $table->unsignedBigInteger('district_id');
            $table->unsignedBigInteger('address_type_id');
            $table->timestamps();
            $table->foreign('city_id')->on('cities')->references('id')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('district_id')->on('districts')->references('id')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('address_type_id')->on('address_types')->references('id')->onDelete('cascade')->onUpdate('cascade');
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('addresses');
        Schema::enableForeignKeyConstraints();
    }
}
