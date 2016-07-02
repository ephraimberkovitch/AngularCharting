angular.module("app", ["chart.js"]).controller("LineCtrl", function ($scope,$http) {

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  convertF2C = function(f) {
    c = (f-32) * 5 / 9;
    return Math.round(c);
  }

  getWeatherForCity = function(city) {
      var text = "";
      if (city=="Prague")
          text = "prague, czech republic";
      else if (city=="Jerusalem")
          text = "jerusalem, israel";
      else if (city=="Tel Aviv")
          text = "tel aviv, israel";
      else if (city=="Eilat")
          text = "eilat, israel";
      else if (city=="New York")
          text = "new york, us";
      else if (city=="Brno")
          text = "brno, czech republic";
      var endpoint = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+text+"')&format=json";
      $http.get(endpoint).success(function(data) {
	      console.dir(data.query.results.channel);
          var forecast = data.query.results.channel.item.forecast;
          $scope.title = data.query.results.channel.title;
          $scope.lastBuildDate = data.query.results.channel.lastBuildDate;
          $scope.labels = [];
          $scope.series = ['Low', 'High'];
          $scope.data = [ [], [] ];
          for (var i=0;i<forecast.length;i++)
          {
              $scope.labels.push(forecast[i].date+", "+forecast[i].day);
              $scope.data[0].push(convertF2C(forecast[i].low));
              $scope.data[1].push(convertF2C(forecast[i].high));
          }
      })
  }

  $scope.init = function() {
      $scope.currentCity = 'Prague';
      getWeatherForCity($scope.currentCity);
  }

  $scope.setCity = function(city) {
      $scope.currentCity = city;
      getWeatherForCity($scope.currentCity);
  }


});