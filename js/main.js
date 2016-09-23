//style the sliders so they're bigger/easier to grab on mobile

var secondsElapsed = 0;
var minutesElapsed = 0;
var cumulativeMoney = 0;
var wagePerSecond, timingVar;



$( document ).ready(function() {
  $('.range-slider').on('input', function() {
    var newValue = $(this).val();
    var label = $( '#' + $(this).attr('id') + '-display');
    var centsVal = $('#cents').val();


    clearInterval(timingVar);
    cumulativeMoney = 0;

    if (($(this).attr('id') === 'cents') && (centsVal.length === 1)) {
      $('#cents-display').html('0' + newValue);
    } else {
      $(label).html(newValue);
    }

    hoursToSeconds();
  });

  function hoursToSeconds() {
    var wagePerHour = parseInt($('#dollar').val()) + "." + parseInt($('#cents').val());
    wagePerSecond = Number((wagePerHour / 3600).toFixed(4));

    $('#seconds-wage').html(wagePerSecond)
    $('#wage-output').css({'display':'block'});
    //
    // // calculate coins needed
    // var quarters = Math.floor(wagePerSecond / 25);
    // wagePerSecond = wagePerSecond - quarters * 25;
    //
    // var dimes = Math.floor(wagePerSecond / 10);
    // wagePerSecond = wagePerSecond  - dimes * 10;
    //
    // var nickels = Math.floor(wagePerSecond / 5);
    // wagePerSecond = wagePerSecond - nickels * 5;
    //
    // var pennies = wagePerSecond;
    //
    // $('#coindiv').empty();
    //
    // for (i = 0; i < quarters; i++) {
    //   $('#coindiv').append('<img class="coin" src="img/25c.svg">').hide().fadeIn('fast');
    // }
    //
    //
    // for (i = 0; i < dimes; i++) {
    //   $('#coindiv').append('<img class="coin" src="img/10c.svg">').hide().fadeIn('fast');
    //
    // }
    //
    // for (i = 0; i < nickels; i++) {
    //   $('#coindiv').append('<img class="coin" src="img/5c.svg">').hide().fadeIn('fast');
    // }
    //
    // for (i = 0; i < pennies; i++) {
    //   $('#coindiv').append('<img class="coin" src="img/1c.svg">').hide().fadeIn('fast');
    // }

    // $('#coindiv').fadeIn('slow');
    //To do: auto scroll down to section to watch pig and coins
//     $('html, body').animate({
//     scrollTop: $("#coindiv").offset().top
// }, 200);
  }

  function counting() {
    var elapsedTime;

    cumulativeMoney = Number((cumulativeMoney += wagePerSecond).toFixed(4));

    $('#elapsedTime').html(elapsedTime);
    $('#cumulativeWage').html(cumulativeMoney);
  }

  $('#startbtn').click(function() {
    clearInterval(timingVar);
    cumulativeMoney = 0;
    timingVar = window.setInterval(counting, 1000);
  });

  $('#stopbtn').click(function() {
    clearInterval(timingVar);
    cumulativeMoney = 0;
  });

  hoursToSeconds();

}); //end ready
