(function () {
    alert("Hary Potter!");
    var a = 2;
    var b = 4;
    alert(a + b);
    var fact = 1;
    for (var i = 1; i <= 5; i++) {
        fact = fact * i;
    }
    alert("Factorial of 5 = " + fact);

    var arr = [12, 89, 54, 23, 45, 78, 90, 76, 54, 43];
    var min = arr[0];
    var max = arr[0];
    var f = minMax(arr);

    function minMax(arr) {
        for (var j = 0; j < arr.length; j++) {
            if (arr[j] < min) {
                min = arr[j];
            }

            if (arr[j] > max) {
                max = arr[j];
            }
        }
        return (min + ' ' + max)
    }

    alert(f);


    document.write("Carl Svenson");
    document.write("<ul>");
    for (var i = 0; i < 10; i++) {
        document.write("<li> Hello " + i + "</li>");

    }
    document.write("</ul>");

})();