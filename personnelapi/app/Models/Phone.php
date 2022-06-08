<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    use HasFactory;
    protected $fillable = [
        'phone',
        'address_id',
    ];
    public function getPhone()
    {
        return $this->belongsTo(Address::class, 'id', 'address_id');
    }
}
