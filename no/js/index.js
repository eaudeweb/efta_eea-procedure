var glossary;

(function() {

  glossary = document.createElement('html');
  var request = new XMLHttpRequest();
  request.open('GET', '/no/glossary/', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      glossary.innerHTML = request.responseText;
    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();

}());

(function() {
  var Tooltip = {};
  var tooltipIsVisible = false;
  var intent;


  var tooltipElement = document.createElement('div');
  
  tooltipElement.classList.add('tooltip');
  tooltipElement.style.display = 'none';
  document.body.appendChild(tooltipElement);

  var popper;

  var activeElement;
  var activeElementTitle = '';

  function showTooltip(referenceElement) {

    tooltipIsVisible = true;

    // remove title
    activeElement = referenceElement;
    activeElementTitle = referenceElement.getAttribute('title');
    referenceElement.title = '';

    var id = referenceElement.href.split('#').pop();

    var term = glossary.querySelector('#' + id);
    var definition = term.nextElementSibling;

    tooltipElement.innerHTML =
      '<strong>' + term.innerHTML + ' — </strong>' +
      definition.innerHTML
    ;

    tooltipElement.style.visibility = 'hidden';
    tooltipElement.style.display = 'block';

    popper = new Popper(referenceElement, tooltipElement, {
      placement: 'top'
    });

    tooltipElement.style.visibility = '';
  }

  function hideTooltip() {

    // add title back
    if (activeElement)
      activeElement.title = activeElementTitle;

    tooltipElement.style.display = 'none';
    tooltipIsVisible = false;
  }

  var links = document.querySelectorAll('a.tip-glossary');


  var intentShow;
  var intentHide;

  Array.prototype.forEach.call(links, function(link) {
    link.addEventListener('mouseover', function() {
      var referenceElement = this;

      if (intentHide) {
        clearTimeout(intentHide);
        intentHide = undefined;
      }
      if (!intentShow) {
        intentShow = setTimeout(function() {
          if (!intentHide) {
            intentShow = undefined;
            intentHide = undefined;
            if (window.matchMedia("(min-width: 600px)").matches) {
              showTooltip(referenceElement);
            }
          }
        }, 200);
      }
    }, false);

    link.addEventListener('mouseout',  function() {
      if (intentShow) {
        clearTimeout(intentShow);
      }
      if (!intentHide) {
        intentHide = setTimeout(function() {
          intentShow = undefined;
          intentHide = undefined;
          hideTooltip();
        }, 100);
      }
    }, false);
  });

  tooltipElement.addEventListener('mouseover', function() {
    clearTimeout(intentHide);
    intentHide = undefined;
  });
  tooltipElement.addEventListener('mouseout', function() {
    if (!intentShow) {
      intentHide = setTimeout(function() {
        intentHide = undefined;
        intentShow = undefined;
        hideTooltip();
      }, 100);
    }
  });


  window.Tooltip = {
    elem: tooltipElement,
    show: showTooltip,
    hide: hideTooltip
  };

}())


// https://remysharp.com/2010/07/21/throttling-function-calls
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

function scrollPastCover(elem) {
  document.scrollingElement.scrollTo({
    'top': function(){ 
      return elem.clientHeight - 25;
    }(),
    'behavior': 'smooth'
  });
}