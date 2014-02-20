(function() {
  'use strict';
  angular.module('ui.markdown')

  .directive('ngBindMarkdown', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.addClass('ng-binding-markdown').data('$bindingMarkdown', attrs.ngBindMarkdown);
        scope.$watch(attrs.ngBindMarkdown, function bindMarkdownWatchAction(value) {
          var converter = new Showdown.converter();
          var markdown = value || '';
          var htmlText = converter.makeHtml(markdown);
          element.html(htmlText);
        });
      }
    };

  });


})();