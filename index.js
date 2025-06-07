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
  git init [dir]           # git init [directory]
  git clone <url>          # git clone <url>
  git name "<name>"        # git config --global user.name
  git email "<email>"      # git config --global user.email
  git color                # git config --global color.ui auto
  git config               # git config --global --edit

BASIC OPERATIONS:
  git status | st          # git status
  git add [file]           # git add [file] (default: add all)
  git commit "<msg>" | ci  # git commit -m "message"
  git amend                # git commit --amend

STAGE & SNAPSHOT:
  git reset [file]         # git reset [file]
  git soft [commit]        # git reset --soft [commit] 
  git hard [commit]        # git reset --hard [commit]
  git diff                 # git diff
  git diffstaged           # git diff --staged
  git diffcached           # git diff --cached
  git diffhead             # git diff HEAD
  git unstage [file]       # git reset [file]

BRANCHING:
  git branch | br          # git branch
  git all                  # git branch -a
  git remote               # git branch -r
  git verbose              # git branch -v
  git merged               # git branch --merged
  git unmerged             # git branch --no-merged
  git create <branch>      # git checkout -b <branch>
  git new <branch>         # git branch <branch>
  git switch <branch> | co # git checkout <branch>
  git merge <branch>       # git merge <branch>
  git del <branch>         # git branch -d <branch>
  git delf <branch>        # git branch -D <branch>
  git rename <new>         # git branch -m <new>
  git current              # git branch --show-current

REMOTE OPERATIONS:
  git remote [name] [url]  # git remote add [name] [url]
  git fetch [remote] [br]  # git fetch [remote] [branch]
  git pull [remote]        # git pull [remote]
  git pullrebase [remote]  # git pull --rebase [remote]
  git push [remote] [br]   # git push [remote] [branch]
  git pushforce [remote]   # git push --force [remote]
  git pushall [remote]     # git push --all [remote]
  git pushtags [remote]    # git push --tags [remote]
  git pushu <remote> <br>  # git push -u <remote> <branch>

HISTORY & INSPECTION:
  git log                  # git log
  git oneline              # git log --oneline
  git graph                # git log --graph --decorate
  git stat                 # git log --stat
  git logp                 # git log -p
  git follow <file>        # git log --follow <file>
  git author "<author>"    # git log --author="<author>"
  git loggrep "<pattern>"  # git log --grep="<pattern>"
  git limit <count>        # git log -<count>
  git range <s> <u>        # git log <since>..<until>
  git reflog               # git reflog
  git show <sha>           # git show <sha>

STASHING:
  git stash                # git stash
  git stashlist            # git stash list
  git stashpop             # git stash pop
  git stashdrop            # git stash drop

REWRITING HISTORY:
  git rebase <branch>      # git rebase <branch>
  git rebasei <base>       # git rebase -i <base>
  git revert <commit>      # git revert <commit>

FILE OPERATIONS:
  git rm <file>            # git rm <file>
  git mv <old> <new>       # git mv <old> <new>
  git clean                # git clean -n (dry run)
  git cleanf               # git clean -f (force)
  git checkoutfile <file>  # git checkout -- <file>

TAGGING:
  git tag                  # git tag
  git tagcreate <name>     # git tag <name>
  git taga <name>          # git tag -a <name>
  git tagdel <name>        # git tag -d <name>

Examples:
  git create feature-branch    # Create and switch to new branch
  git commit "Add new feature" # Commit with message
  git pushu origin main        # Push and set upstream
  git logoneline               # View commit history
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
