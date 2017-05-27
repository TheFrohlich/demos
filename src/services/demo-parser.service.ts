export class DemoParser {
    public extract(regexp: RegExp, str: string) {
        let extracted = regexp.exec(str);
        return extracted ? extracted[1] : '';
    }
    public extractScript(str: string): string {
        return this.extract(/<script>(.+)<\/script>/gi, str);
    }
    public extractStyle(str: string): string {
        return this.extract(/<style>(.+)<\/style>/gi, str);
    }
    public extractHtml(str: string): string {
        return this.extract(/<div id=mainContent>(.+)<\/div>/gi, str);
    }
    public replace(str: string, toStr: string, regexp: RegExp): string {
        return toStr.replace(regexp, str);
    }
    public replaceScript(str: string, toStr: string): string {
        return this.replace(str, toStr, /<script>(.+)<\/script>/gi);
    }
    public replaceStyle(str: string, toStr: string): string {
        return this.replace(str, toStr, /<style>(.+)<\/style>/gi);
    }
    public replaceHtml(str: string, toStr: string): string {
        return this.replace(str, toStr, /<style>(.+)<\/style>/gi);
    }
}