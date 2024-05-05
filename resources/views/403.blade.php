@extends('templates.master')

<meta name="csrf-token" content="{{ csrf_token() }}">

<link rel="stylesheet" href="{{ asset('css/terminal.css') }}">
<link rel="stylesheet" href="{{ asset('css/403.css') }}">
<script src="https://js.pusher.com/7.0/pusher.min.js"></script>
<script type="module" src="{{ asset('js/chat.js') }}"></script>

@section('title')
    Naughty
@endsection

@section('room-indicator')
    > Naughty.prog
@endsection

@section('content')
    <div class="center">
        <div>
            <img src="{{ asset('images/403.gif') }}">
        </div>
        <div class="error-text">
            <a class="text big-text">You got 403'd</a><br>
            <a class="text danger">Now get out of here, you naughty scoundrel</a>
        </div>
    </div>
@endsection