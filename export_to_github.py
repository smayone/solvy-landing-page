import os
import subprocess
import sys
from github import Github
from github.GithubException import GithubException

def setup_git_config():
    subprocess.run(["git", "config", "user.name", "smayone"])
    subprocess.run(["git", "config", "user.email", "noreply@github.com"])

def export_to_github():
    try:
        # Get GitHub token from environment
        github_token = os.environ.get('GITHUB_TOKEN')
        if not github_token:
            print("Error: GITHUB_TOKEN not found in environment variables")
            sys.exit(1)

        # Initialize GitHub client
        g = Github(github_token)

        # Create or get repository
        repo_name = "solvy-landing-page"
        user_name = "smayone"

        try:
            # Get the authenticated user and create repository
            auth_user = g.get_user()
            repo = auth_user.create_repo(
                repo_name,
                private=False,
                description="SOLVY Landing Page - Web3 Financial Platform with ACH/ISO20022 to ETH Bridge Support",
                has_issues=True,
                has_wiki=True,
                has_downloads=True,
                auto_init=False
            )
        except GithubException as e:
            if e.status == 422:  # Repository exists
                repo = g.get_repo(f"{user_name}/{repo_name}")
            else:
                raise

        # Setup git and push
        setup_git_config()

        # Initialize git if needed
        if not os.path.exists('.git'):
            subprocess.run(["git", "init"])

        # Add remote
        subprocess.run(["git", "remote", "rm", "origin"], stderr=subprocess.DEVNULL)
        subprocess.run(["git", "remote", "add", "origin", f"https://x-access-token:{github_token}@github.com/{user_name}/{repo_name}.git"])

        # Add and commit files
        subprocess.run(["git", "add", "."])
        subprocess.run(["git", "commit", "-m", "Initial commit of SOLVY landing page with future ACH/ISO20022 to ETH bridge feature planning"])

        # Push to GitHub
        subprocess.run(["git", "push", "-u", "origin", "main"])

        print(f"Successfully exported to https://github.com/{user_name}/{repo_name}")

        # Configure branch protection
        main_branch = repo.get_branch("main")
        main_branch.edit_protection(
            strict=True,
            require_code_owner_reviews=True,
            required_approving_review_count=1
        )

        print("Repository setup complete with branch protection rules")

    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    export_to_github()