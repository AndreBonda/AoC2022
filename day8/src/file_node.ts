import { DirectoryNode } from "./directory_node";

export class FileNode {
    public parent?: DirectoryNode;

    constructor(
        public readonly name: string,
        private readonly size: number,
    ) { }

    getSize(): number {
        return this.size;
    }

    print(depth: number = 0): void {
        console.log(`${"\t".repeat(depth)}${this.name} (file, size=${this.size})`);
    }

    setParent(p: DirectoryNode):void {
        this.parent = p;
    }
}