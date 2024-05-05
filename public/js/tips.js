document.addEventListener("DOMContentLoaded", function () {
    function Counter(elem, delay) {
        var hints = [
            "Press 'tab' to jump to the console input",
            "Use 'help' to explore the commands",
            "Use 'clear' to remove this message",
            "Go to the general room using 'chat general'",
            "Your password will only be shown ONCE. If you forget it your account is gone",
            "Fly through the hive cautiously, there may be naughty bees here",
        ]
        var interval;

        function type(i, t, ie, oe) {
            input = ie;
            document.getElementById(oe).innerHTML += input.charAt(i);
            setTimeout(function () {
                if (i < input.length - 1) {
                    type(i + 1, t, ie, oe);
                }
            }, t);
        }
        
        function calculateTIme(len) { 
            return (-3/7) * len + (2 + (3/7) * 76);

        }

        function updateDisplay() {
            var index = Math.floor(Math.random() * hints.length);
            var tipElement = document.getElementById("tip");
            
            // Clear the content before typing a new sentence
            tipElement.innerHTML = "";
        
            type(0, calculateTIme(hints[index].length), hints[index], "tip");
        }

        function run() {
            updateDisplay();
        }

        function start() {
            updateDisplay();
            interval = window.setInterval(run, delay);
        }
        this.start = start;
    }

    var elem = document.getElementById("tip");
    var counter = new Counter(elem, 10000);
    counter.start();
});
