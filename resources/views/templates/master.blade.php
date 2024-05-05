<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="{{ asset('css/master.css') }}"/>
        <link rel="icon" href="{{ asset('images/icon.png') }}"/>
        <title>HiveMind - @yield('title')</title>
    </head>
    <body>
        <div class="container">
            <img src="{{ asset('images/scanlines.png') }}" class="scanlines">
            <div class="content">
                <div class="terminal-container">
                    <div class="indicator text">
                        @yield('room-indicator')
                    </div>
                    <div class="terminal text" id="output">
                        @yield('content')
                    </div>
                    <table class="input-container">
                        <tr>
                            <td class="left text">
                                <a>></a>
                            </td>
                            <td>
                                <input type="text" class="input text" id="input" placeholder="█">
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </body>
</html>