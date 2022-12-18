export class Rope {
    private readonly knots: Array<Position>;
    private readonly tailPositions: Set<string> = new Set;

    constructor(numberOfKnots: number) {
        this.knots = new Array<Position>(numberOfKnots);

        for (let i = 0; i < numberOfKnots; i++)
            this.knots[i] = { x: 0, y: 0 };

        this.addTailPosition();
    }

    moveRope(direction: string) {
        const head = this.getHead();

        switch (direction) {
            case "U":
                head.y++;
                break;
            case "D":
                head.y--;
                break;
            case "R":
                head.x++;
                break;
            case "L":
                head.x--;
                break;
        }

        for (let i = 0; i < this.knots.length - 1; i++) {
            this.moveFollowingKnot(this.knots[i], this.knots[i + 1]);
        }

        this.addTailPosition();
    }

    getTailPositions(): number {
        return this.tailPositions.size;
    }

    print(): void {
        for(let p of this.knots) {
            console.log(p);
        }
    }

    private getDistance(p1: Position, p2: Position) {
        if (p1.y === p2.y) {
            return Math.abs(p1.x - p2.x);
        } else if (p1.x === p2.x) {
            return Math.abs(p1.y - p2.y);
        } else {
            return Math.max(
                Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
            )
        }
    }

    private moveFollowingKnot(previous: Position, following: Position) {
        if (previous.y === following.y && this.getDistance(previous, following) == 2) // horizontal alignment between knots
        {
            if (previous.x > following.x)
                following.x++;
            else
                following.x--;
        }
        else if (previous.x === following.x && this.getDistance(previous, following) == 2) // vertical alignment between knots
        {
            if (previous.y > following.y)
                following.y++;
            else
                following.y--;

        } else if (previous.x !== following.x && previous.y !== following.y
            && this.getDistance(previous, following) >= 3) // oblique alignment between knots
        {
            if (previous.x > following.x)
                following.x++;
            else
                following.x--;

            if (previous.y > following.y)
                following.y++;
            else
                following.y--;
        }
    }

    private getHead(): Position {
        return this.knots[0];
    }

    private getTail(): Position {
        return this.knots[this.knots.length - 1];
    }

    private addTailPosition(): void {
        this.tailPositions.add(`${this.getTail().x},${this.getTail().y}`);
    }
}