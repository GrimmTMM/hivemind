document.addEventListener("DOMContentLoaded", function () {
    const terminalOutput = document.getElementById("output");
    const terminalInput = document.getElementById("input");
    const room = document.getElementById('room-code').value;
    const system = "<system> ";
    let lastInput = [];
    let lastIndex = -1;

    Pusher.logToConsole = true;

    const pusher = new Pusher('1e726c147a7930ae2e95', {cluster: 'ap1'});
    const channel = pusher.subscribe('room.' + room);

    channel.bind('chat', function (data) {
        appendToTerminal(["<" + data.user + "> " + data.message]);
    });

    terminalInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            const command = terminalInput.value;
            terminalInput.value = "";
            if(command != '') {
                const output = processCommand(command);
                lastIndex = -1;
                appendToTerminal(output);
            }
        }

        if (event.key === "ArrowUp") {
            if(lastIndex != lastInput.length - 1) {
                lastIndex++;
            }
            if(lastInput[lastIndex] != null) {
                terminalInput.value = lastInput[lastIndex];
                setTimeout(function() {
                    terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length);
                }, 0);
            }
        }
        if (event.key === "ArrowDown") {
            if(lastIndex != 0) {
                lastIndex--;
            }
            if(lastInput[lastIndex] != null) {
                terminalInput.value = lastInput[lastIndex];
                setTimeout(function() {
                    terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length);
                }, 0);
            }
        }
    });

    function appendToTerminal(output) {
        output.forEach(line => {
            const newLine = document.createElement("div");
            newLine.textContent = line;
            terminalOutput.appendChild(newLine);
        });
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function processCommand(command) {
        lastInput.unshift(command);
        command = command.split(" ");
    
        switch (command[0]) {
            case "clear":
                terminalOutput.textContent = "";
                return [""];
            case "help":
                return [
                    system + "help",
                    "me - see currently logged in user's username",
                    "exit - go back to the home terminal",
                    "clear - clear everything on screen",
                    "help - show this helper"
                ];
            case "me":
                return [profile()];
            case "exit":
                const chatRoomURL = `/`;
                window.location.href = chatRoomURL;
                break;
            default:
                return [broadcast(document.getElementById('username').value, command.join(' '))];
        }
    }

    function broadcast(user, message) {
        const requestBody = {
            user: user,
            message: message
        };
    
        fetch("/chat/" + room + "/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
            body: JSON.stringify(requestBody),
        })
    }

    function profile() {
        fetch("/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(errorData.error);
                    });
                }
                return response.json();
            })
            .then((data) => {
                appendToTerminal([system + data.output]);
            })
            .catch((error) => {
                appendToTerminal([system + error.message]);
            });
    }
});
