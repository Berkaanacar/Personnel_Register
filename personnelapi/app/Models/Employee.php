<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_name',
        'employee_surname',
        'employee_birthday',
        'employee_birthplace',
        'address_id',
    ];
    public function getAddres()
    {
        return $this->hasMany(Address::class, 'id', 'address_id');
    }
}
