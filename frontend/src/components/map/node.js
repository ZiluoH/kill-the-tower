export default class Node {
    constructor(content) {
        this.next = [];
        this.content = content;
        // this.connect = this.connect.bind(this);
        // this.connectToManyLower = this.connectToManyLower.bind(this);
        // this.connectToManyUpper = this.connectToManyUpper.bind(this)
    }

    connect(node) {
        this.next.push(node);
    }

    connectToManyUpper = (arrNodes) => {
        for (const node of arrNodes) {
            this.connect(node);
        }
    }

    connectToManyLower = (arrNodes) => {
        for (const node of arrNodes){
            node.connect(this);
        }
    }
}