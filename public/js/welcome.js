document.addEventListener("DOMContentLoaded", function () {
    const terminalOutput = document.getElementById("output");
    const terminalInput = document.getElementById("input");
    const system = "<system> ";
    let lastInput = [];
    let lastIndex = -1;

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
    

    function generatePass() {
        let pass = "";
        let str =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
            "abcdefghijklmnopqrstuvwxyz0123456789@#$";

        for (let i = 1; i <= 20; i++) {
            let char = Math.floor(Math.random() * str.length + 1);

            pass += str.charAt(char);
        }

        return pass;
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
                    "register <username> - registers new user, username must be unique",
                    "login <username> <password> - logs in with provided credentials",
                    "chat <room code> - go to a chat room with given code",
                    "logout - logs out of currently logged in user",
                    "me - see currently logged in user's username",
                    "clear - clear everything on screen",
                    "help - show this helper"
                ];
            case "login":
                if(command[1] == null) {
                    return [system + "username argument needed"];
                }
                if(command[2] == null) {
                    return [system + "password argument needed"];
                }
                return [login(command[1], command[2])];
            case "register":
                if (command[1] == null) {
                    return [system + "username argument needed"];
                }
                password = generatePass();
                return [register(command[1], password)];
            case "logout":
                return [logout()];
            case "me":
                return [profile()];
            case "chat":
                if (command[1] == null) {
                    return [system + "room code argument needed"];
                }
                forbidden = ["/", "&", "?", "=", ":", "%", "#", "@"]
                if (forbidden.some(command_arg => command[1].includes(command_arg))) {
                    return [system + "characters /, %, ?, =, :, %, #, @ are not allowed in room code"];
                }
                else {
                    chat(command[1]);
                }
                break;
            default:
                return [system + "command '" + command[0] + "' not found."];
        }
    }    

    function login(username, password) {
        const requestBody = {
            username: username,
            password: password
        };
    
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
            body: JSON.stringify(requestBody),
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

    function register(username, password) {
        const requestBody = {
            username: username,
            password: password
        };
    
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
            body: JSON.stringify(requestBody),
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

    function logout() {    
        fetch("/logout", {
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

    function chat($room) {
        fetch("/chat_confirm/" + $room, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
                const chatRoomURL = `/chat/${data.output}`;
                window.location.href = chatRoomURL;
            })
            .catch((error) => {
                appendToTerminal([system + error.message]);
            });
    }
});
