var start_date = '30daysAgo';
var end_date = 'today';


function check_for_riveted(profileId) {

  var query = {
    'ids': 'ga:' + profileId,
    'start-date': start_date,
    'end-date': end_date,
    'metrics': 'ga:eventValue, ga:sessions',
    'dimensions': 'ga:eventCategory',
    'filters': 'ga:eventCategory==Riveted'
  };

  gapi.client.analytics.data.ga.get(query).then(function(res) {

    if ('rows' in res.result) {
      console.log('yes')
    }

  });

}

function total_time_report(profileId) {

  var query = {
    'ids': 'ga:' + profileId,
    'start-date': start_date,
    'end-date': end_date,
    'metrics': 'ga:eventValue, ga:sessions',
    'dimensions': 'ga:eventCategory',
    'filters': 'ga:eventCategory==Riveted'
  };

  gapi.client.analytics.data.ga.get(query).then(function(res) {
    var hhmmss = res.result.rows[0][1].toString().toHHMMSS();
    var time = parseInt( (res.result.rows[0][1] / 60).toFixed(0) );
    console.log(time);
    var avg_time = res.result.rows[0][1] / res.result.rows[0][2];
    $('#total-time .data .number').html(moment.duration(time, 'minutes').humanize());
    $('#avg-time .data .number').html(avg_time.toString().toHHMMSS());

  });

}

function time_by_day_report(profileId) {

  var query = {
    'ids': 'ga:' + profileId,
    'start-date': start_date,
    'end-date': end_date,
    'metrics': 'ga:eventValue',
    'dimensions': 'ga:date',
    'filters': 'ga:eventCategory==Riveted'
  };

  gapi.client.analytics.data.ga.get(query).then(function(res) {
    
    var time = (res.result.rows);
    //$('#total-time .data .number').html(formatNumber(time));
    //console.log(time);


    var dates = _.map(time, function(arr){ return arr[0]; });
    var times = _.map(time, function(arr){ return arr[1]; });

    //console.log(dates)
    //console.log(times)

    new Chartist.Line('.ct-chart', {
      labels: dates,
      series: [
        times
      ]
    }, {
      chartPadding: {
        right: 40
      }
    });




  });

}

function pages_report(profileId) {

  var query = {
    'ids': 'ga:' + profileId,
    'start-date': start_date,
    'end-date': end_date,
    'metrics': 'ga:eventValue, ga:uniqueEvents',
    'dimensions': 'ga:eventCategory,ga:pagePath',
    'filters': 'ga:eventCategory==Riveted',
    'sort': '-ga:eventValue'
  };

  gapi.client.analytics.data.ga.get(query).then(function(res) {
    
    var list = res.result.rows;
    var data_total = [];
    var data_avg = [];
    var data = []

    list = list.slice(0, 15);

    list.forEach(function (e) {
      //console.log(e)
      var avg_seconds = Math.floor(e[2]/e[3]);
      var avg_time = avg_seconds.toString().toHHMMSS();
      var total_readable = e[2].toHHMMSS();

      data.push({'page': e[1], 'time': parseInt(e[2], 10), 'sessions': parseInt(e[3]), 'avg_seconds': avg_seconds, 'avg_readable': avg_time, 'total_readable': total_readable });
      //data_avg.push({'page': e[1], 'time': Math.round( e[2]/e[3] ) });
    });

    //var total_pages = _.map(data_total, function(obj){ return obj['page']; });
    //var total_times = _.map(data_total, function(obj){ return obj['time']; });

    var total_time_sorted = _.sortBy(data, 'time').reverse();
    var avg_time_sorted = _.sortBy(data, 'avg_seconds').reverse();

    //console.log(avg_time_sorted)

    var tpl = _.template("<tr><td><%= page %></td><td><%= total_readable %></td></tr>");
    var tpl2 = _.template("<tr><td><%= page %></td><td><%= avg_readable %></td></tr>");
    var html = '';
    var html2 = '';

    _.each(total_time_sorted, function(elem) {
      html += tpl(elem);
    });
    
    _.each(avg_time_sorted, function(elem) {
      html2 += tpl2(elem);
    });    
  

    $('#top-pages table').append(html)
    $('#top-pages-avg table').append(html2)

    /*
    new Chartist.Bar('.ct-chart', {
      labels: total_pages,
      series: [ total_times ]
      }, {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 150
      }
    });

    var sorted = _.sortBy(data_avg, 'time').reverse();
    var avg_pages = _.map(sorted, function(obj){ return obj['page']; });
    var avg_times = _.map(sorted, function(obj){ return obj['time']; });

    new Chartist.Bar('.ct-chart2', {
      labels: avg_pages,
      series: [ avg_times ]
      }, {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 150
      }
    });
    */

  });

}

function traffic_sources(profileId) {

  var query = {
    'ids': 'ga:' + profileId,
    'start-date': start_date,
    'end-date': end_date,
    'metrics': 'ga:eventValue, ga:sessions',
    'dimensions': 'ga:eventCategory, ga:channelGrouping',
    'filters': 'ga:eventCategory==Riveted'
  };

  gapi.client.analytics.data.ga.get(query).then(function(res) {

    var list = res.result.rows;
    var data = []

    list.forEach(function (e) {

      var avg_time = Math.floor(e[2] / e[3]);

      data.push({'type': e[1], 'time': avg_time });

    });

    var types = _.map(data, function(obj){ return obj['type']; });
    var time = _.map(data, function(obj){ return obj['time']; });

    var chart_data = {
      labels: types,
      series: [time]
    };

    new Chartist.Bar('.ct-traffic-sources', chart_data);

  });

}

function device_types(profileId) {

  var query = {
    'ids': 'ga:' + profileId,
    'start-date': start_date,
    'end-date': end_date,
    'metrics': 'ga:eventValue, ga:sessions',
    'dimensions': 'ga:eventCategory, ga:deviceCategory',
    'filters': 'ga:eventCategory==Riveted'
  };

  gapi.client.analytics.data.ga.get(query).then(function(res) {

    var list = res.result.rows;
    var data = []

    list.forEach(function (e) {

      var avg_time = Math.floor(e[2] / e[3]);

      data.push({'type': e[1], 'time': avg_time });

    });

    var types = _.map(data, function(obj){ return obj['type']; });
    var time = _.map(data, function(obj){ return obj['time']; });

    var chart_data = {
      labels: types,
      series: [time]
    };

    new Chartist.Bar('.ct-device-types', chart_data);

  });

}