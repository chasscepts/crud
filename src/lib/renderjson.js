// https://github.com/caldwell/renderjson/blob/master/renderjson.js

// Copyright © 2013-2017 David Caldwell <david@porkrind.org>
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
// SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
// OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
// CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

// Usage
// -----
// The module exports one entry point, the `renderjson()` function. It takes in
// the JSON you want to render as a single argument and returns an HTML
// element.
//
// Options
// -------
// renderjson.set_icons("+", "-")
//   This Allows you to override the disclosure icons.
//
// renderjson.set_show_to_level(level)
//   Pass the number of levels to expand when rendering. The default is 0, which
//   starts with everything collapsed. As a special case, if level is the string
//   "all" then it will start with everything expanded.
//
// renderjson.set_max_string_length(length)
//   Strings will be truncated and made expandable if they are longer than
//   `length`. As a special case, if `length` is the string "none" then
//   there will be no truncation. The default is "none".
//
// renderjson.set_sort_objects(sort_bool)
//   Sort objects by key (default: false)
//
// renderjson.set_replacer(replacer_function)
//   Equivalent of JSON.stringify() `replacer` argument when it's a function
//
// renderjson.set_collapse_msg(collapse_function)
//   Accepts a function (len:number):string => {} where len is the length of the
//   object collapsed.  Function should return the message displayed when a
//   object is collapsed.  The default message is "X items"
//
// renderjson.set_property_list(property_list)
//   Equivalent of JSON.stringify() `replacer` argument when it's an array
//
// Theming
// -------
// The HTML output uses a number of classes so that you can theme it the way
// you'd like:
//     .disclosure    ("⊕", "⊖")
//     .syntax        (",", ":", "{", "}", "[", "]")
//     .string        (includes quotes)
//     .number
//     .boolean
//     .key           (object key)
//     .keyword       ("null", "undefined")
//     .object.syntax ("{", "}")
//     .array.syntax  ("[", "]")

