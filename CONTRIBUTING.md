# Contributing to ReWear Project

Thank you for your interest in contributing to the ReWear Community Clothing Exchange project! This document provides guidelines for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Odoo.git
   cd Odoo
   ```
3. **Set up the development environment**:
   - For Backend: See [Backend/README.md](Backend/README.md)
   - For Frontend: See [rewear-new/README.md](rewear-new/README.md)

4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. Make your changes in your feature branch
2. Test your changes thoroughly
3. Commit your changes with clear, descriptive commit messages
4. Push your branch to your fork
5. Create a Pull Request to the main repository

## Code Style Guidelines

### JavaScript/Node.js

- Use ES6+ syntax
- Follow the existing code style (we use Prettier)
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### React

- Use functional components with hooks
- Follow React best practices
- Keep components small and reusable
- Use prop-types or TypeScript for type checking

### General

- Write self-documenting code
- Avoid hardcoded values; use constants or environment variables
- Handle errors appropriately
- Add JSDoc comments for public APIs

### Formatting

This project uses Prettier for code formatting. Before committing:

```bash
cd Backend
npm run format  # if you've set up a format script
```

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Code style changes (formatting, missing semicolons, etc.)
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Changes to build process or auxiliary tools

### Examples:

```
feat: add user profile image upload
fix: resolve authentication token expiration issue
docs: update API documentation for product endpoints
refactor: simplify error handling middleware
```

## Pull Request Process

1. **Update documentation** if you've changed APIs or added features
2. **Add tests** for new functionality
3. **Ensure all tests pass** before submitting
4. **Update the README.md** with details of changes if applicable
5. **Link any related issues** in your PR description

### PR Description Template:

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex areas
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests pass
```

## Reporting Bugs

When reporting bugs, please include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the bug
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** if applicable
6. **Environment details**:
   - OS
   - Node.js version
   - Browser (for frontend issues)

## Suggesting Features

We welcome feature suggestions! Please:

1. **Check existing issues** to avoid duplicates
2. **Provide a clear description** of the feature
3. **Explain the use case** and benefits
4. **Consider the scope** - is it in line with project goals?

## Code Review Process

- All submissions require review before merging
- Reviewers may suggest changes or improvements
- Be responsive to feedback and make requested changes
- Once approved, a maintainer will merge your PR

## Development Setup Checklist

Before starting development, ensure you have:

- [ ] Node.js (v14 or higher) installed
- [ ] MongoDB installed and running (or MongoDB Atlas account)
- [ ] Cloudinary account for file uploads
- [ ] All environment variables configured
- [ ] Dependencies installed (`npm install`)
- [ ] Tests passing (`npm test` if available)

## Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Reach out to the maintainers

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

---

Thank you for contributing to ReWear! 🎉
