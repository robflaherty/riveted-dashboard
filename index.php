<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Riveted Dashboard - A demo dashboard using data from the Riveted analytics plugin</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="./favicon.ico" rel="shortcut icon">  
  <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/style.css">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>    
  <script src="assets/js/underscore-min.js"></script>
  <script src="assets/js/moment.min.js"></script>

  <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>

  <script>
(function(w,d,s,g,js,fs){
  g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(f){this.q.push(f);}};
  js=d.createElement(s);fs=d.getElementsByTagName(s)[0];
  js.src='https://apis.google.com/js/platform.js';
  fs.parentNode.insertBefore(js,fs);js.onload=function(){g.load('analytics');};
}(window,document,'script'));
</script>

  <?php if ( '127.0.0.1' == $_SERVER["REMOTE_ADDR"]): ?>
    <script src="src/utils.js"></script>
    <script src="src/embed.js"></script>
    <script src="src/reports.js"></script>
    <script src="src/main.js"></script>
  <?php else: ?>
    <script src="assets/js/build.min.js"></script>
  <?php endif; ?>

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-1413210-12', 'auto');
      ga('send', 'pageview');
    </script>

</head>
<body>



<div class="container">

    <div class="row">

      <div class="col-sm-4 intro">
        <div class="block">
          <h1>Riveted Dashboard</h1>
          <p>A simple dashboard showing some of the data points you can get using the <a href="http://riveted.parsnip.io/" target="_blank">Riveted analytics plugin</a>.</p>
        </div>
      </div>
      <div class="col-sm-4 auth">
        <div class="block">
          <h3>Authorize</h3>
          <p class="auth-note">This just allows this page to connect to your Google Analytics account. No data is saved to the server and no one else can see your data.</p>        
          <div id="embed-api-auth-container"></div>
        </div>
      </div>
      <div class="col-sm-4 select-profile">
        <div class="block">
          <h3>Select a Profile</h3>          
          <div id="view-selector-container"></div>
          <div id="view-status" class="hidden">This view doesn't seem to have Riveted installed.</div>          
        </div>
      </div>            


    </div>
  

  <div class="main hidden">
    <div class="row">

      <div class="col-sm-4">
        <div id="date-range" class="block">
          <h3>Date Range</h3>
          <div class="data"><span class="number">Last 30 days</span></div>
        </div>
      </div>      

      <div class="col-sm-4">
        <div id="total-time" class="block">
          <h3>Total Active Time</h3>
          <div class="data"><span class="number"></span> <span class="label"></span></div>
        </div>
      </div>
      <div class="col-sm-4">
        <div id="avg-time" class="block">
          <h3>Average Active Time</h3>
          <div class="data"><span class="number"></span> <span class="label"></span></div>
        </div>
      </div>

</div>
<!-- /row -->

<div class="row">
  <div class="col-sm-6">
    <div id="top-pages" class="block">
      <h3>Top Pages - Total Time</h3>

      <table class="table table-striped table-bordered">
        <thead>
        <tr>
          <th>URL</th>
          <th>Total Time</th>
        </tr>
      </thead>

      </table>
    </div>
  </div>
  <div class="col-sm-6">
    <div id="top-pages-avg" class="block">
      <h3>Top Pages - Average Time</h3>

      <table class="table table-striped table-bordered">
        <thead>
        <tr>
          <th>URL</th>
          <th>Average Time</th>
        </tr>
      </thead>

      </table>
    </div>
  </div>  

</div>
<!-- /row -->

<div class="row">
  <div class="col-sm-6">
    <div id="traffic-sources" class="block">
      <h3>Traffic Sources - Average Time (s)</h3>
      <div class="ct-traffic-sources ct-chart ct-major-tenth"></div>
    </div>
  </div>
  <div class="col-sm-6">
    <div id="device-types" class="block">
      <h3>Device Types - Average Time (s)</h3>
      <div class="ct-device-types ct-chart ct-major-tenth"></div>     
    </div>
  </div>  

</div>
<!-- /row -->

<div class="row">
  <div class="col-sm-4">
    <div id="about" class="block">
      <h3>About</h3>
      <p>This dashboard uses Google's API to retrieve Riveted event data from GA. This is just a demo and isn't meant to be an analysis tool. If you have questions you can try pinging me on Twitter (<a href="https://twitter.com/robflaherty" target="_blank">@robflaherty</a>). If you're interested in building custom dashboards using Riveted or other data sources, let's <a href="https://parsnip.io/" target="_blank">get in touch</a>.</p>
    </div>
  </div>
</div>
<!-- /row -->

</div>

</body>
</html>
