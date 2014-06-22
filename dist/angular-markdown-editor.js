/**
 * @license Angular Markdown Editor v0.1.0
 * (c) 2010-2014. https://github.com/JimLiu/angular-markdown-editor
 * License: MIT
 */

(function () {
  'use strict';

  angular.module('ui.markdown', [])

    .constant('uiMarkdownEditorConfig', {
      codemirror: {
        mode: 'gfm',
        tabMode: 'indent',
        tabindex: "2",
        lineWrapping: true,
        dragDrop: false,
        extraKeys: {
          Home: "goLineLeft",
          End: "goLineRight"
        }
      },
      shortcut: {
        enabled: true,
        shortcuts: [
          {'key': 'Ctrl+B', 'style': 'bold'},
          {'key': 'Meta+B', 'style': 'bold'},
          {'key': 'Ctrl+I', 'style': 'italic'},
          {'key': 'Meta+I', 'style': 'italic'},
          {'key': 'Ctrl+Alt+U', 'style': 'strike'},
          {'key': 'Ctrl+Shift+K', 'style': 'code'},
          {'key': 'Meta+K', 'style': 'code'},
          {'key': 'Ctrl+Alt+1', 'style': 'h1'},
          {'key': 'Ctrl+Alt+2', 'style': 'h2'},
          {'key': 'Ctrl+Alt+3', 'style': 'h3'},
          {'key': 'Ctrl+Alt+4', 'style': 'h4'},
          {'key': 'Ctrl+Alt+5', 'style': 'h5'},
          {'key': 'Ctrl+Alt+6', 'style': 'h6'},
          {'key': 'Ctrl+Shift+L', 'style': 'link'},
          {'key': 'Ctrl+Shift+I', 'style': 'image'},
          {'key': 'Ctrl+Q', 'style': 'blockquote'},
          {'key': 'Ctrl+U', 'style': 'uppercase'},
          {'key': 'Ctrl+Shift+U', 'style': 'lowercase'},
          {'key': 'Ctrl+Alt+W', 'style': 'selectword'},
          {'key': 'Ctrl+L', 'style': 'list'},
          {'key': 'Meta+Enter', 'style': 'newLine'},
          {'key': 'Ctrl+Enter', 'style': 'newLine'}
        ]
      }
    });

})();
(function() {
  'use strict';

  angular.module('ui.markdown')

  .factory('$helper', ['$document', '$window',
    function($document, $window) {
      return {
        
      };
    }
  ]);

})();
/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */

(function() {
  'use strict';

  angular.module('ui.markdown')

  .factory('$shortcuts', ['$document', '$window',
    function($document, $window) {
      return {
        add: function(shortcut_combination, callback) {
          shortcut_combination = shortcut_combination.toLowerCase();
          var code;
          $document.on('keydown', function(e) {
            e = e || window.event;
            if (e.keyCode) {
              code = e.keyCode;
            }
            else if (e.which) {
              code = e.which;
            }
            else {
              return;
            }

            var character = String.fromCharCode(code).toLowerCase();
            if (code == 188) {
              character = ",";
            }
            if (code == 190) {
              character = ".";
            }

            var keys = shortcut_combination.split("+");
            var kp = 0;

            //Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
            var shift_nums = {
              "`": "~",
              "1": "!",
              "2": "@",
              "3": "#",
              "4": "$",
              "5": "%",
              "6": "^",
              "7": "&",
              "8": "*",
              "9": "(",
              "0": ")",
              "-": "_",
              "=": "+",
              ";": ":",
              "'": "\"",
              ",": "<",
              ".": ">",
              "/": "?",
              "\\": "|"
            };

            var special_keys = {
              'esc': 27,
              'escape': 27,
              'tab': 9,
              'space': 32,
              'return': 13,
              'enter': 13,
              'backspace': 8,

              'scrolllock': 145,
              'scroll_lock': 145,
              'scroll': 145,
              'capslock': 20,
              'caps_lock': 20,
              'caps': 20,
              'numlock': 144,
              'num_lock': 144,
              'num': 144,

              'pause': 19,
              'break': 19,

              'insert': 45,
              'home': 36,
              'delete': 46,
              'end': 35,

              'pageup': 33,
              'page_up': 33,
              'pu': 33,

              'pagedown': 34,
              'page_down': 34,
              'pd': 34,

              'left': 37,
              'up': 38,
              'right': 39,
              'down': 40,

              'f1': 112,
              'f2': 113,
              'f3': 114,
              'f4': 115,
              'f5': 116,
              'f6': 117,
              'f7': 118,
              'f8': 119,
              'f9': 120,
              'f10': 121,
              'f11': 122,
              'f12': 123
            };

            var modifiers = {
              shift: {
                wanted: false,
                pressed: false
              },
              ctrl: {
                wanted: false,
                pressed: false
              },
              alt: {
                wanted: false,
                pressed: false
              },
              meta: {
                wanted: false,
                pressed: false
              }
            };

            if (e.ctrlKey) {
              modifiers.ctrl.pressed = true;
            }
            if (e.shiftKey) {
              modifiers.shift.pressed = true;
            }
            if (e.altKey) {
              modifiers.alt.pressed = true;
            }
            if (e.metaKey) {
              modifiers.meta.pressed = true;
            }

            var k;
            for (var i = 0; k = keys[i], i < keys.length; i++) {
              //Modifiers
              if (k == 'ctrl' || k == 'control') {
                kp++;
                modifiers.ctrl.wanted = true;

              } else if (k == 'shift') {
                kp++;
                modifiers.shift.wanted = true;

              } else if (k == 'alt') {
                kp++;
                modifiers.alt.wanted = true;
              } else if (k == 'meta') {
                kp++;
                modifiers.meta.wanted = true;
              } else if (k.length > 1) { //If it is a special key
                if (special_keys[k] == code) {
                  kp++;
                }
              } else { //The special keys did not match
                if (character == k) {
                  kp++;
                }
                else {
                  if (shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
                    character = shift_nums[character];
                    if (character == k) {
                      kp++;
                    }
                  }
                }
              }
            }

            if (kp == keys.length &&
              modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
              modifiers.shift.pressed == modifiers.shift.wanted &&
              modifiers.alt.pressed == modifiers.alt.wanted &&
              modifiers.meta.pressed == modifiers.meta.wanted) {
              callback(e);
            }
          });
        }
      };
    }
  ]);

})();
// https://github.com/TryGhost/Ghost

