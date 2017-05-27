
import { IDemo } from './../components/demoList/demoList.component';
var demos: Array<IDemo> = [{
    id: 'ghosts',
    name: 'css variables listener',
    description: 'using event listener to update css variable',
    summery: "We can set CSS variables form JavaScript and update them live",
    route: '/demo/ghosts',
    html: require('../assets/ghosts-demo/ghosts.html'),
    css: require('css-loader!../assets/ghosts-demo/css/ghosts-style.css').toString(),
    javascript: require('../assets/ghosts-demo/js/ghosts.js')
},
{
    id: 'px-em-rem',
    name: 'PX EM & REM',
    description: 'how and when to use them',
    route: '/demo/px-em-rem',
    html: require('../assets/yet-another-media-object/index.html'),
    css: require('css-loader!../assets/yet-another-media-object/css/style.css').toString(),
},
{
    id: 'interactive-form',
    name: 'interactive form',
    description: 'user mind mapping',
    route: '/demo/interactive-form',
    html: require('../assets/interactive-form/interactive-form.html'),
    css: require('css-loader!../assets/interactive-form/interactive-form.css').toString(),
    // javascript: require('raw-loader!../assets/interactive-form/interactive-form.js'),
    hideJS: true,
}]


export class DemosDataService {
    public static getDemos(): Array<IDemo> {
        return demos.map((demo) => { return demo; });
    }
    public static getDemo(predicate: (demo: IDemo) => boolean): IDemo {
        var result = demos.filter((d: IDemo) => { return predicate(d); });
        return result.length ? result[0] : undefined;
    }
}