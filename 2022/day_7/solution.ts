const text = (await Deno.readTextFile("./input")).split("\n");

interface IPath {
  path: string[];
  name: string;
  size: number;
}

interface ICommand {
  command: string;
  argument: string | undefined;
  cwd: string[];
  result: string[];
}

const cwd: string[] = [];
const commands: ICommand[] = [];

for (let i = 0, EOF = true; i < text.length; i++) {
  EOF = true;
  const [command, argument] = text[i].substring(2).split(" ");
  const result: string[] = [];
  for (let j = i + 1; j < text.length; j++) {
    i = j - 1;
    if (!text[j].startsWith("$")) {
      result.push(text[j]);
    } else {
      EOF = false;
      break;
    }
  }

  if (command == "cd") {
    if (argument == "..") cwd.pop();
    else cwd.push(argument);
  }

  commands.push({ command, argument, cwd: [...cwd], result });
  if (EOF) break;
}

const listings = commands.filter((c) => c.command === "ls");

const paths: IPath[] = listings.map((ls) => {
  const files = ls.result.filter((r) => !r.startsWith("dir"));
  const totalSize = files.reduce(
    (tot, curr) =>
      curr.length == 0 ? tot : tot + Number.parseInt(curr.split(" ")[0]),
    0,
  );

  return {
    path: ls.cwd,
    name: "",
    size: totalSize,
  };
});

paths.forEach((path) => {
  path.size += paths.filter((p) =>
    path.path.every((_path, idx) =>
      p.path[idx] === _path && p.path.length > path.path.length
    )
  ).reduce((tot, curr) => tot += curr.size, 0);
});

const resPartOne = paths.filter((p) => p.size <= 100000).reduce(
  (tot, curr) => tot += curr.size,
  0,
);

console.log(resPartOne);
