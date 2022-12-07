class CrateStack
{
    private int number { get; }
    private List<char> stack;

    public CrateStack(List<char> inputString)
    {
        Console.WriteLine($"creating stack from {String.Join(' ', inputString)}");
        number = int.Parse(inputString[inputString.Count() - 1].ToString());
        stack = new List<char>();

        for (int i = inputString.Count() - 2; i >= 0; i--)
        {
            char ch = inputString[i];
            if (ch == ' ')
                continue;
            stack.Add(ch);
        }
    }

    public char Pop()
    {
        int size = stack.Count() - 1;
        char c = stack.ElementAt(size);
        stack.RemoveAt(size);

        return c;
    }

    public void Push(char c)
    {
        stack.Add(c);
    }

    public char Peak(int index = -1)
    {
        if (index > stack.Count() - 1)
            return ' ';

        int i = index;
        if (index == -1)
            i = stack.Count() - 1;

        return stack.ElementAt(i);
    }

    public override String ToString()
    {
        return String.Join(' ', this.stack) + " Number: " + this.number;
    }
}

class SolutionDayFive
{
    private static CrateStack[]? _stacks;

    private static string[] GetAllLines(bool test = false)
    {
        var path = "day_5/" + (test ? "test" : "input");
        return System.IO.File.ReadAllLines(@path);
    }

    private static void ParseStacks(string[] input)
    {
        int divider = Array.IndexOf(input, "");
        string[] firstSection = input.Take(divider).ToArray();
        var stackStrings = new List<List<char>>();
        int numOfStacks = firstSection[firstSection.Length - 1].Replace(" ", "").Length;

        for (int i = 0; i < numOfStacks; i++)
            stackStrings.Add(new List<char>());

        for (int i = 0; i < firstSection.Length; i++)
        {
            var line = firstSection[i];
            for (int y = 1, stack = 0; y < numOfStacks * 4; y += 4, stack++)

                stackStrings[stack].Add(y < line.Length ? line[y] : ' ');

        }

        CrateStack[] stacks = new CrateStack[numOfStacks];
        for (int i = 0; i < numOfStacks; i++)
        {
            Console.WriteLine($"i = {i}, stacks.lenth = {stacks.Length}, stackstrings count = {numOfStacks}");
            stacks[i] = new CrateStack(stackStrings[i]);
        }

        _stacks = stacks;
    }

    private static void DoMoves(string[] input)
    {
        int divider = Array.IndexOf(input, "");
        string[] instructions = input.TakeLast(input.Length - divider - 1).ToArray();
        foreach (var inst in instructions)
            DoMove(inst);

    }

    private static void DoMove(string instruction)
    {
        if (_stacks == null) return;
        var split = instruction.Split(" ");
        var quantity = int.Parse(split[1]);
        var from = int.Parse(split[3]) - 1;
        var to = int.Parse(split[5]) - 1;

        for (int i = 0; i < quantity; i++)
        {
            //Console.WriteLine($"Moving {_stacks[from].Peak()} from stack {from + 1} to stack {to + 1}");
            _stacks[to].Push(_stacks[from].Pop());
        }

    }

    public static void Solve()
    {
        var input = GetAllLines(false);
        ParseStacks(input);
        DoMoves(input);

        foreach (var stack in _stacks)
        {
            Console.Write(stack.Peak());
        }
    }
}
