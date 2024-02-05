![Infoscreen With Google slides and Weather Info](www/custom/favicon.png) 
# Infoscreen showing Google Sildes

A simple website that embeds and loops thru an Google Slide, with overlay that shows date, time and local weather information.
Usefull for implementing a free infoscreen, that can be edit directly in [Google Slides](https://www.google.com/slides/about/).

---

## Content
1. [Embed an Google Slide project](README.md#embed-google-slide-project)
2. [Show local weather data](README.md#show-local-weather-data)
3. [Start the site](README.md#start-the-site)
4. [Customizations](README.md#customizations)
5. [Licence](README.md#license)

---

### Embed Google Slide project

1. Create a [Google Slide project](https://slides.google.com/).

2. In Google Slides, go to this menu: 'File' / 'Share' / ['Publish to web'](https://support.google.com/docs/answer/183965?hl=en&co=GENIE.Platform%3DDesktop#publish).

3. Copy the Slide Id in the url ["https://docs.google.com/presentation/d/e/<SLIDE_ID>/embed?start=true..."].
> Example id: 2PACX-1vSBNy-mN519II3gzObo8p32RhVHaL26vFruRj27zJMnrkyOQ1yyCjQBuYkZqlSvOaIWGQz9Woc_sFVM

4. Open the default config file from /custom/default.conf.js and locate the googleSlide section, and add the Slide Id to the slideId key.
```javascript
googleSlide: {
    slideId: 'ADD YOUR SLIDE ID HERE',
    durationSek: 20,
    reloadSlide: 60, 
}
```

~[Content](README.md#content)~
---

### Show local weather data

We will use the free Weather Api provided by [VisualCrossing.com](https://www.visualcrossing.com).

1. Create a [free acount](https://www.visualcrossing.com/sign-up) on [VisualCrossing Weather Api platform](https://www.visualcrossing.com/weather-api).

2. Open the default config file from /custom/default.conf.js and locate the weatherService section.
```javascript
weatherService: {
    showWeather: true,
    key: 'ADD YOUR API KEY HER',
    unitGroup: 'metric',
    location: 'copenhagen,denmark',
}
```

3. Enable weather service by setting the key 'showWeather' to true, and add your api key provided by VisualCrossing.

4. Set the 'unitGroup' key to 'us' or 'metric' for showing in Fahrenheight or Celcius.

5. Remember to set location, to your local address in a format like 
   a. {ADDRESS},{CITY},{COUNTRY}
   b. or {CITY},{COUNTRY} 
   c. or {LATITUDE},{LONGITUDE} 

[Content](README.md#content)
---

### Start the site

Just Start index.html in an browser and see the result.

[Content](README.md#content)
---

### Customizations

For more customization open the default.config.js file and edit it as you like, just remember to keep structure like this.

```javascript
/*  ONLY EDIT VALUES [<KEY>: <VALUE>,]
    KEYS AND STRUCTURE MUST BE INTACT IN ORDER TO WORK  */
let config = {
    background_image: "custom/background.gif",
    /*  Width in percent
        You can set it to 100 if you want to remove border on displays with no margin */
    widthPrc: 97, // in percent
    /*  Language Id for weekdays, months and weather data
        Select between:
          ar (Arabic), bg (Bulgiarian), cs (Czech), da (Danish), de (German), 
          el (Greek Modern), en (English), es (Spanish) ), fa (Farsi), fi (Finnish), 
          fr (French), he (Hebrew), hu, (Hungarian), it (Italian), ja (Japanese), 
          ko (Korean), nl (Dutch), pl (Polish), pt (Portuguese), ru (Russian), 
          sr (Serbian), sv (Swedish), tr (Turkish), uk (Ukranian), vi (Vietnamese) 
          and zh (Chinese) 
          */
    languageId: 'en',   
    format: {
    /*  You can change the format of the date by adding options. 
            weekday: 'narrow' | 'short' | 'long'
            year: 'numeric' | '2-digit',
            month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
            day: 'numeric' | '2-digit'
            timeZone:
        EXAMPLE: "{ weekday: 'long', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'}"  */
        dateformat_options: { timeZone: 'UTC' },
    /*  Show hour in 24 hours or false for 12 hours */
        time24hours: true,
    /*  Labels can be formated as you wish, just add or remove '{?}' as needed and write any text you like */
        labels: {
    /*  Header text in left top corner, just set to empty if you dont want any.
            {0} will be replaced with the favicon found here: "custom/favicon.png"  */
            header: '{0} <a href="https://github.com/bkristensen/InfoscreenWithGoogleSlides" target="_blank">Infoscreen DIY</a>',
    /*  Date label format, 
            {0} will be replaced with current date in selected language */
            date: '{0}',
    /*  Time label format.
            {0} will be replaced with am/pm if format.time24hours is false
            {1} will be replaced with current hour, 
            {2} will be replaced with current minute,
            {3} will be replaced with current second  */
            time:'Time {0} {1}:{2}',
    /*  Temperature label format, 
            {0} will be replaced with current temperature in selected unit group  */
            temp: '{0}°',
    /*  Feels Like label, 
            {0} will be replaced with current feels like temperature in selected unit group  */
            feelslike: 'feels like {0}°',
    /*  Weather condition label, 
            {0} will be replaced with current weather conditions in selected languageid  */
            condition: '{0}',
    /*  Weather description label, 
            {0} will be replaced with current day weather description in selected languageid  */
            description: '{0}'
        }
    },
    googleSlide: {
    /*  Published Google Slide id  [https://support.google.com/docs/answer/183965?hl=en&co=GENIE.Platform%3DDesktop#publish] 
            In Google Slides, go to this menu: 'File' / 'Share' / 'Publish to web'
            In the embed url copy the id from "https://docs.google.com/presentation/d/e/<SLIDE_ID>/embed?start=true..."   
            Example: '2PACX-1vSBNy-mN519II3gzObo8p32RhVHaL26vFruRj27zJMnrkyOQ1yyCjQBuYkZqlSvOaIWGQz9Woc_sFVM'   */
        slideId: 'ADD YOUR SLIDE ID HERE',
    /*  Duration between slides in seconds. Default 20   */
        durationSek: 20,
    /*  Reload Webpage after ? seconds. Do this in order to get updated slides. Default 60  */
        reloadSlide: 60, 
    },
    weatherService: {
    /*  Show or hide weather in bottom left corner */
        showWeather: true,
    /*  Your personal code for the weather api, create one here: https://www.visualcrossing.com/sign-up   */
        key: 'ADD YOUR API KEY HERE',
    /*  Select the temperature unit.  https://www.visualcrossing.com/resources/documentation/weather-api/unit-groups-and-measurement-units/
            us:     Fahrenheight
            metric: Celcius   */
        unitGroup: 'metric',
    /*  Location:  is the address, partial address or latitude,longitude location for which to retrieve weather data. 
        You can also use US ZIP Codes.  */
        location: 'london. united-kingdom',
    }
};

// DONT EDIT BELOW THIS LINE!!!
define(function () {
    return {
        getConfig: function () {
            return config;
        }
    }
});
```

[Content](README.md#content)
---

### Licence

This project is licensed under the MIT license.

Copyrights on the definition files are respective of each contributor listed at the beginning of each definition file.
