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

For more customization open the default.config.js file and edit it as you like, just remember to keep structure like this.

Example config file:
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