const renderjson = (function iife() {
  const append = (...args) => {
    const el = Array.prototype.shift.call(args);
    for (let a = 0; a < args.length; a += 1) {
      if (args[a].constructor === Array) append.apply(this, [el].concat(args[a]));
      else el.appendChild(args[a]);
    }
    return el;
  };
  const prepend = (el, child) => {
    el.insertBefore(child, el.firstChild);
    return el;
  };
  const text = (txt) => document.createTextNode(txt);
  //  const div = () => document.createElement('div');
  const span = (classname) => {
    const s = document.createElement('span');
    if (classname) s.className = classname;
    return s;
  };
  const themetext = (...args) => {
    const spans = [];
    while (args.length) {
      spans.push(append(span(Array.prototype.shift.call(args)),
        text(Array.prototype.shift.call(args))));
    }
    return spans;
  };
  const isempty = (obj, pl) => {
    const keys = pl || Object.keys(obj);
    const indices = Object.keys(keys);
    for (let i = 0; i < indices.length; i += 1) {
      if (Object.hasOwnProperty.call(obj, keys[i])) return false;
    }
    return true;
  };
  const A = function A(txt, classname, callback) {
    const a = document.createElement('a');
    if (classname) a.className = classname;
    a.appendChild(text(txt));
    a.href = '#';
    a.onclick = (e) => { callback(); if (e) e.stopPropagation(); return false; };
    return a;
  };

  function pRenderjson(json, indent, dontIndent, showLevel, options) {
    const myIndent = dontIndent ? '' : indent;

    const disclosure = (open, placeholder, close, type, builder) => {
      let content;
      const empty = span(type);
      const show = () => {
        if (!content) {
          append(empty.parentNode,
            content = prepend(builder(),
              A(options.hide, 'disclosure',
                () => {
                  content.style.display = 'none';
                  empty.style.display = 'inline';
                })));
        }
        content.style.display = 'inline';
        empty.style.display = 'none';
      };
      append(empty,
        A(options.show, 'disclosure', show),
        themetext(`${type} syntax`, open),
        A(placeholder, null, show),
        themetext(`${type} syntax`, close));

      const el = append(span(), text(myIndent.slice(0, -1)), empty);
      if (showLevel > 0 && type !== 'string') show();
      return el;
    };

    if (json === null) return themetext(null, myIndent, 'keyword', 'null');
    if (json === undefined) return themetext(null, myIndent, 'keyword', 'undefined');

    if (typeof (json) === 'string' && json.length > options.max_string_length) { return disclosure('"', `${json.substr(0, options.max_string_length)} ...`, '"', 'string', () => append(span('string'), themetext(null, myIndent, 'string', JSON.stringify(json)))); }

    if (typeof (json) !== 'object' || [Number, String, Boolean, Date].indexOf(json.constructor) >= 0) {
      // Strings, numbers and bools
      return themetext(null, myIndent, typeof (json), JSON.stringify(json));
    }

    if (json.constructor === Array) {
      if (json.length === 0) return themetext(null, myIndent, 'array syntax', '[]');

      return disclosure('[', options.collapse_msg(json.length), ']', 'array', () => {
        const as = append(span('array'), themetext('array syntax', '[', null, '\n'));
        for (let i = 0; i < json.length; i += 1) {
          append(as,
            pRenderjson(options.replacer.call(json, i, json[i]), `${indent}    `, false, showLevel - 1, options),
            i !== json.length - 1 ? themetext('syntax', ',') : [],
            text('\n'));
        }
        append(as, themetext(null, indent, 'array syntax', ']'));
        return as;
      });
    }

    // object
    if (isempty(json, options.property_list)) return themetext(null, myIndent, 'object syntax', '{}');

    return disclosure('{', options.collapse_msg(Object.keys(json).length), '}', 'object', () => {
      const os = append(span('object'), themetext('object syntax', '{', null, '\n'));
      let last;
      Object.keys(json).forEach((k) => {
        last = k;
      });
      let keys = options.property_list || Object.keys(json);
      if (options.sort_objects) keys = keys.sort();
      keys.forEach((k) => {
        if (k in json) {
          append(os, themetext(null, `${indent}    `, 'key', `"${k}"`, 'object syntax', ': '),
            pRenderjson(options.replacer.call(json, k, json[k]), `${indent}    `, true, showLevel - 1, options),
            k !== last ? themetext('syntax', ',') : [],
            text('\n'));
        }
      });
      append(os, themetext(null, indent, 'object syntax', '}'));
      return os;
    });
  }

  const renderjson = function renderjson(json) {
    const options = { ...renderjson.options };
    options.replacer = typeof (options.replacer) === 'function' ? options.replacer : (k, v) => v;
    const pre = append(document.createElement('pre'), pRenderjson(json, '', false, options.show_to_level, options));
    pre.className = 'renderjson';
    return pre;
  };
  renderjson.set_icons = (show, hide) => {
    renderjson.options.show = show;
    renderjson.options.hide = hide;
    return renderjson;
  };
  renderjson.set_show_to_level = (level) => {
    renderjson.options.show_to_level = typeof level === 'string'
                                                                                      && level.toLowerCase() === 'all' ? Number.MAX_VALUE
      : level;
    return renderjson;
  };
  renderjson.set_max_string_length = (length) => {
    renderjson.options.max_string_length = typeof length === 'string'
                                                                                               && length.toLowerCase() === 'none' ? Number.MAX_VALUE
      : length;
    return renderjson;
  };
  renderjson.set_sort_objects = (sortBool) => {
    renderjson.options.sort_objects = sortBool;
    return renderjson;
  };
  renderjson.set_replacer = (replacer) => {
    renderjson.options.replacer = replacer;
    return renderjson;
  };
  renderjson.set_collapse_msg = (collapseMsg) => {
    renderjson.options.collapse_msg = collapseMsg;
    return renderjson;
  };
  renderjson.set_property_list = (propList) => {
    renderjson.options.property_list = propList;
    return renderjson;
  };
  // Backwards compatiblity. Use set_show_to_level() for new code.
  renderjson.set_show_by_default = (show) => {
    renderjson.options.show_to_level = show ? Number.MAX_VALUE : 0;
    return renderjson;
  };
  renderjson.options = {};
  renderjson.set_icons('⊕', '⊖');
  renderjson.set_show_by_default(false);
  renderjson.set_sort_objects(false);
  renderjson.set_max_string_length('none');
  renderjson.set_replacer(undefined);
  renderjson.set_property_list(undefined);
  renderjson.set_collapse_msg((len) => `${len} item${len === 1 ? '' : 's'}`);
  return renderjson;
}());

export default renderjson;
