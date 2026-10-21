/** Unknown difficulty follows the configured levels; ties retain editorial order. */
export function sortProjectsByDifficulty(projects, levels) {
  const ranks = new Map(levels.map((level, index) => [level.id, index]));
  return projects.map((project, index) => ({ project, index }))
    .sort((a, b) => (ranks.get(a.project.difficulty) ?? levels.length) - (ranks.get(b.project.difficulty) ?? levels.length) || a.index - b.index)
    .map(entry => entry.project);
}

export function projectDifficulty(project, data) {
  return data.difficultyLevels.find(level => level.id === project.difficulty)?.label ?? data.unknownDifficulty;
}
