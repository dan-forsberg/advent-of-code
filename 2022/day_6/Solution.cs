class SolutionDaySix
{
    private static string[] GetAllLines(bool test = false)
    {
        var path = "day_6/" + (test ? "test" : "input");
        return System.IO.File.ReadAllLines(@path);
    }

    private static int GetPositionOfUniqueNthChar(string input, int n = 4)
    {
        for (int i = 0; i < (input.Length - n); i++)
            if (new HashSet<char>(input.Substring(i, n).ToCharArray()).Count() == n)
                return n + i;

        return -1;
    }

    private static void SolvePartOne(string[] input)
    {
        foreach (string str in input)
            Console.WriteLine(GetPositionOfUniqueNthChar(str, 4));
    }

    private static void SolvePartTwo(string[] input)
    {
        foreach (string str in input)
            Console.WriteLine(GetPositionOfUniqueNthChar(str, 14));
    }

    public static void Solve()
    {
        var input = GetAllLines(false);
        SolvePartOne(input);
        SolvePartTwo(input);
    }

}
