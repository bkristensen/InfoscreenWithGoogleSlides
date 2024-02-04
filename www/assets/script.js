// CONSTANTS
const CONFIG_FILE_FORMAT = "custom/{0}.conf";
const WEATHER_ICON_URL = "assets/weathericons/{0}.svg";

// VARIABLES
let _config = {};
let _helpers = {};
let _lastMinute = -1;
let _lastSecond = -1;
let _useSeconds = false;
let _lastDay = -1;
let _current_date = "";
let _diasUrl = "";
let _confName = "default";
let _confFile = "custom/default.conf";

// CONFIG
function initConfig() {
  _useSeconds = String(_config.format.labels.time).includes("{3}");

  _config.background_image =
  _config.background_image = _helpers.parseSrcUrl(
    _helpers.valueOrDefault(
      _config.background_image,
      "custom/background.gif"
  ));
  
  _config.languageId = _helpers.getUrlParamValue("lang", _config.languageId);

  _config.widthPrc = parseInt(
    _helpers.getUrlParamValue("widtprc", _config.widthPrc)
  );

  _config.googleSlide.durationSek = parseInt(
    _helpers.getUrlParamValue("duration", _config.googleSlide.durationSek)
  );

  _config.googleSlide.reloadSlide = parseInt(
    _helpers.getUrlParamValue("reload", _config.googleSlide.reloadSlide)
  );

  _config.weatherService.showWeather = _helpers.parseBool(
    _config.weatherService.showWeather,
    true
  );

  _config.format.time24hours = _helpers.parseBool(
    _config.format.time24hours,
    _config.languageId == "en"
  );

  _config.googleSlide.slideId = _helpers.getUrlParamValue(
    "slideid",
    _helpers.valueOrDefault(
      _config.googleSlide.slideId,
      "2PACX-1vSBNy-mN519II3gzObo8p32RhVHaL26vFruRj27zJMnrkyOQ1yyCjQBuYkZqlSvOaIWGQz9Woc_sFVM"
    )
  );

  _config.dateformater = new Intl.DateTimeFormat(
    _config.languageId,
    _config.format.dateformat_options
  );

  _diasUrl = encodeURI(
    "https://docs.google.com/presentation/d/e/" +
      _config.googleSlide.slideId +
      "/embed?start=true&loop=true&delayms=" +
      _config.googleSlide.durationSek * 1000
  );
}

function initStyle() {
  let bImg = _helpers.valueOrDefault(_config.background_image, false);
  let lvw = parseFloat(_config.widthPrc);
  let wmin = 20;
  let wmax = 100;

  if (wmin > lvw) lvw = wmin;
  if (lvw > wmax) lvw = wmax;

  let lvh = Math.round(lvw * 0.98 * 1000) / 1000;

  $(":root").css({
    "--frameWidth":
      "max(calc(min(" + lvw + "lvw, calc(" + lvh + "lvh / 0.5625))), 300px)",
  });
  $(".bodycontainer").fadeIn();
  if (bImg) {
    if (String(bImg).length > 4) {
      $('.bodycontainer').css({'background-image': 'url("'+bImg+'")'});
    }
  };
  $(".header_label").html(
    _helpers.dynamicStringFormat(
      _config.format.labels.header,
      '<div class="favicon">&nbsp;</div>'
    )
  );
}

function initPage() {
  if (!_helpers.checkUrlOnline(_diasUrl)) {
    setTimeout(initSlide, 1000 * 60);
    return;
  }

  let ifrm = $(".dias-frame");
  if (!ifrm.length) return false;

  ifrm.on("load", function () {
    setTimeout($(".faded").fadeIn(2000), 10000);
  });

  ifrm.attr("src", _diasUrl);

  _helpers.runAfterXminutes(_helpers.reloadBrowser);

  updateDateTime();
  // Time Refresh //
  if (_useSeconds) {
    setInterval(updateDateTime, 1000);
  } else {
    let now = new Date();
    let sec = now.getSeconds();
    setTimeout(function () {
      updateDateTime();
      setInterval(updateDateTime, 1000 * 60);
    }, 1000 * (60 - sec));
  }

  if (!_config.weatherService.showWeather) return;

  _helpers.getCurrentWeather();

  // Set update weather banner timer
  if (_config.googleSlide.reloadSlide > 120) {
    setInterval(_helpers.getCurrentWeather(), 1000 * 60 * 90);
  }
}

// DATETIME
function updateDateTime() {
  let now = new Date();
  let day = now.getDay();
  let ampm = "";
  let hour = now.getHours();
  let minute = now.getMinutes();
  let strSeconds = "";

  if (_lastDay != day) {
    _lastDay = day;
    _current_date = _config.dateformater.format(now);
    $(".date_label").html(
      _helpers.dynamicStringFormat(_config.format.labels.date, _current_date)
    );
  }

  if (!_useSeconds) {
    if (_lastMinute == minute) return;
  } else {
    strSeconds = String(now.getSeconds()).padStart(2, "0");
  }
  if (!_config.format.time24hours) {
    // AM = Ante meridiem: Before noon  00:00:01 to 11:59:59
    // PM = Post meridiem: After noon   12:00:01 to 23:59:59
    // Midnight       00:00:00
    // Noon           12:00:00
    if (hour < 12) {
      ampm = "am";
      if (hour == 0) hour = 12;
    } else {
      ampm = "pm";
      if (hour > 12) hour = hour - 12;
    }
  }

  _lastMinute = minute;

  $(".time_label").html(
    _helpers.dynamicStringFormat(
      _config.format.labels.time,
      ampm,
      hour,
      String(minute).padStart(2, "0"),
      strSeconds
    )
  );
}

// WEATHER
function updateWeatherBanner(weather) {
  $(".weather_icon").attr(
    "src",
    _helpers.dynamicStringFormat(WEATHER_ICON_URL, weather.icon)
  );
  $(".weather_temp").html(
    _helpers.dynamicStringFormat(
      _config.format.labels.temp,
      Math.round(weather.temp)
    )
  );
  $(".weather_feel").html(
    _helpers.dynamicStringFormat(
      _config.format.labels.feelslike,
      Math.round(weather.feelslike)
    )
  );
  $(".weather_cond").html(
    _helpers.dynamicStringFormat(
      _config.format.labels.condition,
      weather.conditions
    )
  );
  $(".weather_text").html(
    _helpers.dynamicStringFormat(
      _config.format.labels.description,
      weather.description
    )
  );
}


// START SCRIPT
function initialize() {
  // REQUIRE SETUP
  requirejs.config({
    baseUrl: "./",
  });
  requirejs(["assets/jquery", "assets/helpers"], function (jquery, helpers) {
    $(".faded").hide(1);
    _helpers = helpers.getHelpers();
    _confName = _helpers.getUrlParamValue("conf", _confName);
    _confFile = _helpers.dynamicStringFormat(CONFIG_FILE_FORMAT, _confName);

    // Loads the configuration file and initializes the configuration and slide.
    requirejs([_confFile], function (conf) {
      _config = conf.getConfig();
      initConfig();
      initStyle();
      initPage();
    });
  });
}

initialize();
