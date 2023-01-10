
var alphabetUpper = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X',
'Y','Z'
];

var alphabetLower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x',
'y','z'
];

var numerals = ['1','2','3','4','5','6','7','8','9'];

var specialChars = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];

function generatePassword() {

    // Initilizes empty password
    var myPassword = "";
 
    // Gets the length of the password from the user, checks for edgecases
    var length = window.prompt("Enter your password length (must be between 8 and 128 character):");
    if (length < 8 || length > 128) {
        window.alert("Password must be between 8 and 128 characters. Try again.")
        generatePassword();
    }

    // Checks which characters to use in the password
    var includeUpper = window.confirm("Do you want to include uppercase letters in your password?");
    var includeLower = window.confirm("Do you want to include lowercase letters in your password?");
    var includeNumerals = window.confirm("Do you want to include numerals in your password?");
    var includeSpecials = window.confirm("Do you want to include special characters in your password?");

    // Manages edgecase
    if (!includeUpper && !includeLower && !includeNumerals && !includeSpecials) {
        window.alert("You must choose at least one character type.")
        generatePassword();
    }

    // Initilizes allChars array which will hold the approved chars for the password
    var allChars = [];

    // If char type is approved, pushes that char array to allChars array
    if (includeUpper) {
        allChars.push(alphabetUpper);
    }
    if (includeLower) {
        allChars.push(alphabetLower);
    }
    if (includeNumerals) {
        allChars.push(numerals);
    }
    if (includeSpecials) {
        allChars.push(specialChars);
    }

    var count = 0; // Used to prevent infinite loop

    for (var i = 0; i < length; i++) {

        // Randomly selects a char array and char from that array to add to the password.
        var index1 = randomNum(allChars.length);
        var index2 = randomNum(allChars[index1].length);  
        myPassword = myPassword + allChars[index1][index2];

        // When the for loop is on its last iteration, checks the password to make sure it has every approved character type
        if (i === (length - 1)) {
            count++;

            var countUpper = 0;
            var countLower = 0;
            var countSpecials = 0;
            var countNumerals = 0;
            
            // Iterates through the password string, then each array, and counts how many of each char type there is
            for (var j = 0; j < length; j++) {

                for (var t = 0; t < alphabetUpper.length; t++) {
                    if (myPassword[j] === alphabetUpper[t]) {
                        countUpper++;
                    }
                    if (myPassword[j] === alphabetLower[t]) {
                        countLower++;
                    }
                }

                for (var t = 0; t < numerals.length; t++) {
                    if (myPassword[j] === numerals[t]) {
                        countNumerals++;
                    }
                }

                for (var t = 0; t < specialChars.length; t++) {
                    if (myPassword[j] === specialChars[t]) {
                        countSpecials++;
                    }
                }

            }
            
            // If one of the approved char types is not included in the password, resets the password and outermost for loop
            if (includeUpper && (countUpper === 0)) {
                i = -1;
                myPassword = "";
                countUpper = 0;
                countLower = 0;
                countNumerals = 0;
                countSpecials = 0;
            }
            if (includeLower && (countLower === 0)) {
                i = -1;
                myPassword = "";
                countUpper = 0;
                countLower = 0;
                countNumerals = 0;
                countSpecials = 0;
            }
            if (includeNumerals && (countNumerals === 0)) {
                i = -1;
                myPassword = "";
                countUpper = 0;
                countLower = 0;
                countNumerals = 0;
                countSpecials = 0;
            }
            if (includeSpecials && (countSpecials === 0)) {
                i = -1;
                myPassword = "";
                countUpper = 0;
                countLower = 0;
                countNumerals = 0;
                countSpecials = 0;
            }

            // In case of infinite loop
            if (count > 100) {
                break;
            }
        }

    }

    function randomNum(max) {
        return Math.floor(Math.random() * max);
    }

    console.log(myPassword);

    return myPassword;

}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);