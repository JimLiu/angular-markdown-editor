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