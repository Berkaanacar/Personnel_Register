<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Address_type;
use App\Models\City;
use App\Models\District;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employee = Employee::get();
        $city = City::select('city_name as label', 'id as value')->get();
        $district = District::select('district_name as label', 'id as value', 'city_id')->get();
        $type = Address_type::select('type as label', 'id as value')->get();
        // $addresstype = Address::select('address_type_id as label', 'id as value')->get();
        return response()->json(['employee' => $employee, 'city' => $city, 'district' => $district, 'type' => $type]);
    }


    public function addType(Request $request)
    {

        $addtype = Address_type::create([
            'type' => $request->type,
        ]);
        return response()->json($addtype);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $address = Address::insertGetId([
            'city_id' => $request->employee['city_id'],
            'district_id' => $request->employee['district_id'],
            'address_type_id' => $request->employee['address_type_id'],
        ]);
        return $address;
        $employee = Employee::create([
            'employee_name' => $request->employee['employee_name'],
            'employee_surname' => $request->employee['employee_surname'],
            'employee_birthday' => $request->employee['employee_birthday'],
            'employee_birthplace' => $request->employee['employee_birthplace'],
            'address_id' => $address
        ]);

        return response()->json(['employee' => $employee, 'address' => $address]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
