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