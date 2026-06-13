import { spawnSync } from "node:child_process";

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: false,
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  return result.status ?? 1;
};

const read = (command, args) => {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  return result.stdout.trim();
};

const changedFiles = () =>
  read("git", ["status", "--short"])
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^.. /, ""));

const message = process.argv.slice(2).join(" ").trim();

if (!message) {
  console.error('Commit message required: npm run auto-commit -- "Describe the change"');
  process.exit(1);
}

const filesBeforeBuild = changedFiles();

if (filesBeforeBuild.length === 0) {
  console.log("No changes to commit.");
  process.exit(0);
}

console.log("Running build before checkpoint...");
const buildStatus = run("npm", ["run", "build"]);

if (buildStatus !== 0) {
  console.error("Build failed. Refusing to create a commit.");
  process.exit(buildStatus);
}

const filesAfterBuild = changedFiles();

if (filesAfterBuild.length === 0) {
  console.log("No changes to commit after build.");
  process.exit(0);
}

console.log("Staging changes...");
const addStatus = run("git", ["add", "--all"]);

if (addStatus !== 0) {
  console.error("Failed to stage changes.");
  process.exit(addStatus);
}

console.log(`Creating local commit: ${message}`);
const commitStatus = run("git", ["commit", "-m", message]);

if (commitStatus !== 0) {
  console.error("Commit failed.");
  process.exit(commitStatus);
}

console.log("Local checkpoint commit created. No push was attempted.");
