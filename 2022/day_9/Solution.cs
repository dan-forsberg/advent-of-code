struct Position
{
    public int x = 0;
    public int y = 0;

    public Position(int X, int Y)
    {
        x = X;
        y = Y;
    }

    public void Move(Position p)
    {
        this.x += p.x;
        this.y += p.y;
    }

    public bool IsAdjecent(Position p)
        => Math.Abs(p.x - x) <= 1 && Math.Abs(p.y - y) <= 1;

    public Position NecessaryMove(Position p)
    {
        var dX = p.x - x;
        var dY = p.y - y;

        /* if the head and tail aren't touching and aren't in the same row or
         * column, the tail always moves one step diagonally to keep up */
        if ((dX == 2 && dY == 1) || (dX == 1 && dY == 2))
            return new Position(1, 1);

        if ((dX == -2 && dY == -1) || (dX == -1 && dY == -2))
            return new Position(-1, -1);

        return new Position(0, 0);
    }

    public override string ToString()
        => $"({x}, {y})";

}

class SolutionDayNine
{

    private static Position right = new Position(1, 0);
    private static Position left = new Position(-1, 0);
    private static Position up = new Position(0, -1);
    private static Position down = new Position(0, 1);
    private static HashSet<Position> visitedPositions = new HashSet<Position>();
    private static Position head;
    private static Position tail;

    private static string[] GetAllLines(bool test = false)
    {
        var path = "day_9/" + (test ? "test" : "input");
        return System.IO.File.ReadAllLines(@path);
    }

    private static Position[] ParseLine(string line)
    {
        string d = line.Split(" ")[0];
        int moves = Int32.Parse(line.Split(" ")[1]);
        Position[] res = new Position[moves];
        Position direction = d == "R" ? right : d == "L" ? left : d == "U" ? up : down;

        for (int i = 0; i < moves; i++)
            res[i] = direction;

        return res;
    }


    private static void SolvePartOne(string[] input)
    {
    }


    private static void SolvePartTwo(string[] input)
    {
    }

    public static void Solve()
    {
        var input = GetAllLines(true);
        SolvePartOne(input);
        SolvePartTwo(input);
    }

}
