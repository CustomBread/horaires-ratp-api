$(function () {
  var template = _.template($('#page-template').html()),
      $content = $('#content');

  var getData = function () {

    var schedules_url = "https://api-ratp.pierre-grimaud.fr/v3/schedules/rers/a/noisy+le+grand+(mont+d'est)/A";
    var traffic_url   = 'https://api-ratp.pierre-grimaud.fr/v3/traffic/rers/a';

    $.when($.getJSON(schedules_url), $.getJSON(traffic_url)).done(function (schedules, traffic) {
      var date         = new Date(),
          hours        = date.getHours(),
          minutes      = date.getMinutes(),
          current_time = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);

      var trafficResponse  = traffic[0].result,
          scheduleResponse = schedules[0].result;

      var data = {
        traffic     : trafficResponse.message,
        line        : 'A',
        type        : 'rer',
        horaires    : scheduleResponse.schedules,
        destination : 'Paris',
        station     : "Noisy-le-Grand (Mont d'Est)",
        current_time: current_time
      };

      $content.html(template(data));
    });
  };

  getData();
  setInterval(getData, 20000);
});
