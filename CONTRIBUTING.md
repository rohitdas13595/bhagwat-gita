# Contributing to Obsidian Gita

First off, thank you for considering contributing to Obsidian Gita! It's people like you that make expanding this wisdom portal such a great experience.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior directly to the repository maintainers.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

- **Check open issues** before submitting a new one.
- **Provide detailed context** about the bug such as OS, Browser version, and Steps to Reproduce.
- **Include screenshots** or screencasts if relevant.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When you create an enhancement issue, please fill in the following:

- A clear, descriptive title.
- A step-by-step description of the suggested enhancement.
- Explain why this enhancement would be useful to most users.

## Pull Requests

### Setting up the Developer Environment

1. **Fork** the repository and clone your fork locally:
   ```bash
   git clone https://github.com/your-username/bhagwat-geeta.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the local dev server**:
   ```bash
   npm run dev
   ```

### Making Changes

1. **Create a branch** for your specific feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Commit your changes**. Write clear, concise commit messages following standard Conventional Commits (`feat:`, `fix:`, `chore:`, etc.).
3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
4. **Submit a Pull Request** against the `main` branch. Provide a comprehensive summary of your changes in the PR description.

## Styling Guidelines

We use Next.js alongside **Tailwind CSS v4**. Please ensure any new components adhere to the existing minimalist, dark-themed "Obsidian" aesthetics layout patterns defined in `app/globals.css` and the `cn` utility logic.

Thank you for contributing!
