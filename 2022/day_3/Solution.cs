class SolutionDayThree
{
    private static string[] GetAllLines(bool test = false)
    {
        var path = "day_3/" + (test ? "test" : "input");
        return System.IO.File.ReadAllLines(@path);
    }

    private static int GetPriority(char c)
    {
        int ord = (int)c;
        return (ord >= 65 && ord <= 90 ? ord - 38 : ord - 96);
    }

    private static char GetCommonLetter(string a, string b, string c = "")
    {
        foreach (char ch in a.ToCharArray())
            if (b.Contains(ch) && (c.Length == 0 || c.Contains(ch)))
                return ch;
        return '-';
    }

    private static int GetPriorityOfRucksacks(string line)
    {
        string a = line.Substring(0, line.Length / 2);
        string b = line.Substring(line.Length / 2);

        return GetPriority(GetCommonLetter(a, b));
    }

    public static void SolveFirst(string[] input)
    {
        var sum = input.Select(rucksack => GetPriorityOfRucksacks(rucksack)).Sum();
        Console.WriteLine($"Day 3:1 = {sum}");
    }

    public static void SolveSecond(string[] input)
    {
        int sum = 0;
        for (int i = 0; i < input.Length; i += 3)
            sum += GetPriority(GetCommonLetter(input[i], input[i + 1], input[i + 2]));

        Console.WriteLine($"Day 3:2 = {sum}");
    }

    public static void Solve()
    {
        var input = GetAllLines(false);
        SolveFirst(input);
        SolveSecond(input);
    }
}
