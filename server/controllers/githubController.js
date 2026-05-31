// --- controllers/githubController.js ---
import Portfolio from '../models/Portfolio.js';

export const syncGitHubData = async (req, res) => {
  try {
    const { username } = req.query; 
    if (!username) return res.status(400).json({ message: 'Target profile lookup handle username parameter required.' });

    const userRes = await fetch(`https://api.github.com/users/${username}`);
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);

    if (!userRes.ok || !reposRes.ok) {
      return res.status(404).json({ message: 'GitHub configuration node could not be resolved or fetched.' });
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    // Map properties strictly matching your defined ProjectSchema keys
    const processedGitHubProjects = reposData.slice(0, 6).map(repo => ({
      name: repo.name,
      lang: repo.language || 'JavaScript',
      desc: repo.description || 'No descriptive summary cataloged on repo settings.',
      stars: repo.stargazers_count || 0,
      techStack: repo.language ? [repo.language] : ['Software Core'],
      homepage: repo.homepage || '',
      liveUrl: repo.homepage || '',
      sourceUrl: repo.html_url
    }));

    // 1. Fetch current portfolio configuration state to capture the resume data
    const existingPortfolio = await Portfolio.findOne({ user: req.user._id });
    let existingProjects = existingPortfolio?.projects || [];

    // 2. Deep-merge arrays: append git repos only if they don't share a name with existing ones
    processedGitHubProjects.forEach(gitProj => {
      const isDuplicate = existingProjects.some(
        p => p.name.toLowerCase() === gitProj.name.toLowerCase()
      );
      if (!isDuplicate) {
        existingProjects.push(gitProj);
      }
    });

    const updatePayload = {
      "personalInfo.linkedin": userData.blog || existingPortfolio?.personalInfo?.linkedin || "", 
      profileImage: userData.avatar_url || existingPortfolio?.profileImage || "",
      githubMetrics: {
        totalStars: reposData.reduce((acc, curr) => acc + (curr.stargazers_count || 0), 0),
        totalRepositories: userData.public_repos || 0,
        contributionsThisYear: reposData.length 
      },
      projects: existingProjects // Pure unified array containing BOTH elements!
    };

    const portfolio = await Portfolio.findOneAndUpdate(
      { user: req.user._id },
      { $set: updatePayload },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json(portfolio);
  } catch (error) {
    console.error('[GITHUB SYNC ENGINE CRASH]:', error);
    return res.status(500).json({ message: 'Internal infrastructure sync fault.', error: error.message });
  }
};