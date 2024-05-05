<?php

namespace App\Http\Controllers;

use App\Events\PusherBroadcast;
use App\Models\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    private $allowed = false;

    public function chat($room) {
        if(!session()->has('id')) {
            return redirect('/403');
        }
        $messages = Message::where('room', $room)->orderBy('created_at')->get();
        return view('chat')->with(['room'=> $room, 'messages' => $messages]);
    }

    public function chat_confirm($room) {
        if(session()->has('id')) {
            return response()->json(['output' => $room]);
        }
        return response()->json(['error' => 'not logged in'], 500);
    }

    public function sendMessage(Request $request, $room) {
        $user = $request->get('user');
        $message = $request->get('message');
        event(new PusherBroadcast($user, $message, $room));
        $new_message = new Message;
        $new_message->user_id = session('id');
        $new_message->room = $room;
        $new_message->message = $message;
        $new_message->save();
    }
}
