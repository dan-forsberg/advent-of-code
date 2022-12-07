class SolutionDayFour
{
    private static string[] GetAllLines(bool test = false)
    {
        var path = "day_4/" + (test ? "test" : "input");
        return System.IO.File.ReadAllLines(@path);
    }

    private static bool doesRangesIncludeEachOther(string a, string b, bool exclusive)
    {
        int pairOneStart = -1, pairOneEnd = -1, pairTwoStart = -1, pairTwoEnd = -1;
        string[] aSplit = a.Split("-");
        string[] bSplit = b.Split("-");

        Int32.TryParse(aSplit[0], out pairOneStart);
        Int32.TryParse(aSplit[1], out pairOneEnd);

        Int32.TryParse(bSplit[0], out pairTwoStart);
        Int32.TryParse(bSplit[1], out pairTwoEnd);

        bool isExclusivelyOverlapped = (pairOneStart <= pairTwoStart && pairOneEnd >= pairTwoEnd) || (pairOneStart >= pairTwoStart && pairOneEnd <= pairTwoEnd);
        bool hasAnyOverlap = (pairOneEnd >= pairTwoStart && pairOneStart <= pairTwoStart) || (pairTwoEnd >= pairOneStart && pairTwoStart <= pairOneStart);

        return exclusive ? isExclusivelyOverlapped : hasAnyOverlap;
    }

    public static void Solve()
    {
        var input = GetAllLines(false);
        int exclCount = 0, inclCount = 0;

        foreach (var line in input)
        {
            var ab = line.Split(",");
            exclCount += doesRangesIncludeEachOther(ab[0], ab[1], true) ? 1 : 0;
            inclCount += doesRangesIncludeEachOther(ab[0], ab[1], false) ? 1 : 0;
        }

        Console.WriteLine($"Day 4:1 = {exclCount}. Day 4:2 = {inclCount}");
    }
}
