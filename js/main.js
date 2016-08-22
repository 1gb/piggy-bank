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
  });

  function hoursToSeconds() {
    var wagePerHour = parseInt($('#dollar').val()) + "." + parseInt($('#cents').val());
    var wagePerSecond = (wagePerHour / 60).toFixed(2);

    $('#seconds-wage').html(wagePerSecond)
    $('#wage-output').css({'display':'block'});

    //calculate coins needed
    wagePerSecond = wagePerSecond * 100;
    var quarters = Math.floor(wagePerSecond / 25);
    wagePerSecond = wagePerSecond - quarters * 25;

    var dimes = Math.floor(wagePerSecond / 10);
    wagePerSecond = wagePerSecond  - dimes * 10;

    var nickels = Math.floor(wagePerSecond / 5);
    wagePerSecond = wagePerSecond - nickels * 5;

    var pennies = wagePerSecond;


    $('#coindiv').empty();

    if (quarters > 0) {
      for (i = 0; i < quarters; i++) {
        $('#coindiv').append('<img class="coin" src="img/25c.svg">');
      }
    }

    if (dimes > 0) {
      for (i = 0; i < dimes; i++) {
        $('#coindiv').append('<img class="coin" src="img/10c.svg">');
      }
    }

    if (nickels > 0) {
      for (i = 0; i < nickels; i++) {
        $('#coindiv').append('<img class="coin" src="img/5c.svg">');
      }
    }

    if (pennies > 0) {
      for (i = 0; i < pennies; i++) {
        $('#coindiv').append('<img class="coin" src="img/1c.svg">');
      }
    }
    //To do: auto scroll down to section to watch pig and coins
    $('html, body').animate({
    scrollTop: $("#coindiv").offset().top
}, 200);
  }

  $('#gobtn').click(function() {
    hoursToSeconds();
  });

}); //end ready
