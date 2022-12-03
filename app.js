const inputDate = document.querySelector(".date-input");
const checkBtn = document.querySelector("#check-btn");
const output = document.querySelector("#output");

function reversedStr(str){
    var listOfChars = str.split('');
    var reversedListOfChars = listOfChars.reverse();
    var reverseString = reversedListOfChars.join('');
    return reverseString; 

}

function isPalindrome(str){
    var strToBeChecked = reversedStr(str);
    return strToBeChecked === str; // returns true if palindrome else false
}

function convertDateToFormattedStr_obj(date){
    var dateStr = { day: '', month:'', year: ''}; 

    //for day
    if(date.day < 10){
        dateStr.day= '0' + date.day.toString();
    }
    else dateStr.day = date.day.toString();

    //for month
    if(date.month < 10){
        dateStr.month = '0' + date.month.toString();
    }
    else dateStr.month = date.month.toString();

    //for year
    dateStr.year = date.year.toString();
    return dateStr;
}

function getDate_AllFormats_str(date){
    var dateStr = convertDateToFormattedStr_obj(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date){
    var arrayOfPalindromes = getDate_AllFormats_str(date);

    var boolFlag = false;

    //loop condition
    for(let index = 0; index < arrayOfPalindromes.length; index++){
        if(isPalindrome(arrayOfPalindromes[index])){
            boolFlag = true;
            break;
        }
    }
    return boolFlag;
}

function isLeapYear(year){
    if(year % 400 == 0){
        return true;
    }
    if(year % 4 == 0){
        return true
    }
    if(year % 100 == 0){
        return false;
    }
    return false;
}

function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //for normal year(non-leap)

    if(month != 2){
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++;
        }
        if(month > 12){
            month = 1;
            year++;
        }
    }
    else{
        if(isLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
            else{
                if(day > 28){
                    day = 1;
                    month++;
                }
            }
        }
    }
    return {
        day : day,
        month : month,
        year : year
    };
}

function getNextPalindrome(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){ //infinite loop
        ctr++;
        var isPalindrome = checkPalindromeForAllFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

function clickHandler(){
    var birthdayStr = inputDate.value; //"2020-10-12"

    if(birthdayStr != ""){
        var dateArray = birthdayStr.split('-');

        var date = {
            day: Number(dateArray[2]),
            month: Number(dateArray[1]),
            year: Number(dateArray[0])
        }

        var isPalindromeFlag = checkPalindromeForAllFormats(date);

        if(isPalindromeFlag){
            output.innerHTML = "Your birthday is a palindrome !!!";
        }
        else{
            var [ctr, nextDate] = getNextPalindrome(date);
            output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
        }

    }
    else{
        output.style.color = "red";
        output.innerHTML = "Please enter your birthdate";
    }
}

checkBtn.addEventListener('click', clickHandler);