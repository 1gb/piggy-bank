//bug on $25/hr slide... 42c, 43c, 42c... Eve, your math is wrong please fix it. Love, Eve.

$( document ).ready(function() {
  $('.range-slider').on('input', function() {
    var newValue = $(this).val();
    var label = $( '#' + $(this).attr('id') + '-display');
    var centsVal = $('#cents').val();

    if (($(this).attr('id') === 'cents') && (centsVal.length === 1)) {
      $('#cents-display').html('0' + newValue);
    } else {
      $(label).html(newValue);
    }

    hoursToSeconds();
  });

  function hoursToSeconds() {
    var wagePerHour = parseInt($('#dollar').val()) + "." + parseInt($('#cents').val());
    var wagePerSecond = (wagePerHour / 60).toFixed(2);

    $('#seconds-wage').html(wagePerSecond)
    $('#wage-output').css({'display':'block'});

    //calculate coins needed
    wagePerSecond = Math.round(wagePerSecond * 100);
    var quarters = Math.floor(wagePerSecond / 25);
    wagePerSecond = wagePerSecond - quarters * 25;

    var dimes = Math.floor(wagePerSecond / 10);
    wagePerSecond = wagePerSecond  - dimes * 10;

    var nickels = Math.floor(wagePerSecond / 5);
    wagePerSecond = wagePerSecond - nickels * 5;

    var pennies = wagePerSecond;


    $('#coindiv').empty();

    for (i = 0; i < quarters; i++) {
      $('#coindiv').append('<img class="coin" src="img/25c.svg">').hide().fadeIn('fast');
    }


    for (i = 0; i < dimes; i++) {
      $('#coindiv').append('<img class="coin" src="img/10c.svg">').hide().fadeIn('fast');

    }

    for (i = 0; i < nickels; i++) {
      $('#coindiv').append('<img class="coin" src="img/5c.svg">').hide().fadeIn('fast');
    }

    for (i = 0; i < pennies; i++) {
      $('#coindiv').append('<img class="coin" src="img/1c.svg">').hide().fadeIn('fast');
    }

    // $('#coindiv').fadeIn('slow');
    //To do: auto scroll down to section to watch pig and coins
//     $('html, body').animate({
//     scrollTop: $("#coindiv").offset().top
// }, 200);
  }

  $('#gobtn').click(function() {
    // hoursToSeconds();
  });

}); //end ready
