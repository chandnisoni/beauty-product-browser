var express = require('express');
var util = require('util');
var OperationHelper = require('apac').OperationHelper;
var app = express();
var NodeCache = require( "node-cache" );
var myCache = new NodeCache();

// Load credentials from environment variables
var awsId = process.env.awsId;
var awsSecret = process.env.awsSecret;
var assocId = process.env.assocId;

// Validate credentials
if (awsId === undefined || awsSecret === undefined || assocId === undefined) {
  console.log('Please provide valid aws credentials. Exiting...');
  process.exit(1);
}

// Create helper for interacting with AWS API
var opHelper = new OperationHelper({
    awsId: awsId,
    awsSecret: awsSecret,
    assocId: assocId,
    version: '2013-08-01'
});

// Start server on port 5000
app.set('port', (process.env.PORT || 5000));

// Configure static middleware to service files from /views directory
app.use(express.static(__dirname + '/views'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// GET /browse allows AngularJS to query for items from AWS. Support pagination
// via page query parameter
app.get('/browse', function(request, response){
  // If page query param is undefined, default it to 1
  var page = request.query.page !== undefined ? request.query.page : 1;

  myCache.get(page, function(err, value){
    if(value == undefined){
      // key not found, let's get data from AWS
      opHelper.execute('ItemSearch', {
        'SearchIndex': 'Beauty',
        'BrowseNode': 11060451,
        'ResponseGroup': 'Images,ItemAttributes',
        'ItemPage': page + ''
      }, function(err, results) {
          var items = results["ItemSearchResponse"]["Items"];
          var IsValid = items['Request']['IsValid'];
          if (!IsValid) {
            response.send('Error');
          }
          var totalPages = items["TotalPages"];
          // Simplified response object for AngularJS
          var apiRes = {
            items: [],
            totalPages: totalPages
          };
          var currentItem = null;
          for (var i = 0; i < items['Item'].length; i++) {
            currentItem = items.Item[i];
            try {
              var item = {};
              item.url = currentItem.DetailPageURL;
              if (currentItem.MediumImage !== undefined) {
                item.image = currentItem.MediumImage.URL;
              } else {
                item.image = currentItem.ImageSets.ImageSet.MediumImage.URL;
              }
              item.title = currentItem.ItemAttributes.Title;
            } catch (err) {
              console.log(err);
              console.log(currentItem);
            }
            apiRes.items.push(item);
          }
          myCache.set(page, apiRes, 600, function(err, success){});
          response.json(apiRes);
      });
    } else {
      // Value found, serve it to AngularJS
      response.json(value);
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
