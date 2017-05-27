import * as  React from 'React';
import { IDemosListItemProps, DemosListItem } from '../demo-list-item/demo-list-item.component';

export interface IDemo {
    id: string;
    name: string;
    description?: string;
    summery?: string;
    route: string;
    html?:string;
    hideHTML?:boolean;
    css?:string;
    hideCSS?:boolean;
    javascript?:string;
    hideJS?:boolean;
}

export interface IDemosListProps {
    demoList: Array<IDemo>
}

export class DemosList extends React.Component<IDemosListProps, undefined>{
    private getDelayTime(index: number): {} {
        return { 'animationDelay': (0.1 * index).toString() + 's' }
    }
    render() {
        return <ul className="reset-list demos-list">
            {this.props.demoList.map((demo, index) =>
                <li className="demos-list__item-wrapper animated bounceInUp" style={this.getDelayTime(index)} key={index}>
                    <DemosListItem demo={demo} />
                </li>)
            }
        </ul>
    }
}