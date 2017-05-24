import * as React from "react";
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/html';
import 'brace/theme/monokai';

export interface CodeEditorProps {
    code: string;
    name: string;
    language:string;
    title?:string;
    height:number
    onChange: () => void
}
export class CodeEditor extends React.Component<CodeEditorProps, undefined>{
    render() {
        return <div className="code-editor">
            <div className="code-editor__title">{this.props.title || this.props.name}</div>
            <div className="code-editor__title-placeholder"></div>
            <div className="code-editor__content" >
                <AceEditor
                    mode={this.props.language}
                    theme="monokai"
                    name={this.props.name}
                    width="100%"
                    fontSize={14}
                    wrapEnabled={true}
                    height={this.props.height.toString() + 'vh'}
                    onChange={this.props.onChange}
                    value={this.props.code} />
            </div>
        </div>
    }
}