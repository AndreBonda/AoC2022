import { FileNode } from "./file_node";

export class DirectoryNode {
    private readonly childs: Map<string, DirectoryNode | FileNode>;
    public parent?: DirectoryNode;

    constructor(
        public readonly name: string,
    ) {
        this.childs = new Map<string, DirectoryNode | FileNode>();
    }

    getSize(): number {
        let size = 0;

        for (let c of this.childs.values()) {
            size += c.getSize()
        }

        return size;
    }

    print(depth: number = 0): void {
        console.log(`${"\t".repeat(depth)}${this.name} (dir)`);

        for (let c of this.childs.values()) {
            c.print(depth + 1);
        }
    }

    addChild(child: DirectoryNode | FileNode): void {
        if (this.childs.has(child.name)) throw new Error(`Name ${child.name} is already used here!`);
        child.setParent(this);
        this.childs.set(child.name, child);
    }

    hasChild(name: string): boolean {
        return this.childs.has(name);
    }

    getChild(name: string): DirectoryNode | FileNode {
        return this.childs.get(name)!;
    }

    setParent(p: DirectoryNode): void {
        this.parent = p;
    }

    /**
     * Method for the part 1 of the assignment.
     * Returns all directories where size is less or equal than maxSize
     */
    getFolder(maxSize: number, folders: Array<[string, number]> = new Array<[string,number]>()): Array<[string, number]> {
        let size = this.getSize();

        if (size <= maxSize)
            folders.push([this.name, size]);

        for (let c of this.childs.values()) {
            if (c instanceof DirectoryNode)
                c.getFolder(maxSize, folders);
        }

        return folders;
    }
}