(function() {
  'use strict';
  var Markdown = {
    init: function(options, elem) {
      var self = this;
      self.elem = elem;

      self.style = (typeof options === 'string') ? options : options.style;

      self.options = angular.extend({}, CodeMirror.prototype.addMarkdown.options, options);

      self.replace();
    },
    replace: function() {
      var text = this.elem.getSelection(),
        pass = true,
        cursor = this.elem.getCursor(),
        line = this.elem.getLine(cursor.line),
        md, word, letterCount, converter;
      switch (this.style) {
        case 'h1':
          this.elem.setLine(cursor.line, '# ' + line);
          this.elem.setCursor(cursor.line, cursor.ch + 2);
          pass = false;
          break;
        case 'h2':
          this.elem.setLine(cursor.line, '## ' + line);
          this.elem.setCursor(cursor.line, cursor.ch + 3);
          pass = false;
          break;
        case 'h3':
          this.elem.setLine(cursor.line, '### ' + line);
          this.elem.setCursor(cursor.line, cursor.ch + 4);
          pass = false;
          break;
        case 'h4':
          this.elem.setLine(cursor.line, '#### ' + line);
          this.elem.setCursor(cursor.line, cursor.ch + 5);
          pass = false;
          break;
        case 'h5':
          this.elem.setLine(cursor.line, '##### ' + line);
          this.elem.setCursor(cursor.line, cursor.ch + 6);
          pass = false;
          break;
        case 'h6':
          this.elem.setLine(cursor.line, '###### ' + line);
          this.elem.setCursor(cursor.line, cursor.ch + 7);
          pass = false;
          break;
        case 'link':
          md = this.options.syntax.link.replace('$1', text);
          this.elem.replaceSelection(md, 'end');
          this.elem.setSelection({
            line: cursor.line,
            ch: cursor.ch - 8
          }, {
            line: cursor.line,
            ch: cursor.ch - 1
          });
          pass = false;
          break;
        case 'image':
          md = this.options.syntax.image.replace('$1', text);
          if (line !== '') {
            md = "\n\n" + md;
          }
          this.elem.replaceSelection(md, "end");
          cursor = this.elem.getCursor();
          this.elem.setSelection({
            line: cursor.line,
            ch: cursor.ch - 8
          }, {
            line: cursor.line,
            ch: cursor.ch - 1
          });
          pass = false;
          break;
        case 'uppercase':
          md = text.toLocaleUpperCase();
          break;
        case 'lowercase':
          md = text.toLocaleLowerCase();
          break;
        case 'selectword':
          word = this.elem.getTokenAt(cursor);
          if (!/\w$/g.test(word.string)) {
            this.elem.setSelection({
              line: cursor.line,
              ch: word.start
            }, {
              line: cursor.line,
              ch: word.end - 1
            });
          } else {
            this.elem.setSelection({
              line: cursor.line,
              ch: word.start
            }, {
              line: cursor.line,
              ch: word.end
            });
          }
          break;
        case 'list':
          md = text.replace(/^(\s*)(\w\W*)/gm, '$1* $2');
          this.elem.replaceSelection(md, 'end');
          pass = false;
          break;
        case 'newLine':
          if (line !== "") {
            this.elem.setLine(cursor.line, line + "\n\n");
          }
          pass = false;
          break;
        default:
          if (this.options.syntax[this.style]) {
            md = this.options.syntax[this.style].replace('$1', text);
          }
      }
      if (pass && md) {
        this.elem.replaceSelection(md, 'end');
        if (!text) {
          letterCount = md.length;
          this.elem.setCursor({
            line: cursor.line,
            ch: cursor.ch - (letterCount / 2)
          });
        }
      }
    }
  };

  CodeMirror.prototype.addMarkdown = function(options) {
    var markdown = Object.create(Markdown);
    markdown.init(options, this);
  };

  CodeMirror.prototype.addMarkdown.options = {
    style: null,
    syntax: {
      bold: "**$1**",
      italic: "*$1*",
      strike: "~~$1~~",
      code: "`$1`",
      link: "[$1](http://)",
      image: "![$1](http://)",
      blockquote: "> $1"
    }
  };

}());
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