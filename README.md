# Covadis Pipeline Workshop

This repository demonstrates CI/CD pipelines using GitHub Actions with an Angular application deployed to GitHub Pages.

## Overview

This workshop showcases three separate GitHub Actions workflows:

1. **CI Pipeline** (`ci.yml`) - Continuous Integration
2. **CD Pipeline** (`cd.yml`) - Continuous Deployment
3. **PR Validation** (`pr-validation.yml`) - Pull Request validation

## Architecture

### CI Pipeline (Continuous Integration)
- **Trigger**: Push to `main` branch
- **Purpose**: Build the Angular application and create artifacts
- **Steps**:
  1. Checkout code
  2. Setup Node.js environment
  3. Install dependencies
  4. Build the application
  5. Upload build artifacts for downstream consumption

### CD Pipeline (Continuous Deployment)
- **Trigger**: Automatically triggered when CI pipeline completes successfully
- **Purpose**: Deploy the built application to GitHub Pages
- **Steps**:
  1. Download build artifacts from CI pipeline
  2. Setup GitHub Pages
  3. Upload artifacts to Pages
  4. Deploy to GitHub Pages

### PR Validation Pipeline
- **Trigger**: Pull requests to `main` branch
- **Purpose**: Validate builds before merging
- **Steps**:
  1. Checkout code
  2. Setup Node.js environment
  3. Install dependencies
  4. Build the application
  5. Run tests

## Project Structure

```
.
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI pipeline
│       ├── cd.yml              # CD pipeline
│       └── pr-validation.yml   # PR validation pipeline
├── src/                        # Angular application source
├── public/                     # Static assets
├── dist/                       # Build output (not committed)
├── angular.json                # Angular configuration
├── package.json                # NPM dependencies
└── README.md                   # This file
```

## Local Development

### Prerequisites
- Node.js 20.x or later
- npm 11.x or later

### Setup
```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## GitHub Pages Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

**Live URL**: `https://<username>.github.io/covadis-pipeline-workshop/`

### Configuration Requirements

To enable GitHub Pages deployment:

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select "GitHub Actions"
3. The CD pipeline will automatically deploy on successful CI builds

## Pipeline Details

### Artifact Flow
1. CI pipeline builds the application and uploads artifacts
2. CD pipeline downloads these artifacts (using `workflow_run` trigger)
3. CD pipeline deploys to GitHub Pages

### Security
- Uses GitHub OIDC for secure authentication
- Minimal permissions granted to each workflow
- Artifacts are retained for 1 day (configurable)

## Workshop Learning Objectives

1. **Separation of Concerns**: CI and CD are separate workflows
2. **Artifact Management**: Passing build outputs between pipelines
3. **Workflow Triggers**: Different triggers for different purposes
4. **GitHub Pages**: Deploying static web apps
5. **PR Validation**: Ensuring quality before merge

## Customization

### Changing the Base URL
If deploying to a different repository, update the `baseHref` in `angular.json`:

```json
"baseHref": "/your-repo-name/"
```

### Adding Tests
Add test scripts to `package.json` and they'll be automatically run in the PR validation pipeline.

### Environment Variables
Add secrets in **Settings** → **Secrets and variables** → **Actions** if needed for your deployment.

## Troubleshooting

### Build Failures
- Check the CI workflow logs in the **Actions** tab
- Ensure all dependencies are properly listed in `package.json`

### Deployment Failures
- Verify GitHub Pages is enabled in repository settings
- Check that the CD workflow has proper permissions
- Ensure the CI workflow completed successfully

### PR Validation Failures
- Review the PR validation workflow logs
- Fix any build or test errors before merging

## License

This is a workshop/example repository for educational purposes.
