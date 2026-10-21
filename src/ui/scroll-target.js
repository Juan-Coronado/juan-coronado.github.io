/** Calculate the next reading position without skipping content in tall sections. */
export function sectionScrollTarget(sections, scrollTop, viewportHeight, direction, { overlap, tolerance }) {
  if (!sections.length || viewportHeight <= 0 || !direction) return scrollTop;
  const found = sections.findIndex(section => scrollTop < section.bottom - tolerance);
  const index = found < 0 ? sections.length - 1 : found;
  const current = sections[index];
  const pageStep = viewportHeight * (1 - overlap);

  if (direction > 0) {
    const lastReadingPosition = Math.max(current.top, current.bottom - viewportHeight);
    if (scrollTop < lastReadingPosition - tolerance) {
      return Math.min(scrollTop + pageStep, lastReadingPosition);
    }
    return sections[index + 1]?.top ?? lastReadingPosition;
  }

  if (scrollTop > current.top + tolerance) return Math.max(current.top, scrollTop - pageStep);
  const previous = sections[index - 1];
  return previous ? Math.max(previous.top, previous.bottom - viewportHeight) : current.top;
}
