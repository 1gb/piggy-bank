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

    $('#seconds-wage').html(wagePerSecond);
    $('#wage-output').css({'display':'block'});
  }

  function counting() {
    var elapsedTime;

    cumulativeMoney = Number((cumulativeMoney += wagePerSecond).toFixed(4));

    $('#elapsedTime').html(elapsedTime);
    $('#cumulativeWage').html(cumulativeMoney);
  }

  $('#startStopBtn').on('click', function(e) {

    e.preventDefault();
    clearInterval(timingVar);
    cumulativeMoney = 0;
    console.log(this);
    timingVar = window.setInterval(counting, 1000);
    if ($('#startStopBtn').hasClass('startCounter')) {
      $('html, body').animate({
        scrollTop: $("#pigdiv").offset().top
      }, 1000);
      $('#startStopBtn').removeClass('startCounter').addClass('stopCounter').text('Stop Counter');
    } else {
      $('#startStopBtn').removeClass('stopCounter').addClass('startCounter').text('Start Counter');
      clearInterval(timingVar);
      cumulativeMoney = 0;
    }
  });

  hoursToSeconds();

}); //end ready
