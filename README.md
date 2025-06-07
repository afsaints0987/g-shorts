# g-shorts

A CLI tool that simplifies Git commands with intuitive shortcuts. This Node.js-based tool provides memorable aliases for all common Git operations, making Git usage faster and more efficient.

## Features

- **Intuitive Commands**: Easy-to-remember shortcuts for complex Git operations
- **Complete Coverage**: Covers setup, branching, remote operations, history inspection, and more
- **Argument Validation**: Automatically validates required arguments
- **Built-in Help**: Comprehensive help system with examples
- **Error Handling**: Clear error messages and execution feedback

## Installation

### Method 1: NPM (Recommended)
```bash
npm install -g g-shorts
```

### Method 2: From Source
1. Clone or download this repository
2. Navigate to the project directory
3. Install globally:
   ```bash
   npm install -g .
   ```

### Method 3: Manual Installation
1. Clone or download this repository
2. Make the script executable:
   ```bash
   chmod +x index.js
   ```
3. Create a symbolic link for global access:
   ```bash
   ln -s /path/to/index.js /usr/local/bin/g
   ```

## Usage

Run commands using the format: `g <command> [arguments]`

### Quick Start Examples

```bash
# Initialize a new repository
g init

# Clone a repository
g clone https://github.com/user/repo.git

# Check status
g status

# Add and commit changes
g add .
g commit "Initial commit"

# Create and switch to new branch
g create feature-branch

# Push with upstream tracking
g pushu origin main
```

## Command Reference

### Setup & Configuration

| Command | Description | Git Equivalent |
|---------|-------------|----------------|
| `g init [dir]` | Initialize repository | `git init [directory]` |
| `g clone <url>` | Clone repository | `git clone <url>` |
| `g name "<n>"` | Set global username | `git config --global user.name "<n>"` |
| `g email "<email>"` | Set global email | `git config --global user.email "<email>"` |
| `g color` | Enable colored output | `git config --global color.ui auto` |
| `g config` | Edit global config | `git config --global --edit` |

### Basic Operations

| Command | Description | Git Equivalent |
|---------|-------------|----------------|
| `g status` / `g st` | Show repository status | `git status` |
| `g add [file]` | Stage changes (all if no file) | `git add [file]` / `git add .` |
| `g commit "<msg>"` / `g ci` | Commit with message | `git commit -m "<message>"` |
| `g amend` | Amend last commit | `git commit --amend` |

### Stage & Snapshot

| Command | Description | Git Equivalent |
|---------|-------------|----------------|
| `g reset [file]` | Unstage changes | `git reset [file]` |
| `g soft [commit]` | Soft reset to commit | `git reset --soft [commit]` |
| `g hard [commit]` | Hard reset to commit | `git reset --hard [commit]` |
| `g diff` | Show working directory changes | `git diff` |
| `g diffstaged` | Show staged changes | `git diff --staged` |
| `g diffcached` | Show cached changes | `git diff --cached` |
| `g diffhead` | Show changes vs HEAD | `git diff HEAD` |
| `g unstage [file]` | Unstage file | `git reset [file]` |

### Branching

| Command | Description | Git Equivalent |
|---------|-------------|----------------|
| `g branch` / `g br` | List local branches | `git branch` |
| `g all` | List all branches | `git branch -a` |
| `g remote` | List remote branches | `git branch -r` |
| `g verbose` | List branches with details | `git branch -v` |
| `g merged` | List merged branches | `git branch --merged` |
| `g unmerged` | List unmerged branches | `git branch --no-merged` |
| `g create <branch>` | Create and switch to branch | `git checkout -b <branch>` |
| `g new <branch>` | Create new branch | `git branch <branch>` |
| `g switch <branch>` / `g co` | Switch to branch | `git checkout <branch>` |
| `g merge <branch>` | Merge branch | `git merge <branch>` |
| `g del <branch>` | Delete branch (safe) | `git branch -d <branch>` |
| `g delf <branch>` | Force delete branch | `git branch -D <branch>` |
| `g rename <new>` | Rename current branch | `git branch -m <new>` |
| `g current` | Show current branch | `git branch --show-current` |

### Remote Operations

