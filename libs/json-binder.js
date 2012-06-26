(function ($) {
  "use strict";
  // Namespace for input binder definitions
  var binders = {};

  $.fn.JSONBind = function () {
    // Stores the JSON object to be returned
    var result = {},
    // Array that will hold any input binders that need to be run
      activeBinders = [],
    // Gets the jQuery items for any given inputs
      $inputs = this.find("input, select, textarea");

    // For each input, determine if a binding definition exists, and if it
    // does create and store it
    $inputs.each(function () {
      var $this = $(this),
        binder = binders[$this.attr("type")] || binders[this.nodeName.toLowerCase()];

      if (typeof binder !== "undefined") {
        activeBinders.push(binder($this, result));
      }
    });

    // For any binding definitions that were created, run them to get the
    // input data to the raw JSON values
    $.each(activeBinders, function (index, binder) {
      if (binder.canGetValue()) {
        result[binder.forProperty()] = binder.inputValue();
      }
    });

    return JSON.stringify(result);
  };

  binders.input = binders.hidden = binders.text = binders.password = binders.select = binders.textarea = function ($input) {
    function getName() {
      return $input.attr("name");
    }

    return {
      forProperty: function () {
        return getName();
      },
      canGetValue: function () {
        return typeof getName() !== "undefined";
      },
      inputValue: function () {
        return $input.val();
      }
    };
  };

  binders.checkbox = function ($checkbox) {
    function getName() {
      return $checkbox.attr("name");
    }

    return {
      forProperty: function () {
        return getName();
      },
      canGetValue: function () {
        return typeof getName() !== "undefined";
      },
      inputValue: function () {
        return $checkbox.is(":checked") ? true : false;
      }
    };
  };

  binders.radio = function ($radio, result) {
    function getName() {
      return $radio.attr("name");
    }

    function getThisValue() {
      return $radio.is(":checked") ? $radio.val() : "";
    }

    function getFullValue() {
      var property = getName();
      var notAlreadySet = typeof result[property] === "undefined" || result[property].trim() === "";
      return notAlreadySet ? getThisValue() : result[property];
    }

    return {
      forProperty: function () {
        return getName();
      },
      canGetValue: function () {
        return typeof getName() !== "undefined";
      },
      inputValue: function () {
        return getFullValue();
      }
    };
  };
}(jQuery));