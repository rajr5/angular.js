'use strict';

/**
 * @ngdoc directive
 * @name script
 * @restrict E
 *
 * @description
 * Load the content of a `<script>` element into {@link ng.$templateCache `$templateCache`}, so that the
 * template can be used by {@link ng.directive:ngInclude `ngInclude`},
 * {@link ngRoute.directive:ngView `ngView`}, or {@link guide/directive directives}. The type of the
 * `<script>` element must be specified as `text/ng-template`, and a cache name for the template must be
 * assigned through the element's `id`, which can then be used as a directive's `templateUrl`.
 *
 * @param {'text/ng-template'} type Must be set to `'text/ng-template'`.
 * @param {string} id Cache name of the template.
 *
 * @example
  <example>
    <file name="index.html">
      <script type="text/ng-template" id="/tpl.html">
        Content of the template.
      </script>

      <a ng-click="currentTpl='/tpl.html'" id="tpl-link">Load inlined template</a>
      <div id="tpl-content" ng-include src="currentTpl"></div>
    </file>
    <file name="protractor.js" type="protractor">
      it('should load template defined inside script tag', function() {
        element(by.css('#tpl-link')).click();
        expect(element(by.css('#tpl-content')).getText()).toMatch(/Content of the template/);
      });
    </file>
  </example>
 */
var scriptDirective = ['$templateCache', function($templateCache) {
  return {
    restrict: 'E',
    terminal: true,
    compile: function(element, attr) {
      if (attr.type == 'text/ng-template') {
        var templateUrl = attr.id,
            // IE is not consistent, in scripts we have to read .text but in other nodes we have to read .textContent
            text = element[0].text;

        $templateCache.put(templateUrl, text);
      }
    }
  };
}];
