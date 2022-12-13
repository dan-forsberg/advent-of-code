struct Position
{
    public int x = 0;
    public int y = 0;

    public Position(int X, int Y)
    {
        x = X;
        y = Y;
    }

    public void PrintBoard(Position tail)
    {
        for (int _y = -4; _y <= 0; _y++)
        {
            for (int _x = 0; _x < 6; _x++)
            {
                char c = '.';
                if (_x == tail.x && _y == tail.y)
                    c = 'T';
                if (_x == x && _y == y)
                    c = 'H';
                Console.Write(c);
            }
            Console.WriteLine();
        }

        Console.WriteLine();
    }

    public string PosToString()
    {
        string res = "";

        if (x == 1)
            res += "right ";
        if (x == -1)
            res += "left ";
        if (y == 1)
            res += "down ";
        if (y == -1)
            res += "up ";

        return res.Trim().ToUpper();
    }

    public void Move(Position p)
    {
        this.x += p.x;
        this.y += p.y;
    }

    public bool IsAdjecent(Position p)
        => Math.Abs(p.x - x) <= 1 && Math.Abs(p.y - y) <= 1;

    public Position GetNecessaryMove(Position p)
    {
        var dX = p.x - x;
        var dY = p.y - y;

        if (IsAdjecent(p))
            return new Position(0, 0);
        if (dX == 2 && dY == 0)
            return new Position(1, 0);
        else if (dX == -2 && dY == 0)
            return new Position(-1, 0);
        else if (dX == 0 && dY == 2)
            return new Position(0, 1);
        else if (dX == 0 && dY == -2)
            return new Position(0, -1);
        /* if the head and tail aren't touching and aren't in the same row or
         * column, the tail always moves one step diagonally to keep up */
        else if ((dX == 2 && dY == 1) || (dX == 1 && dY == 2))
            return new Position(1, 1);
        else if ((dX == -2 && dY == -1) || (dX == -1 && dY == -2))
            return new Position(-1, -1);
        else if (dX == 1 && dY == -2)
            return new Position(1, -1);
        else if (dX == -2 && dY == 1)
            return new Position(-1, 1);

        Console.WriteLine($"PANIC!!! ({dX},{dY})");
        throw new Exception();
    }

    public Position DoNecessaryMove(Position p)
    {
        Move(GetNecessaryMove(p));
        return this;
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
        // Console.WriteLine("Parsing and moving for " + line);
        string d = line.Split(" ")[0];
        int moves = Int32.Parse(line.Split(" ")[1]);
        Position[] res = new Position[moves];
        Position direction = d == "R" ? right : d == "L" ? left : d == "U" ? up : down;

        for (int i = 0; i < moves; i++)
            res[i] = direction;

        return res;
    }

    private static void DoNecessaryMoves(Position[] moves)
    {
        foreach (var move in moves)
        {
            head.Move(move);
            visitedPositions.Add(tail.DoNecessaryMove(head));
            // head.PrintBoard(tail);
            // Console.ReadKey();
        }

        // PrintVisitedPositions();
    }

    private static void PrintVisitedPositions()
    {
        for (int _y = -4; _y <= 0; _y++)
        {
            for (int _x = 0; _x < 6; _x++)
                Console.Write(visitedPositions.Contains(new Position(_x, _y)) ? "#" : ".");
            Console.WriteLine();
        }
    }


    private static void SolvePartOne(string[] input)
    {
        foreach (var line in input)
        {
            DoNecessaryMoves(ParseLine(line));
        }

        Console.WriteLine("Day 9:1 = " + visitedPositions.Count());
    }


    private static void SolvePartTwo(string[] input)
    {
        Position h = new Position(4, -1);
        Position t = new Position(3, 0);


        Console.WriteLine($"head: {h}, tail: {t}");
        h.Move(new Position(0, -1));
        Console.WriteLine($"head: {h}, tail: {t}");
        Console.WriteLine($"tail needs to move: {t.GetNecessaryMove(h)}");


    }

    public static void Solve()
    {
        var input = GetAllLines(true);
        SolvePartOne(input);
        // SolvePartTwo(input);
    }

}
