@extends('templates.master')

<meta name="csrf-token" content="{{ csrf_token() }}">

<link rel="stylesheet" href="{{ asset('css/terminal.css') }}">
<link rel="stylesheet" href="{{ asset('css/403.css') }}">
<script src="https://js.pusher.com/7.0/pusher.min.js"></script>
<script type="module" src="{{ asset('js/chat.js') }}"></script>

@section('title')
    Lost
@endsection

@section('room-indicator')
    > Lost.prog
@endsection

@section('content')
    <div class="center">
        <div>
            <img src="{{ asset('images/404.gif') }}">
        </div>
        <div class="error-text">
            <a class="text big-text">You got 404'd</a><br>
            <a class="text danger">You flew too far off the hive</a>
        </div>
    </div>
@endsection