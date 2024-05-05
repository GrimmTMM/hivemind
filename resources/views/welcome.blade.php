@extends('templates.master')

<meta name="csrf-token" content="{{ csrf_token() }}">

<link rel="stylesheet" href="{{ asset('css/terminal.css') }}">
<link rel="stylesheet" href="{{ asset('css/welcome.css') }}">
<script src="{{ asset('js/welcome.js') }}"></script>
<script src="{{ asset('js/tips.js') }}"></script>

@section('title', 'Terminal')

@section('room-indicator')
    > welcome.prog
@endsection

@section('content')
    <table class="welcome-message">
        <tr>
            <td class="text" colspan="2">
                <h1>Welcome to <a class="accent">HiveMind</a>.<br><br></h1>
            </td>
        </tr>
        <tr>
            <td class="text">
                <span class="large-welcome">
                    <a class="accent-danger">!!! WARNING !!!</a><br>
                    This site is <a class="accent-danger">NOT</a> safe.<br>
                    There are no validations,<br>
                    no link protection, nothing.<br>
                    It's not meant to be safe.<br>
                    It's meant to be...<br><a class="accent">LIBERATING.</a><br>
                    So liberate yourselves<br>
                    at your own risk.
                </span>
                <span class="small-welcome">
                    <a class="accent-danger">WARNING</a> This site is <a class="accent-danger">NOT</a> safe. There are no validations, no link protection, nothing. It's not meant to be safe. It's meant to be...<br><a class="accent">LIBERATING.</a> So liberate yourselves at your own risk.
                </span>
            </td>
            <td>
                <img src="{{ asset('images/logo.png') }}" class="logo">
            </td>
        </tr>
        <tr class="spacer"></tr>
        <tr>
            <td colspan="2">
                <a class="subtitle" id="tip"></a>
            </td>
        </tr>
    </table>
@endsection