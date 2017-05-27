import * as  React from 'React';
import { Link } from 'react-router-dom';
export interface IDemosListItemProps {
    demo: DTO.IDemo;
}
export class DemosListItem extends React.Component<IDemosListItemProps, undefined>{
    render() {
        return <Link to={this.props.demo.route} className="demo-list-item" >
            <h3 className="demo-list-item__name">{this.props.demo.name}</h3>
            <div className="horizontal-stroke"></div>
            <div className="demo-list-item__description">{this.props.demo.description}</div>
        </Link>
    }
}