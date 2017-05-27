import * as React from "react";
import { BrowserRouter as Router, Route, hashHistory } from 'react-router-dom';
import { DemosDataService } from '../services/demo-data.service';
import { DemoComponent } from './demo/demo.component';
import { DemosList } from './demoList/demoList.component';


export class AppComponent extends React.Component<undefined, undefined> {
    private demos = new Array<DTO.IDemo>();
    /**
     *
     */
    constructor() {
        super();
        
        this.demos = DemosDataService.getDemos();
    }

    render() {
        return <div className="main-page">
            <Route path="/demo/:id" render={this.demoView()}></Route>
            <Route exact={true} path="/" render={this.mainView(this.demos)} ></Route>
        </div>
    }
    mainView(demos: DTO.IDemo[]) {
        return (demos) => <DemosList demoList={this.demos} />
    }
    demoView() {
        return ({ match }) => {
            return <DemoComponent id={match.params.id} />
        };
    }
}