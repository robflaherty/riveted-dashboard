function queryCoreReportingApi(profileId) {
  console.log(profileId);
  total_time_report(profileId);
  pages_report(profileId);
  //time_by_day_report(profileId);
  traffic_sources(profileId);
  device_types(profileId);

}

function loadReports(profileId) {


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
      total_time_report(profileId);
      pages_report(profileId);
      traffic_sources(profileId);
      device_types(profileId);

      $('#view-status').addClass('hidden');
      $('.main').removeClass('hidden');
    } else {
      $('#view-status').removeClass('hidden');
      $('.main').addClass('hidden');
      //$('.intro').removeClass('hidden');
    }

  });




}