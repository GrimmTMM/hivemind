@extends('templates.master')

<meta name="csrf-token" content="{{ csrf_token() }}">

<link rel="stylesheet" href="{{ asset('css/terminal.css') }}">
<link rel="stylesheet" href="{{ asset('css/welcome.css') }}">
<script src="https://js.pusher.com/7.0/pusher.min.js"></script>
<script type="module" src="{{ asset('js/chat.js') }}"></script>

@section('title')
    Room {{ $room }}
@endsection

@section('room-indicator')
    > room {{ $room }}.prog
@endsection

@section('content')
    <input type="hidden" value="{{ $room }}" id="room-code">
    <input type="hidden" value="{{ session('username') }}" id="username">
    @foreach ($messages as $message)
        &lt;{{ $message->user->username }}&gt; {{ $message->message }}<br>
    @endforeach
@endsection