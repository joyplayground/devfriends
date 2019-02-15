class Filter {
    name: string;
    match: Function | RegExp;
    handler: Function;

    constructor(name: string, handler: Function, match: Function) {
        this.name = name;
        this.handler = handler;
        this.match = match;
    }
}