| Command | Description | Git Equivalent |
|---------|-------------|----------------|
| `g remote [name] [url]` | Add remote or list remotes | `git remote add [name] [url]` / `git remote` |
| `g fetch [remote] [branch]` | Fetch from remote | `git fetch [remote] [branch]` |
| `g pull [remote]` | Pull from remote | `git pull [remote]` |
| `g pullrebase [remote]` | Pull with rebase | `git pull --rebase [remote]` |
| `g push [remote] [branch]` | Push to remote | `git push [remote] [branch]` |
| `g pushforce [remote]` | Force push | `git push --force [remote]` |
| `g pushall [remote]` | Push all branches | `git push --all [remote]` |
| `g pushtags [remote]` | Push tags | `git push --tags [remote]` |
| `g pushu <remote> <branch>` | Push with upstream | `git push -u <remote> <branch>` |

### History & Inspection

| Command | Description | Git Equivalent |
|---------|-------------|----------------|
| `g log` | Show commit history | `git log` |
| `g oneline` | Show one-line commit history | `git log --oneline` |
| `g graph` | Show commit graph | `git log --graph --decorate` |
| `g stat` | Show commit statistics | `git log --stat` |
| `g logp` | Show commit patches | `git log -p` |
| `g follow <file>` | Follow file history | `git log --follow <file>` |
| `g author "<author>"` | Filter by author | `git log --author="<author>"` |
| `g loggrep "<pattern>"` | Search commit messages | `git log --grep="<pattern>"` |
| `g limit <count>` | Limit commit count | `git log -<count>` |
| `g range <since> <until>` | Show commit range | `git log <since>..<until>` |
| `g reflog` | Show reference log | `git reflog` |
| `g show <sha>` | Show commit details | `git show <sha>` |

### Stashing

| Command | Description | Git Equivalent |
|---------|-------------|----------------|
| `g stash` | Stash changes | `git stash` |
| `g stashlist` | List stashes | `git stash list` |
| `g stashpop` | Apply and remove stash | `git stash pop` |
| `g stashdrop` | Delete stash | `git stash drop` |

### Rewriting History

| Command | Description | Git Equivalent |
|---------|-------------|----------------|
| `g rebase <branch>` | Rebase onto branch | `git rebase <branch>` |
| `g rebasei <base>` | Interactive rebase | `git rebase -i <base>` |
| `g revert <commit>` | Revert commit | `git revert <commit>` |

### File Operations

| Command | Description | Git Equivalent |
|---------|-------------|----------------|
| `g rm <file>` | Remove file | `git rm <file>` |
| `g mv <old> <new>` | Move/rename file | `git mv <old> <new>` |
| `g clean` | Show untracked files (dry run) | `git clean -n` |
| `g cleanf` | Remove untracked files | `git clean -f` |
| `g checkoutfile <file>` | Restore file | `git checkout -- <file>` |

### Tagging

| Command | Description | Git Equivalent |
|---------|-------------|----------------|
| `g tag` | List tags | `git tag` |
| `g tagcreate <n>` | Create lightweight tag | `git tag <n>` |
| `g taga <n>` | Create annotated tag | `git tag -a <n>` |
| `g tagdel <n>` | Delete tag | `git tag -d <n>` |

## Common Workflows

### Starting a New Project
```bash
g init
g name "Your Name"
g email "your.email@example.com"
g add .
g commit "Initial commit"
g remote origin https://github.com/user/repo.git
g pushu origin main
```

### Feature Development
```bash
g create feature-branch
# Make changes
g add .
g commit "Add new feature"
g switch main
g merge feature-branch
g del feature-branch
```

### Checking History
```bash
g oneline           # Quick overview
g graph            # Visual representation
g author "John"    # Filter by author
g limit 10         # Last 10 commits
```

### Working with Remotes
```bash
g fetch origin
g pull origin main
g push origin feature-branch
g pushtags origin
```

## Error Handling

The tool includes comprehensive error handling:
- **Unknown commands**: Shows error message and suggests using help
- **Missing arguments**: Validates required arguments for each command
- **Git execution errors**: Displays Git error messages directly

## Getting Help

Use `g help` or run `g` without arguments to see the complete command reference with examples.

## Requirements

- Node.js (any recent version)
- Git installed on your system
- Unix-like environment (Linux, macOS, WSL)

## Author

**Aaron Santos**

## Contributing

Feel free to submit issues and enhancement requests. This tool is designed to be comprehensive yet simple to use.

## License

MIT License - see the LICENSE file for details.