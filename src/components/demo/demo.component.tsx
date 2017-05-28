import * as React from "react";
import * as highlight from 'highlight.js';
import * as beautify from 'js-beautify';
import { Route } from 'react-router-dom';
import { DemosDataService } from './../../services/demo-data.service';
import { IDemo } from '../demoList/demoList.component';
import { CodeEditor } from '../code-editor/code-editor.component';



export class DemoComponent extends React.Component<{ id: string }, undefined>{
    public htmlTemplate: any;
    public html: any;
    public css: any;
    public script: any;
    public demo: IDemo;
    public extracted = {
        script: [],
        css: [],
        html: [],
    }
    public editorHeight:string;
    constructor(props) {
        super(props);
        if (!this.props) return;

        this.demo = DemosDataService.getDemo((demo) => {
            return this.props.id === demo.id;
        })
        if (this.demo) {
            this.htmlTemplate = `<style>${this.demo.css}$ </style><script>${this.demo.javascript}</script> ${this.demo.html}`;
            if (this.htmlTemplate) {
                // this.extracted.script = /<script>(.+)<\/script>/gi.exec(this.htmlTemplate);
                // this.extracted.css = /<style>(.+)<\/style>/gi.exec(this.htmlTemplate);
                // this.extracted.html = /<div id=mainContent>(.+)<\/div>/gi.exec(this.htmlTemplate);
                this.css = this.demo.css && beautify.css(this.demo.css);
                this.script = this.demo.javascript && beautify.js(this.demo.javascript);
                this.html = this.demo.html && beautify.html(this.demo.html);
            }
        }
        this.editorHeight = this.calcEditorHeight() + 'vh';

    }
    public calcEditorHeight():number{
        let editorsCounter = 0;
        this.css && !this.demo.hideCSS && editorsCounter++;
        this.html &&  !this.demo.hideHTML && editorsCounter++;
        this.script && !this.demo.hideJS &&  editorsCounter++;
        return (80/(editorsCounter || 1));
    }
    componentDidMount() {
        if (this.script) {
            (window as any).eval(this.script);
        }

    }
    public onChange(newValue: string, mode: string): void {
        console.log(newValue);
    }
    render() {
        return <div className="demo">
            <div className="demo__header capitalize">{this.demo.name}</div>
            <div className="demo__content">
                <div className="demo__code-panel ">
                    {(this.html && !this.demo.hideHTML) &&
                        <CodeEditor
                            title='HTML'
                            code={this.html}
                            language="html"
                            onChange={(newValue) => {
                                this.onChange(newValue, 'html')
                            }}
                            hight={this.editorHeight}
                        />
                    }
                    {(this.css && !this.demo.hideCSS) &&
                        <CodeEditor
                            title='CSS'
                            code={this.css}
                            language="css"
                            onChange={(newValue) => {
                                this.onChange(newValue, 'css')
                            }}
                            hight={this.editorHeight}
                        />
                    }
                    {(this.script && !this.demo.hideJS) &&
                        <CodeEditor
                            title='JS'
                            code={this.script}
                            language="javascript"
                            onChange={(newValue) => {
                                this.onChange(newValue, 'javascript')
                            }}
                            hight={this.editorHeight}
                        />
                    }
                </div>
                <div className="demo__view-panel" dangerouslySetInnerHTML={{ __html: this.htmlTemplate }}></div>
            </div>
        </div>;
    }
}