// put "$" and cents sign onto the track thumbs
//fix the stopping... and class management (should reset when sliders are touched while animation is going)

var secondsElapsed = 0;
var minutesElapsed = 0;
var cumulativeMoney = 0;
var wagePerSecond, timingVar;
var coin = Snap.select('#coin');
var t = new Snap.Matrix();
t.translate(0, 180);
var t2 = new Snap.Matrix();
t2.translate(0, 0);

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

  function startCoinAnimation() {
    coin.transform(t2);
    coin.animate({
      transform: t
    }, 1000, mina.bounce);

    if ($('#startStopBtn').hasClass('startCounter')) {
      coin.stop();
      return;
    }
    setTimeout(startCoinAnimation, 1000);
  }

  function stopCoinAnimation() {
    coin.transform(t2);
  }

  $('#startStopBtn').on('click', function(e) {
    coin.stop();
    e.preventDefault();
    clearInterval(timingVar);
    cumulativeMoney = 0;
    timingVar = window.setInterval(counting, 1000);
    if ($('#startStopBtn').hasClass('startCounter')) { // start
      // $('html, body').animate({
      //   scrollTop: $("#pigdiv").offset().top
      // }, 1000);
      $('#startStopBtn').removeClass('startCounter').addClass('stopCounter').text('Stop Counter');
      startCoinAnimation();
    } else { // stop
      $('#startStopBtn').removeClass('stopCounter').addClass('startCounter').text('Start Counter');
      clearInterval(timingVar);
      cumulativeMoney = 0;
      coin.stop();
      stopCoinAnimation();
    }
  });

  hoursToSeconds();

}); //end ready
