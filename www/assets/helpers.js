// CONSTANTS
const CURRENT_URL = new URL(window.location.href);
const TRUE_VALUES = { true: true, yes: true, 1: true, ok: true };
/*  Url to the weather api  */
const WEATHER_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const WEBSITE_PATH = CURRENT_URL.pathname;
const WEBSITE_URL = WEBSITE_PATH.slice(0, WEBSITE_PATH.lastIndexOf("/")+1);



const hlpFunctions = {
  currentUrlPath: CURRENT_URL.pathname,
  urlParams: new URLSearchParams(CURRENT_URL.search),
  valueOrDefault: function (value, default_value) {
    if (value === undefined) return default_value;
    if (value == null) return default_value;
    if (value === null) return default_value;
    if (String(value).length == 0) return default_value;
    return value;
  },
  parseBool: function (value, default_value = false) {
    value = this.valueOrDefault(value, default_value);
    if (value === true) return true;
    if (value === false) return false;
    if (String(value).toLowerCase() in TRUE_VALUES) return true;
    return default_value;
  },
  fileExist: function (filePath) {
    try {
      $.ajax({
        type: 'HEAD',
        url: filePath,
        success: function(){
          return true;
        },
        error: function(err) {
          console.log('Error open file: "'+filePath+'"', err);
        }
      });
    } catch (err) {
      console.log("Error open connection to file: '"+filePath+"': ", err);
    }
    return false;
  },
  stripUrl: function(url) {
    while (['.', '/', '\\', '*'].includes(String(url).charAt(0))) {
      url = String(url).substring(1);
    }
    return url;
  },
  parseSrcUrl: function (value, default_url = 'assets/none.png') {
    let url = this.stripUrl(value);
    if (this.checkUrlOnline(url)) return url;
    url = WEBSITE_URL + url;
    if (this.checkUrlOnline(url)) return url;
    console.log("Could not parse url:", url);
    return default_url;
  },
  dynamicStringFormat: function (template, ...args) {
    return String(template).replace(/{(\d+)}/g, (match, index) => args[index]);
  },
  getElementsBySelector: function (elementSelector) {
    if (typeof elementSelector == "string") {
      let elmId = elementSelector.trim();
      let elmType = elmId.charAt(0);
      if (elmType == "#") {
        return [document.getElementById(elmId.substring(1))];
      }
      if (elmType == "#") {
        return Array.from(document.getElementsByClassName(elmId.substring(1)));
      }
      return Array.from(document.getElementsByTagName(elmId));
    }
    return [];
  },
  insertHtml: function (elementSelector, html) {
    this.getElementsBySelector(elementSelector).forEach(
      (element) =>
        function () {
          element.innerHTML = html;
        }
    );
  },
  getUrlParamValue: function (key, default_value = null) {
    if (!this.urlParams.has(key)) return default_value;
    return this.urlParams.get(key);
  },
  checkUrlOnline: function (url) {
    let xhr = new XMLHttpRequest();
    xhr.open("HEAD", url);
    if (xhr.status === 200) return true;
    if (xhr.status === 0) return true;
    console.log(
      "The URL '" + url + "' is not working!] (" + xhr.statusText + ")"
    );
    return false;
  },
  reloadBrowser: function () {
    if (!this.checkUrlOnline(CURRENT_URL)) {
      setTimeout(reloadBrowser, 1000 * 60 * 60);
      return;
    }
    $(".faded").fadeOut(1000);
    location.reload();
  },
  runAfterXminutes: function (func, minutes = null) {
    let timeinterval = 10;
    minutes = this.valueOrDefault(minutes, _config.googleSlide.reloadSlide);
    let now = new Date();
    let next_min =
      Math.round((now.getMinutes() + minutes) / timeinterval) * timeinterval;
    let next = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      next_min,
      0,
      0
    );
    setTimeout(func, next.getTime() - new Date().getTime());
  },
  getCurrentWeather: function () {
    if (!_config.weatherService.showWeather) return;

    if (!this.valueOrDefault(_config.weatherService.key, false)) {
      $(".weather_text").html(
        _helpers.dynamicStringFormat(_config.format.labels.description)
      );
      updateWeatherBanner({
        icon: "thunder",
        temp: 0,
        feelslike: 0,
        conditions: "",
        description:
          "No key to weather api provided (Check your *.conf.js file) !!!",
      });
      return;
    }
    try {
      $.getJSON(encodeURI(WEATHER_URL + _config.weatherService.location), {
        lang: _config.languageId,
        unitGroup: _config.weatherService.unitGroup,
        include: "current",
        contentType: "json",
        key: _config.weatherService.key,
      })
        .done(function (json) {
          let data = json.currentConditions;
          data["description"] = json.days[0].description;
          updateWeatherBanner(data);
        })
        .fail(function (jqxhr, textStatus, error) {
          _config.weatherService.showWeather = false;
          let err = textStatus + ", " + error;
          console.log("Request Failed: " + err);
        });  
    } catch (err) {
      _config.weatherService.showWeather = false;
      console.log("Weather Request Failed: " + err);
    }
  },
};

// DONT EDIT BELOW THIS LINE!!!
define(function () {
  return {
    getHelpers: function () {
      return hlpFunctions;
    },
  };
});

