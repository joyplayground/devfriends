class Service {
    name: string;
    process: Function;

    constructor(name: string, process: Function) {
        this.name = name;
        this.process = process;
    }
}
