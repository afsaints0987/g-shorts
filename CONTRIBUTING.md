# Contributing to g-shorts

Thank you for your interest in contributing to g-shorts! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Issues

1. Check existing issues to avoid duplicates
2. Use the issue template when creating new issues
3. Provide clear descriptions and steps to reproduce bugs
4. Include system information (OS, Node.js version, Git version)

### Suggesting Features

1. Open an issue with the "enhancement" label
2. Describe the feature and its use case
3. Explain how it would benefit users
4. Consider backward compatibility

### Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/username/g-shorts.git
   cd g-shorts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Link for local testing:
   ```bash
   npm link
   ```

4. Test your changes:
   ```bash
   g help
   g status
   ```

## Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Add comments for complex logic
- Use meaningful variable names
- Keep functions focused and small

## Adding New Commands

When adding new Git shortcuts:

1. Add the command to the `commands` object in `index.js`
2. Add to appropriate category in help text
3. Add to `noArgsCommands` or `requiresArgsCommands` arrays as needed
4. Update README.md with the new command
5. Test the command thoroughly

## Testing

Currently, testing is manual. When adding features:

1. Test the command with various arguments
2. Test error conditions
3. Verify help text is accurate
4. Test on different operating systems if possible

## Documentation

- Update README.md for new features
- Update CHANGELOG.md following semantic versioning
- Ensure examples are accurate and helpful
- Keep documentation clear and concise

## Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Update documentation as needed
3. Add your changes to CHANGELOG.md
4. Ensure all tests pass
5. Get approval from maintainers

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a positive environment

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the "question" label
- Contact the maintainers directly

Thank you for contributing to g-shorts!