<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address_type extends Model
{
    use HasFactory;
    protected $fillable = [
        'type',
    ];
    public function getAddressType()
    {
        return $this->belongsTo(Address::class, 'address_type_id', 'id');
    }
}
