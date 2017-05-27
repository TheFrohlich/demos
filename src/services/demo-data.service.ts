var demos: Array<DTO.IDemo> = [{
    id: 'ghosts',
    name: 'css variables listener',
    description: 'using event listener to update css variable',
    summery: "We can set CSS variables form JavaScript and update them live",
    route: '/demo/ghosts',
    htmlTemplate: require('../assets/ghosts-demo/ghosts.html'),
    html: require('../assets/ghosts-demo/ghosts.html'),
    css:  require('css-loader!../assets/ghosts-demo/css/ghosts-style.css').toString() ,
    javascript: require('raw-loader!../assets/ghosts-demo/js/ghosts.js'),

},
{
    id: 'px-em-rem',
    name: 'PX EM & REM',
    description: 'how and when to use them',
    route: '/demo/px-em-rem',
    htmlTemplate: require('../assets/yet-another-media-object/index.html')
},
{
    id: 'interactive-form',
    name: 'interactive form',
    description: 'user mind mapping',
    route: '/demo/interactive-form',
    htmlTemplate: require('../assets/interactive-form/interactive-form.html')
}]


export class DemosDataService {
    public static getDemos(): Array<DTO.IDemo> {
        return demos.map((demo) => { return demo; });
    }
    public static getDemo(predicate: (demo: DTO.IDemo) => boolean): DTO.IDemo {
        var result = demos.filter((d: DTO.IDemo) => { return predicate(d); });
        return result.length ? result[0] : undefined;
    }
}