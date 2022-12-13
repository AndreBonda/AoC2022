import { link } from "fs";
import { DirectoryNode } from "./directory_node";
import { FileNode } from "./file_node";

const fs = require('fs');
const path = require('path');

const lines: string[] = fs.readFileSync(path.join(__dirname, '../input2.txt'), "utf8")
    .split(/\n/);

let root: DirectoryNode = new DirectoryNode("/");
let currentDir: DirectoryNode = root;
let name: string;
let line: string[];

// building file system
for (let i = 1; i < lines.length; i++) {
    if (lines[i].startsWith("$ ls")) continue;

    line = lines[i].split(' ');
    name = line[line.length - 1];

    if (lines[i].startsWith("$ cd")) {

        if (name === "..")
            currentDir = currentDir.parent!;
        else {
            if (!currentDir.hasChild(name))
                currentDir.addChild(new DirectoryNode(name));

            currentDir = currentDir.getChild(name) as DirectoryNode;
        }
    } else {
        if (!currentDir.hasChild(name)) {
            if (line[0] === "dir") {
                currentDir.addChild(new DirectoryNode(name));
            }
            else {
                currentDir.addChild(new FileNode(name, Number(line[0])))
            }
        }

    }
}

// Part1
console.log(currentDir.getFolder(100000));

//Part2
const totalSpace = 70000000;
const spaceNeeedToUpdate = 30000000;
const actualFreeSpace = totalSpace - root.getSize();
const spaceToFree = spaceNeeedToUpdate - actualFreeSpace;

const folders = root
    .getFolder(Number.MAX_VALUE)
    .sort((a: [string, number], b: [string, number]) => a[1] - b[1])
    .find(i => i[1] >= spaceToFree);
console.log(folders);