(function() {
  'use strict';

  // Debounce function taken from Underscore.js 
  // (https://github.com/jashkenas/underscore)
  var debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  };

  angular.module('ui.markdown')

  .directive('ngBindMarkdown', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.addClass('ng-binding-markdown').data('$bindingMarkdown', attrs.ngBindMarkdown);
        scope.$watch(attrs.ngBindMarkdown, debounce(function bindMarkdownWatchAction(value) {
          var converter = new Showdown.converter();
          var markdown = value || '';
          var htmlText = converter.makeHtml(markdown);
          element.html(htmlText);
        }, 50));
      }
    };

  });

})();