class SolutionDayOne
{

    private static string[] GetAllLines(bool test = false)
    {
        var path = "day_1_2/" + (test ? "test" : "input");
        return System.IO.File.ReadAllLines(@path);
    }

    private static List<List<int>> Group(string[] lines)
    {
        var result = new List<List<int>>();
        result.Add(new List<int>());

        for (int i = 0; i < lines.Length; i++)
        {
            try
            {
                int number = Int32.Parse(lines[i]);
                result[result.Count() - 1].Add(number);
            }
            catch (FormatException)
            {
                result.Add(new List<int>());
            }
        }

        return result;
    }

    private static int[] ShiftArr(int[] arr, int fromIndex, int newValue)
    {
        int[] copy = arr.ToArray();
        for (int i = 2; i > fromIndex; i--)
            copy[i] = copy[i - 1];

        copy[fromIndex] = newValue;
        return copy;
    }

    private static int[] GetMax(List<List<int>> groups)
    {
        int[] max = { -1, -2, -3 };
        groups.ForEach((group) =>
        {
            var sum = group.Sum();
            int idx = -1;

            if (sum > max[0])
            {
                idx = 0;
            }
            else if (sum > max[1])
            {
                idx = 1;
            }
            else if (sum > max[2])
            {
                idx = 2;
            }

            if (idx > -1)
            {
                max = ShiftArr(max, idx, sum);
            }
        });

        return max;
    }
    public static void Solve()
    {
        var input = GetAllLines(false);
        var groups = Group(input);
        var maxes = GetMax(groups);

        Console.WriteLine($"Day 1:1: {maxes[0]}");
        Console.WriteLine($"Day 1:2: {maxes.Sum()}");
    }

}
