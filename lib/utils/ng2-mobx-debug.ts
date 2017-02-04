/* tslint:disable:max-line-length */
/* tslint:disable:no-console */
import { extras, spy, isObservableArray, isObservableObject } from 'mobx';

// function for turning debug on / off
export const ng2MobxDebug = (() => {
  if (typeof localStorage === 'undefined' || typeof console === 'undefined') {
    return;
  }
  window['ng2MobxDebug'] = (value) => {
    if (value) localStorage['ng2-mobx-debug'] = true;
    else delete localStorage['ng2-mobx-debug'];
  };

  function isDebugOn() {
    return localStorage['ng2-mobx-debug'];
  }

  spy((change) => isDebugOn() && consoleLogChange(change, () => true));

  // Debugging element dependency tree
  function ng2MobxDebug(view, renderer, observer) {
    if (!isDebugOn()) return;

    const element = view.rootNodes[0];

    const debugElement = document.createElement('span');
    element.prepend(debugElement); // No prepend in Angular Renderer
    renderer.setElementStyle(debugElement, 'position', 'absolute');
    renderer.setElementStyle(debugElement, 'border', '1px dotted red');
    renderer.setElementStyle(debugElement, 'transform', `translateY(-25px)`);
    renderer.setElementStyle(debugElement, 'cursor', 'pointer');
    renderer.setElementStyle(debugElement, 'z-index', '1000000');
    renderer.setElementStyle(debugElement, 'padding', '5px 10px');
    renderer.setElementStyle(debugElement, 'font-size', '14px');
    renderer.setElementStyle(debugElement, 'line-height', '14px');
    renderer.setElementStyle(debugElement, 'display', 'none');
    renderer.createText(debugElement, 'mobx deps');

    renderer.listen(element, 'mouseenter', () => {
      renderer.setElementStyle(debugElement, 'display', 'inline');
    });
    renderer.listen(element, 'mouseleave', () => {
      renderer.setElementStyle(debugElement, 'display', 'none');
    });

    renderer.listen(debugElement, 'click', () => {
        console.log(extras.getDependencyTree(observer));
    });
  }

  /////////////////////////////////////////////////////////
  // console logging (copied from mobx-react)
  let advicedToUseChrome = false;

  let currentDepth = 0;
  let isInsideSkippedGroup = false;

  function consoleLogChange(change, filter) {

      if (advicedToUseChrome === false && typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Chrome') === -1) {
          console.warn('The output of the MobX logger is optimized for Chrome');
          advicedToUseChrome = true;
      }

      const isGroupStart = change.spyReportStart === true;
      const isGroupEnd = change.spyReportEnd === true;

      let show;
      if (currentDepth === 0) {
          show = filter(change);
          if (isGroupStart && !show) { isInsideSkippedGroup = true; }
      } else if (isGroupEnd && isInsideSkippedGroup && currentDepth === 1) {
          show = false;
          isInsideSkippedGroup = false;
      } else {
          show = isInsideSkippedGroup !== true;
      }

      if (show && isGroupEnd) {
          groupEnd(change.time);
      } else if (show) {
          const logNext: any = isGroupStart ? group : log;
          switch (change.type) {
              case 'action':
                  // name, target, arguments, fn
                  logNext(`%caction '%s' %s`, 'color:dodgerblue', change.name, autoWrap('(', getNameForThis(change.target)));
                  log(change.arguments);
                  trace();
                  break;
              case 'transaction':
                  // name, target
                  logNext(`%ctransaction '%s' %s`, 'color:gray', change.name, autoWrap('(', getNameForThis(change.target)));
                  break;
              case 'scheduled-reaction':
                  // object
                  logNext(`%cscheduled async reaction '%s'`, 'color:#10a210', observableName(change.object));
                  break;
              case 'reaction':
                  // object, fn
                  logNext(`%creaction '%s'`, 'color:#10a210', observableName(change.object));
                  // dir({
                  //     fn: change.fn
                  // });
                  trace();
                  break;
              case 'compute':
                  // object, target, fn
                  group(`%ccomputed '%s' %s`, 'color:#10a210', observableName(change.object), autoWrap('(', getNameForThis(change.target)));
                  // dir({
                  //    fn: change.fn,
                  //    target: change.target
                  // });
                  groupEnd();
                  break;
              case 'error':
                  // message
                  logNext('%cerror: %s', 'color:tomato', change.message);
                  trace();
                  closeGroupsOnError();
                  break;
              case 'update':
                  // (array) object, index, newValue, oldValue
                  // (map, obbject) object, name, newValue, oldValue
                  // (value) object, newValue, oldValue
                  if (isObservableArray(change.object)) {
                      logNext('updated \'%s[%s]\': %s (was: %s)', observableName(change.object), change.index, formatValue(change.newValue), formatValue(change.oldValue));
                  } else if (isObservableObject(change.object)) {
                      logNext('updated \'%s.%s\': %s (was: %s)', observableName(change.object), change.name, formatValue(change.newValue), formatValue(change.oldValue));
                  } else {
                      logNext('updated \'%s\': %s (was: %s)', observableName(change.object), change.name, formatValue(change.newValue), formatValue(change.oldValue));
                  }
                  dir({
                      newValue: change.newValue,
                      oldValue: change.oldValue
                  });
                  trace();
                  break;
              case 'splice':
                  // (array) object, index, added, removed, addedCount, removedCount
                  logNext('spliced \'%s\': index %d, added %d, removed %d', observableName(change.object), change.index, change.addedCount, change.removedCount);
                  dir({
                      added: change.added,
                      removed: change.removed
                  });
                  trace();
                  break;
              case 'add':
                  // (map, object) object, name, newValue
                  logNext('set \'%s.%s\': %s', observableName(change.object), change.name, formatValue(change.newValue));
                  dir({
                      newValue: change.newValue
                  });
                  trace();
                  break;
              case 'delete':
                  // (map) object, name, oldValue
                  logNext('removed \'%s.%s\' (was %s)', observableName(change.object), change.name, formatValue(change.oldValue));
                  dir({
                      oldValue: change.oldValue
                  });
                  trace();
                  break;
              case 'create':
                  // (value) object, newValue
                  logNext('set \'%s\': %s', observableName(change.object), formatValue(change.newValue));
                  dir({
                      newValue: change.newValue
                  });
                  trace();
                  break;
              default:
                  // generic fallback for future events
                  logNext(change.type);
                  dir(change);
                  break;
          }
      }

      if (isGroupStart) currentDepth++;
      if (isGroupEnd) currentDepth--;
  }

  const consoleSupportsGroups = typeof console.groupCollapsed === 'function';
  let currentlyLoggedDepth = 0;

  function group(...args) {
      // TODO: firefox does not support formatting in groupStart methods..
      consoleSupportsGroups ?
        console.groupCollapsed.apply(console, args) :
        console.log.apply(console, args);
      currentlyLoggedDepth++;
  }

  function groupEnd(time?) {
      currentlyLoggedDepth--;
      if (typeof time === 'number') {
          log('%ctotal time: %sms', 'color:gray', time);
      }
      if (consoleSupportsGroups)
          console.groupEnd();
  }

  function log(...args) {
      console.log.apply(console, args);
  }

  function dir(...args) {
      console.dir.apply(console, args);
  }

  function trace() {
      // TODO: needs wrapping in firefox?
    if (console.trace) {
      console.trace('stack'); // TODO: use stacktrace.js or similar and strip off unrelevant stuff?
    }
  }

  function closeGroupsOnError() {
      for (let i = 0, m = currentlyLoggedDepth; i < m; i++)
          groupEnd();
  }

  const closeToken = {
      '"' : '"',
      '\'' : '\'',
      '(' : ')',
      '[' : ']',
      '<' : ']',
      '#' : ''
  };

  function autoWrap(token, value) {
      if (!value)
          return '';
      return (token || '') + value + (closeToken[token] || '');
  }

  function observableName(object) {
      return extras.getDebugName(object);
  }

  function formatValue(value) {
      if (isPrimitive(value)) {
          if (typeof value === 'string' && value.length > 100)
              return value.substr(0, 97) + '...';
          return value;
      } else
          return autoWrap('(', getNameForThis(value));
  }

  function getNameForThis(who) {
      if (who === null || who === undefined) {
          return '';
      } else if (who && typeof who === 'object') {
        if (who && who.$mobx) {
          return who.$mobx.name;
          } else if (who.constructor) {
              return who.constructor.name || 'object';
          }
    }
    return `${typeof who}`;
  }

  function isPrimitive(value) {
    return value === null || value === undefined || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
  }

  return ng2MobxDebug;
})();
