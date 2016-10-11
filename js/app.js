/*window.addEventListener('load', function() {
  var outputElement = document.getElementById('output');
  console.log(outputElement);
  navigator.serviceWorker.register('service-worker.js', { scope: './' })
    .then(function(r) {
      console.log('registered service worker');
    })
    .catch(function(whut) {
      console.error('uh oh... ');
      console.error(whut);
    });
   
  window.addEventListener('beforeinstallprompt', function(e) {
    console.log('Pendiente');
    
    // e.userChoice will return a Promise. For more details read: http://www.html5rocks.com/en/tutorials/es6/promises/
    e.userChoice.then(function(choiceResult) {
      
      console.log(choiceResult.outcome);
      
      if(choiceResult.outcome == 'dismissed') {
        console.log('User cancelled homescreen install');
      }
      else {
        console.log('User added to homescreen');
      }
    });
    
  });
  
});*/