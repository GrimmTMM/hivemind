<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request) {
        $username = $request->input("username");
        $password = $request->input("password");
        $user = User::where('username', $username);

        if($user->count() <= 0) {
            return response()->json(['error' => 'username not found'], 500);
        }

        $true_password = $user->value('password');

        if(!Hash::check($password, $true_password)) {
            return response()->json(['error' => 'incorrect password'], 500);
        }

        $id = $user->value('id');
        $username = $user->value('username');

        session()->put('id', $id);
        session()->put('username', $username);


        return response()->json(['output' => 'access granted. welcome to the hive, ' . $username]);
    }

    public function register(Request $request) {
        try {
            $user = new User();
            $username = $request->input("username");
            $password = $request->input("password");

            $user->username = $username;
            $user->password = Hash::make($password);
            $user->save();

            return response()->json(['output' => 'registration successful, password: ' . $password]);
        }
        catch (\Exception $e) {
            return response()->json(['error' => 'username is taken'], 500);
        }
    }

    public function logout(Request $request) {
        if(session()->has('id')) {
            session()->forget('id');
            session()->forget('username');
            return response()->json(['output' => 'logged out']);
        }
        return response()->json(['error' => 'not logged in'], 500);
    }

    public function profile(Request $request) {
        if(session()->has('id')) {
            return response()->json(['output' => session('username')]);
        }
        return response()->json(['error' => 'not logged in'], 500);
    }
}
