// 业务独立单元
import next from './seq';

class App {
    id: string;
    name: string;
    description: string;
    createTime: number;

    filterList: Array<Filter>;
    serviceList: Array<Service>;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.createTime = Date.now();
        this.id = `${this.name}_${next()}_${Date.now()}`;
    }
}
