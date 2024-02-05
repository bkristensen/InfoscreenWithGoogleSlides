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
5. [License](README.md#license)

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
[Content overwiev](README.md#content)

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

[Content overwiev](README.md#content)

---

### Start the site

Just Start index.html in an browser and see the result.

[Content overwiev](README.md#content)

---

### Customizations

For more customization open the default.config.js file and edit it as you like.

If you need more than one configuration, you can create as many *.conf.js files you need and just load with another setup by adding ?conf=NAME in the end of the link, like: index.html?conf=my_setting, and then the page will look for custom/my_setting.conf.js.

### Config Main section
|Key|Default|Description|
|---|---|---|
|background_image|'custom/background.gif'||
|widthPrc|97|Width in percent.<br/>You can set it to 100 if you want to remove border on displays with no margin|
|languageId|'en'|[Language Id](README.md#languages) for weekdays, months and weather data.|

### Config Section - format
|Key|Default|Description|
|---|---|---|
|dateformat_options|"{timeZone:'UTC'}"|[^2]Date time format<br/>EXAMPLE: "{ weekday: 'long', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'}"||
|time24hours|true|Show hour in 24 hours or false for 12 hours|

### Config Section - format - labels
> Labels can be formated as you wish, just add or remove '{?}' as needed and write any text you like
|Key|Default|Description|
|---|---|---|
|header|'{0} Infoscreen DIY'|Header text in left top corner, just set to empty if you dont want any.<br/>    {0} will be replaced with the favicon found here: "custom/favicon.png"|
|date|'{0}'|Date label format. <br/>    {0} will be replaced with current date in selected language|
|time|'Time {0} {1}:{2}'|Time label format.<br/>    {0} will be replaced with am/pm if format.time24hours is false.<br/>    {1} will be replaced with current hour.<br/>    {2} will be replaced with current minute.<br/>    {3} will be replaced with current second|
|temp|'{0}°'|Temperature label format. <br/>    {0} will be replaced with current temperature in selected unit group.|
|feelslike|'feels like {0}°'|Feels Like label. <br/>    {0} will be replaced with current feels like temperature in selected unit group.|
|condition|'{0}'|Weather condition label. <br/>    {0} will be replaced with current weather conditions in selected languageid|
|description|'{0}'|Weather description label.<br/>    {0} will be replaced with current day weather description in selected languageid.|

### Config Section - googleSlide
|Key|Default|Description|
|---|---|---|
|slideId|''|Published Google Slide id  [https://support.google.com/docs/answer/183965?hl=en&co=GENIE.Platform%3DDesktop#publish].|
|||- In Google Slides, go to this menu: 'File' / 'Share' / 'Publish to web'<br/> -In the embed url copy the id from "https://docs.google.com/presentation/d/e/<SLIDE_ID>/embed?start=true..."   <br/>Example: '2PACX-1vSBNy-mN519II3gzObo8p32RhVHaL26vFruRj27zJMnrkyOQ1yyCjQBuYkZqlSvOaIWGQz9Woc_sFVM'|
|durationSek|20|Duration between slides in seconds.|
|reloadSlide|60|Reload Webpage after ? seconds. Do this in order to get updated slides.|

### Config Section - weatherService
|Key|Default|Description|
|---|---|---|
|showWeather|true|Show or hide weather in bottom left corner.|
|key|''|Your personal code for the weather api, create one here: https://www.visualcrossing.com/sign-up|
|unitGroup|'metric'|Select the temperature unit.|
|||- us:     Fahrenheight<br/>- metric: Celcius<br/>https://www.visualcrossing.com/resources/documentation/weather-api/unit-groups-and-measurement-units/|
|location|'copenhagen,denmark'|Location is the address, partial address or latitude,longitude location for which to retrieve weather data.<br/>You can also use US ZIP Codes.|
    
### Example config file:
```javascript
let config = {
    // The background image is shown while loading the slide.
    background_image: "custom/background.gif",
    // Width in percent, 100 = no margin.
    widthPrc: 97, // in percent
    // Language Id for date and weather data
    languageId: 'en',   
    format: {
        // Set the format of the date by adding options. 
        dateformat_options: {weekday:'long',day:'2-digit',month:'2-digit',timeZone:'UTC'},
        // Show hour in 24 hours or false for 12 hours */
        time24hours: true,
        // Labels can be formated as you wish, if empty, label is not shown.
        labels: {
            // Header text in left top corner, empty if none.
            //    {0} will be replaced with 'custom/favicon.png'
            header: '{0} Infoscreen DIY',
            // Date label format. 
            //    {0} will be replaced with current date.
            date: '{0}',
            // Time label format.
            //    {0} will be replaced with am/pm.
            //    {1} will be replaced with current hour.
            //    {2} will be replaced with current minute.
            //    {3} will be replaced with current second.
            time:'Time {0} {1}:{2}',
            // Temperature label format.
            //    {0} will be replaced with current temperature.
            temp: '{0}°',
            // Feels Like label.
            //    {0} will be replaced with feels like temperature.
            feelslike: 'feels like {0}°',
            // Weather condition label.
            //    {0} will be replaced with weather condition.
            condition: '{0}',
            // Weather description label.
            //    {0} will be replaced with weather description.
            description: '{0}'
        }
    },
    googleSlide: {
        // Published Google Slide id.
        slideId: 'ADD YOUR SLIDE ID HERE',
        // Duration between slides in seconds.
        durationSek: 20,
        // Reload Webpage after ? seconds.
        //    Do this in order to get updated slides.
        reloadSlide: 60, 
    },
    weatherService: {
        // Show or hide weather info in bottom left corner.
        showWeather: true,
        // Your personal code for the weather api.
        key: 'ADD YOUR API KEY HERE',
        // Select the temperature unit.
        //    us:       Fahrenheight
        //    metric:   Celcius
        unitGroup: 'metric',
        // Location:  is the address, partial address or 
        //    latitude,longitude location or us zip code.
        location: 'london. united-kingdom',
    }
};
define(function () {
    return {
        getConfig: function () {
            return config;
        }
    }
});
```

[Content overwiev](README.md#content)

### List of language id's {#languages}
Language Id for weekdays, months and weather data, can be set by any of the following id's:
|Language Id|Language|
|---|---|
|ar|Arabic|
|bg|Bulgiarian|
|cs|Czech|
|da|Danish|
|de|German|
|el|Greek Modern|
|en|English|
|es|Spanish|
|fa|Farsi|
|fi|Finnish|
|fr|French|
|he|Hebrew|
|hu|Hungarian|
|it|Italian|
|ja|Japanese|
|ko|Korean|
|nl|Dutch|
|pl|Polish|
|pt|Portuguese|
|ru|Russian|
|sr|Serbian|
|sv|Swedish|
|tr|Turkish|
|uk|Ukranian|
|vi|Vietnamese|
|zh|Chinese|

[^2]: ### Date time format options
You can change the format of the date by adding any of the following options.
|Key|Values|
|---|---|
|weekday|- 'narrow'<br/>- 'short'<br/>- 'long'|
|year|- 'numeric'<br/>- '2-digit'|
|month|- 'numeric'<br/>- '2-digit'<br/>- 'narrow'<br/>- 'short'<br/>- 'long'|
|day|- 'numeric'<br/>- '2-digit'|
|timeZone|- 'UTC'|


[Content overwiev](README.md#content)

---

### License

This project is licensed under the MIT license.

Copyrights on the definition files are respective of each contributor listed at the beginning of each definition file.

```
MIT License

Copyright (c) 2024 Brian Kristensen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

[Content overwiev](README.md#content)

