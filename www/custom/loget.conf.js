// ONLY EDIT VALUES [<KEY>: <VALUE>,]
// KEYS AND STRUCTURE MUST BE INTACT IN ORDER TO WORK
let config = {
    widthPrc: 90,
    languageId: 'da',
    format: {
        dateformat_options: { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' },
        labels: {
            header: '',
            date: '{0}',
            time:'Kl {0}:{1}',
            temp: '{0}°',
            feelslike: 'føles som {0}°',
            condition: '{0}',
            description: '{0}'
        }
    },
    googleSlide: {
        slideId: '2PACX-1vR1uMuhouiaUmRIbz0F6d9GAzj97Jicivue-x1eE5VKe-9GEdEaplannnKKcs2hpSCjmUeuSF9lzEIm',
        durationSek: 20,
        reloadSlide: 60, 
    },
    weatherService: {
        url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
        key: 'DKSYCNR8VBX2P2P6Z2B2G9Z33',
        unitGroup: 'metric',
        location: 'løget høj, vejle. denmark',
        iconurl: 'assets/weathericons/{0}.png',
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
