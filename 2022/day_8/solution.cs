class SolutionDayEight
{
    private static int width;
    private static int height;

    private static string[] GetAllLines(bool test = false)
    {
        var path = "day_8/" + (test ? "test" : "input");
        return System.IO.File.ReadAllLines(@path);
    }

    private static int[] ConvertTo1D(string[] input)
    {
        height = input.Length;
        width = input[0].Length;

        int[] numbers = new int[input.Length * width];
        int i = 0;
        foreach (var line in input)
            foreach (var c in line.ToCharArray())
                numbers[i++] = Int32.Parse(c + "");


        return numbers;
    }

    private static int xy(int x, int y) => (y * width) + x;

    private static string dirToStr(int dX, int dY) => dX == -1 ? "left" : dX == 1 ? "right" : dY == -1 ? "up" : "down";

    private static bool IsInvisibleInDirection(int[] input, int X, int Y, int dX, int dY, out int count)
    {
        int compare = input[xy(X, Y)];
        int _x = X + dX, _y = Y + dY;
        count = 0;

        // Console.WriteLine($"Starting point: ({X}, {Y}) = {compare}");

        while (_x >= 0 && _y >= 0 && _x < width && _y < height)
        {

            int p = input[xy(_x, _y)];
            // Console.Write($"\tlooking to the {dirToStr(dX, dY).ToUpper()}, ({_x}, {_y}) = {p} is blocking: ");
            if (p >= compare)
            {
                // Console.WriteLine("YES");
                return true;
            }

            // Console.WriteLine("NO");

            count++;
            _x += dX;
            _y += dY;
        }

        return false;
    }

    private static bool IsInvisibleNESW(int[] input, int X, int Y)
    {
        int garbage = 0;
        return !IsInvisibleInDirection(input, X, Y, -1, +0, out garbage) ||
        !IsInvisibleInDirection(input, X, Y, +1, +0, out garbage) ||
        !IsInvisibleInDirection(input, X, Y, +0, -1, out garbage) ||
        !IsInvisibleInDirection(input, X, Y, +0, +1, out garbage);
    }

    private static void SolvePartOne(int[] input)
    {
        int totalVisible = 0;
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {

                if (IsInvisibleNESW(input, x, y))
                {
                    totalVisible++;
                    continue;
                }
            }
        }

        Console.WriteLine($"Part 1: {totalVisible}");
    }

    private static int GetScenicScore(int[] input, int X, int Y)
    {
        int counter = 0;
        int totalScore = 1;
        bool blocked = false;

        blocked = IsInvisibleInDirection(input, X, Y, +0, -1, out counter);
        //Console.WriteLine($"Looking up the view is blocked (={blocked}) at {counter} trees");
        totalScore *= (counter + (blocked ? 1 : 0));

        blocked = IsInvisibleInDirection(input, X, Y, -1, +0, out counter);
        //Console.WriteLine($"Looking left the view is blocked (={blocked}) at {counter} trees");
        totalScore *= (counter + (blocked ? 1 : 0));

        blocked = IsInvisibleInDirection(input, X, Y, +0, +1, out counter);
        //Console.WriteLine($"Looking down the view is blocked (={blocked}) at {counter} trees");
        totalScore *= (counter + (blocked ? 1 : 0));

        blocked = IsInvisibleInDirection(input, X, Y, +1, +0, out counter);
        //Console.WriteLine($"Looking right the view is blocked (={blocked}) at {counter} trees");
        totalScore *= (counter + (blocked ? 1 : 0));

        return totalScore;
    }


    private static void SolvePartTwo(int[] input)
    {
        int maxScenicScore = -1;
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                maxScenicScore = Math.Max(maxScenicScore, GetScenicScore(input, x, y));
            }
        }


        Console.WriteLine($"Part 2: {maxScenicScore}");
    }

    public static void Solve()
    {
        var input = ConvertTo1D(GetAllLines(false));
        SolvePartOne(input);
        SolvePartTwo(input);
    }

}
