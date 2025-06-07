#!/usr/bin/env node

const { execSync } = require("child_process");

const [, , cmd, ...args] = process.argv;

const commands = {
  // SETUP & CONFIG
  init: (dir) => (dir ? `git init ${dir}` : `git init`),
  clone: (url) => `git clone ${url}`,
  name: (name) => `git config --global user.name "${name}"`,
  email: (email) => `git config --global user.email "${email}"`,
  color: () => `git config --global color.ui auto`,
  config: () => `git config --global --edit`,

  // BASIC OPERATIONS
  status: () => `git status`,
  add: (file) => (file ? `git add ${file}` : `git add .`),
  commit: (message) => (message ? `git commit -m "${message}"` : `git commit`),
  amend: () => `git commit --amend`,

  // STAGE & SNAPSHOT
  reset: (file) => (file ? `git reset ${file}` : `git reset`),
  soft: (commit) =>
    commit ? `git reset --soft ${commit}` : `git reset --soft`,
  hard: (commit) =>
    commit ? `git reset --hard ${commit}` : `git reset --hard`,
  diff: () => `git diff`,
  diffstaged: () => `git diff --staged`,
  diffcached: () => `git diff --cached`,
  diffhead: () => `git diff HEAD`,

  // BRANCHING
  branch: () => `git branch`,
  all: () => `git branch -a`,
  remote: () => `git branch -r`,
  verbose: () => `git branch -v`,
  merged: () => `git branch --merged`,
  unmerged: () => `git branch --no-merged`,
  create: (branch) => `git checkout -b ${branch}`,
  new: (branch) => `git branch ${branch}`,
  switch: (branch) => `git checkout ${branch}`,
  checkout: (branch) => `git checkout ${branch}`,
  merge: (branch) => `git merge ${branch}`,
  del: (branch) => `git branch -d ${branch}`,
  delf: (branch) => `git branch -D ${branch}`,
  rename: (newName) => `git branch -m ${newName}`,
  current: () => `git branch --show-current`,

  // REMOTE OPERATIONS
  remote: (name, url) =>
    name && url ? `git remote add ${name} ${url}` : `git remote`,
  fetch: (remote, branch) => {
    if (remote && branch) return `git fetch ${remote} ${branch}`;
    if (remote) return `git fetch ${remote}`;
    return `git fetch`;
  },
  pull: (remote) => (remote ? `git pull ${remote}` : `git pull`),
  pullrebase: (remote) =>
    remote ? `git pull --rebase ${remote}` : `git pull --rebase`,
  push: (remote, branch) => {
    if (remote && branch) return `git push ${remote} ${branch}`;
    if (remote) return `git push ${remote}`;
    return `git push`;
  },
  pushforce: (remote) =>
    remote ? `git push ${remote} --force` : `git push --force`,
  pushall: (remote) => (remote ? `git push ${remote} --all` : `git push --all`),
  pushtags: (remote) =>
    remote ? `git push ${remote} --tags` : `git push --tags`,
  pushu: (remote, branch) => `git push -u ${remote} ${branch}`,

  // HISTORY & INSPECTION
  log: () => `git log`,
  oneline: () => `git log --oneline`,
  graph: () => `git log --graph --decorate`,
  stat: () => `git log --stat`,
  logp: () => `git log -p`,
  follow: (file) => `git log --follow ${file}`,
  author: (author) => `git log --author="${author}"`,
  loggrep: (pattern) => `git log --grep="${pattern}"`,
  limit: (count) => `git log -${count}`,
  range: (since, until) => `git log ${since}..${until}`,
  reflog: () => `git reflog`,
  show: (sha) => `git show ${sha}`,

  // STASHING
  stash: () => `git stash`,
  stashlist: () => `git stash list`,
  stashpop: () => `git stash pop`,
  stashdrop: () => `git stash drop`,

  // REWRITING HISTORY
  rebase: (branch) => `git rebase ${branch}`,
  rebasei: (base) => `git rebase -i ${base}`,
  revert: (commit) => `git revert ${commit}`,

  // FILE OPERATIONS
  rm: (file) => `git rm ${file}`,
  mv: (oldPath, newPath) => `git mv ${oldPath} ${newPath}`,
  clean: () => `git clean -n`,
  cleanf: () => `git clean -f`,
  checkoutfile: (file) => `git checkout -- ${file}`,

  // TAGGING
  tag: () => `git tag`,
  tagcreate: (name, commit) =>
    commit ? `git tag ${name} ${commit}` : `git tag ${name}`,
  taga: (name, commit) =>
    commit ? `git tag -a ${name} ${commit}` : `git tag -a ${name}`,
  tagdel: (name) => `git tag -d ${name}`,

  // ALIASES
  st: () => `git status`,
  co: (branch) => `git checkout ${branch}`,
  br: () => `git branch`,
  ci: (message) => (message ? `git commit -m "${message}"` : `git commit`),
  unstage: (file) => (file ? `git reset ${file}` : `git reset`),
};

