class SolutionDayTwo
{
    private static int WIN_SCORE = 6, DRAW_SCORE = 3, LOSE_SCORE = 0;

    private class Option
    {
        private string ch;

        public Option(string ch)
        {
            this.ch = ch;
        }

        private string[] GetOutcomes()
        {
            if (this.ch == "A")
            {
                return new string[] { "Z", "X", "Y" };
            }
            else if (this.ch == "B")
            {
                return new string[] { "X", "Y", "Z" };
            }

            return new string[] { "Y", "Z", "X" };
        }

        private int GetScore(String me)
        {
            return me == "X" ? 1 : me == "Y" ? 2 : 3;
        }

        public int PlayRound(Option me)
        {
            bool draw = (ch == "A" && me.ch == "X") || (ch == "B" && me.ch == "Y") || (ch == "C" && me.ch == "Z");
            bool lose = (ch == "A" && me.ch == "Z") || (ch == "B" && me.ch == "X") || (ch == "C" && me.ch == "Y");

            return GetScore(me.ch) + (draw ? DRAW_SCORE : lose ? LOSE_SCORE : WIN_SCORE);
        }

        public int PlayRoundAsd(string outcome)
        {
            string[] outcomes = GetOutcomes();
            return outcome == "X"
                ? LOSE_SCORE + GetScore(outcomes[0]) : outcome == "Y"
                ? DRAW_SCORE + GetScore(outcomes[1]) : WIN_SCORE + GetScore(outcomes[2]);
        }
    }

    private static string[] GetAllLines(bool test = false)
    {
        var path = "day_2/" + (test ? "test" : "input");
        return System.IO.File.ReadAllLines(@path);
    }

    public static int PlayRound(string line)
    {
        var opts = line.Split(" ");
        return new Option(opts[0]).PlayRound(new Option(opts[1]));
    }

    public static int PlayRoundAsd(string line)
    {
        var opts = line.Split(" ");
        return new Option(opts[0]).PlayRoundAsd(opts[1]);
    }

    public static void Solve()
    {
        var input = GetAllLines(false);
        int sumOne = 0;
        int sumTwo = 0;

        foreach (string line in input)
        {
            sumOne += PlayRound(line);
            sumTwo += PlayRoundAsd(line);
        }

        Console.WriteLine($"Day 2:1 = {sumOne}\nDay 2:2 = {sumTwo}");
    }
}
