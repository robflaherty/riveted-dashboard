gapi.analytics.ready(function() {

  /**
   * Authorize the user immediately if the user has already granted access.
   * If no access has been created, render an authorize button inside the
   * element with the ID "embed-api-auth-container".
   */
  gapi.analytics.auth.authorize({
    container: 'embed-api-auth-container',
    clientid: '[ADD YOUR CLIENT ID HERE]'
  });

  gapi.analytics.auth.on('success', function(response) {
    $('.auth-note').hide();
    $('.auth h3').html('Authorized')
  });

  /**
   * Create a new ViewSelector instance to be rendered inside of an
   * element with the id "view-selector-container".
   */
  var viewSelector = new gapi.analytics.ViewSelector({
    container: 'view-selector-container'
  });

  // Render the view selector to the page.
  viewSelector.execute();

  /**
   * Render the dataChart on the page whenever a new view is selected.
   */
  viewSelector.on('change', function(ids) {
    
    var id = ids.substring(3);
    console.log(id)    
    loadReports(id);
    //dataChart.set({query: {ids: ids}}).execute();

  });

});