// Commands that don't require arguments
const noArgsCommands = [
  "init",
  "status",
  "diff",
  "diffstaged",
  "diffcached",
  "diffhead",
  "branch",
  "all",
  "remote",
  "verbose",
  "merged",
  "unmerged",
  "current",
  "fetch",
  "pull",
  "pullrebase",
  "push",
  "log",
  "oneline",
  "graph",
  "stat",
  "logp",
  "reflog",
  "stash",
  "stashlist",
  "stashpop",
  "stashdrop",
  "clean",
  "cleanf",
  "tag",
  "color",
  "config",
  "amend",
  "reset",
  "soft",
  "hard",
  "st",
  "br",
];

// Commands that require at least one argument
const requiresArgsCommands = [
  "clone",
  "name",
  "email",
  "create",
  "new",
  "switch",
  "checkout",
  "merge",
  "del",
  "delf",
  "rename",
  "rebase",
  "rebasei",
  "revert",
  "rm",
  "checkoutfile",
  "tagcreate",
  "taga",
  "tagdel",
  "show",
  "follow",
  "author",
  "loggrep",
  "limit",
  "range",
  "co",
  "unstage",
  "mv",
];

if (!cmd || cmd === "help") {
  console.log(`
Git CLI Shortcuts - Complete Git Command Tool

SETUP & CONFIG:
  g init [dir]           # git init [directory]
  g clone <url>          # git clone <url>
  g name "<name>"        # git config --global user.name
  g email "<email>"      # git config --global user.email
  g color                # git config --global color.ui auto
  g config               # git config --global --edit

BASIC OPERATIONS:
  g status | st          # git status
  g add [file]           # git add [file] (default: add all)
  g commit "<msg>" | ci  # git commit -m "message"
  g amend                # git commit --amend

STAGE & SNAPSHOT:
  g reset [file]         # git reset [file]
  g soft [commit]        # git reset --soft [commit] 
  g hard [commit]        # git reset --hard [commit]
  g diff                 # git diff
  g diffstaged           # git diff --staged
  g diffcached           # git diff --cached
  g diffhead             # git diff HEAD
  g unstage [file]       # git reset [file]

BRANCHING:
  g branch | br          # git branch
  g all                  # git branch -a
  g remote               # git branch -r
  g verbose              # git branch -v
  g merged               # git branch --merged
  g unmerged             # git branch --no-merged
  g create <branch>      # git checkout -b <branch>
  g new <branch>         # git branch <branch>
  g switch <branch> | co # git checkout <branch>
  g merge <branch>       # git merge <branch>
  g del <branch>         # git branch -d <branch>
  g delf <branch>        # git branch -D <branch>
  g rename <new>         # git branch -m <new>
  g current              # git branch --show-current

REMOTE OPERATIONS:
  g remote [name] [url]  # git remote add [name] [url]
  g fetch [remote] [br]  # git fetch [remote] [branch]
  g pull [remote]        # git pull [remote]
  g pullrebase [remote]  # git pull --rebase [remote]
  g push [remote] [br]   # git push [remote] [branch]
  g pushforce [remote]   # git push --force [remote]
  g pushall [remote]     # git push --all [remote]
  g pushtags [remote]    # git push --tags [remote]
  g pushu <remote> <br>  # git push -u <remote> <branch>

HISTORY & INSPECTION:
  g log                  # git log
  g oneline              # git log --oneline
  g graph                # git log --graph --decorate
  g stat                 # git log --stat
  g logp                 # git log -p
  g follow <file>        # git log --follow <file>
  g author "<author>"    # git log --author="<author>"
  g loggrep "<pattern>"  # git log --grep="<pattern>"
  g limit <count>        # git log -<count>
  g range <s> <u>        # git log <since>..<until>
  g reflog               # git reflog
  g show <sha>           # git show <sha>

STASHING:
  g stash                # git stash
  g stashlist            # git stash list
  g stashpop             # git stash pop
  g stashdrop            # git stash drop

REWRITING HISTORY:
  g rebase <branch>      # git rebase <branch>
  g rebasei <base>       # git rebase -i <base>
  g revert <commit>      # git revert <commit>

FILE OPERATIONS:
  g rm <file>            # git rm <file>
  g mv <old> <new>       # git mv <old> <new>
  g clean                # git clean -n (dry run)
  g cleanf               # git clean -f (force)
  g checkoutfile <file>  # git checkout -- <file>

TAGGING:
  g tag                  # git tag
  g tagcreate <name>     # git tag <name>
  g taga <name>          # git tag -a <name>
  g tagdel <name>        # git tag -d <name>

Examples:
  g create feature-branch    # Create and switch to new branch
  g commit "Add new feature" # Commit with message
  g pushu origin main        # Push and set upstream
  g logoneline               # View commit history
`);
  process.exit(0);
}

if (!commands[cmd]) {
  console.error(`Unknown command: ${cmd}. Use 'git help' to see all commands.`);
  process.exit(1);
}

// Check if command requires arguments but none provided
if (requiresArgsCommands.includes(cmd) && args.length === 0) {
  console.error(
    `Command '${cmd}' requires arguments. Use 'git help' for usage.`
  );
  process.exit(1);
}

try {
  const gitCommand = commands[cmd](...args);
  console.log(`Running: ${gitCommand}`);
  execSync(gitCommand, { stdio: "inherit" });
} catch (error) {
  console.error("Error:", error.message);
}
