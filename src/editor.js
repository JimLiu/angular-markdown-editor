// Some code copy from https://github.com/angular-ui/ui-codemirror
// 
(function() {
  'use strict';

  angular.module('ui.markdown')
    .directive('uiMarkdownEditor', ['uiMarkdownEditorConfig', '$helper', '$shortcuts',
      function(uiMarkdownEditorConfig, $helper, $shortcuts) {
        return {
          restrict: 'EA',
          require: '?ngModel',
          priority: 1,
          compile: function compile(tElement) {
            // Require CodeMirror
            if (angular.isUndefined(window.CodeMirror)) {
              throw new Error('ui-markdown-editor need CodeMirror to work... (o rly?)');
            }

            // Create a codemirror instance with
            // - the function that will to place the editor into the document.
            // - the initial content of the editor.
            //   see http://codemirror.net/doc/manual.html#api_constructor
            var value = tElement.text();
            var codeMirror = new window.CodeMirror(function(cm_el) {

              angular.forEach(tElement.prop('attributes'), function(a) {
                if (a.name === 'ui-markdown-editor') {
                  cm_el.setAttribute('ui-markdown-editor-opts', a.textContent);
                } else {
                  cm_el.setAttribute(a.name, a.textContent);
                }
              });

              // FIX replaceWith throw not parent Error !
              if (tElement.parent().length <= 0) {
                tElement.wrap('<div>');
              }

              tElement.replaceWith(cm_el);
            }, {
              value: value
            });

            return function postLink(scope, iElement, iAttrs, ngModel) {

              var options, opts;

              options = uiMarkdownEditorConfig || {};
              opts = angular.extend({}, options, scope.$eval(iAttrs.uiMarkdownEditor), scope.$eval(iAttrs.uiMarkdownEditorOpts));

              function updateOptions(newValues) {
                for (var key in newValues) {
                  if (newValues.hasOwnProperty(key)) {
                    codeMirror.setOption(key, newValues[key]);
                  }
                }
              }

              updateOptions(opts.codemirror);

              if (angular.isDefined(scope.$eval(iAttrs.uiMarkdownEditor))) {
                scope.$watch(iAttrs.uiMarkdownEditor, updateOptions, true);
              }

              if (opts.shortcut.enabled) {
                angular.forEach(opts.shortcut.shortcuts, function(shortcut) {
                  $shortcuts.add(shortcut.key, function() {
                    codeMirror.addMarkdown({style: shortcut.style});
                  });
                });
              }

              // Specialize change event
              codeMirror.on('change', function(instance) {
                var newValue = instance.getValue();
                if (ngModel && newValue !== ngModel.$viewValue) {
                  ngModel.$setViewValue(newValue);
                }
                if (!scope.$$phase) {
                  scope.$apply();
                }
              });


              if (ngModel) {
                // CodeMirror expects a string, so make sure it gets one.
                // This does not change the model.
                ngModel.$formatters.push(function(value) {
                  if (angular.isUndefined(value) || value === null) {
                    return '';
                  } else if (angular.isObject(value) || angular.isArray(value)) {
                    throw new Error('ui-markdown-editor cannot use an object or an array as a model');
                  }
                  return value;
                });


                // Override the ngModelController $render method, which is what gets called when the model is updated.
                // This takes care of the synchronizing the codeMirror element with the underlying model, in the case that it is changed by something else.
                ngModel.$render = function() {
                  //Code mirror expects a string so make sure it gets one
                  //Although the formatter have already done this, it can be possible that another formatter returns undefined (for example the required directive)
                  var safeViewValue = ngModel.$viewValue || '';
                  codeMirror.setValue(safeViewValue);
                };
              }


              // Watch ui-refresh and refresh the directive
              if (iAttrs.uiRefresh) {
                scope.$watch(iAttrs.uiRefresh, function(newVal, oldVal) {
                  // Skip the initial watch firing
                  if (newVal !== oldVal) {
                    codeMirror.refresh();
                  }
                });
              }

              // onLoad callback
              if (angular.isFunction(opts.onLoad)) {
                opts.onLoad(codeMirror);
              }
            };
          }
        };
      }
    ]);



})();