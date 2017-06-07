//style the sliders so they're bigger/easier to grab on mobile - I think this is done?
// Centering the text within the wage boxes... messing with flexbox
// Make the cumulative total appear in the middle of the pig!

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
    //this resets the slider, timer, and money count
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
