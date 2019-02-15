// 静态的单例对象
import next from './seq';

class Container {
    applicationList: Array<App>;
    serverList: Array<Service>;
    filterList: Array<Filter>;

    id: string;
    createTime: number;
    name: string;

    constructor(name: string) {
        this.name = name;
        this.id = `${this.name}_${next()}_${Date.now()}`;
        this.createTime = Date.now();
    }
}
