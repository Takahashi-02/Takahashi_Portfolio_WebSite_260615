const navToggle = document.querySelector('.nav-toggle');
const globalNav = document.querySelector('.global-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = globalNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

globalNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    globalNav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const githubInput = document.querySelector('#githubUser');
const loadReposButton = document.querySelector('#loadRepos');
const repoList = document.querySelector('#repoList');

async function loadGitHubRepos() {
  const username = githubInput.value.trim();
  if (!username) {
    repoList.innerHTML = '<p class="muted">GitHubユーザー名を入力してください。</p>';
    return;
  }

  repoList.innerHTML = '<p class="muted">取得中です。</p>';

  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error('GitHub API request failed');
    const repos = await response.json();

    if (!repos.length) {
      repoList.innerHTML = '<p class="muted">公開リポジトリが見つかりませんでした。</p>';
      return;
    }

    repoList.innerHTML = repos.map((repo) => `
      <article class="repo-item">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
        <p>${repo.description || '説明文は未設定です。'}</p>
        <small>${repo.language || 'Language unknown'} / Updated: ${new Date(repo.updated_at).toLocaleDateString('ja-JP')}</small>
      </article>
    `).join('');
  } catch (error) {
    repoList.innerHTML = '<p class="muted">リポジトリを取得できませんでした。ユーザー名または通信状態を確認してください。</p>';
  }
}

loadReposButton?.addEventListener('click', loadGitHubRepos);
githubInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') loadGitHubRepos();
});
