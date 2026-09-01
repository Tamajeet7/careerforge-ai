import type { SectionItem } from "../parser/parser.types";

/**
 * Returns true if a line looks like a section entry title (job title, project heading, etc.)
 * Titles contain a year, a month name, or a pipe separator.
 * They do NOT end with a period or semicolon (those are bullet/sentence endings).
 */
function isTitleLine(line: string): boolean {
  if (line.endsWith(".") || line.endsWith(";")) return false;

  const hasPipe = line.includes("|");
  const hasYear = /\b(19|20)\d{2}\b/.test(line);
  const hasDateMonth =
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i.test(line);

  return hasPipe || hasYear || hasDateMonth;
}

/**
 * Parses a resume section into structured SectionItems.
 *
 * Each item has:
 *   - title    : the bold primary heading (e.g. "VLSI Intern | June 2025 – July 2025")
 *   - subtitle : the italic secondary line (e.g. "Apsis Solutions · Remote")
 *   - bullets  : the bullet-point descriptions
 *
 * State machine:
 *   - When NOT in a bullet:
 *       1st non-bullet line  → title
 *       2nd non-bullet line  → subtitle (same item — this is the italic line)
 *       3rd non-bullet line  → flush current item, start new item
 *   - Bare "•" line → start a new bullet
 *   - While in a bullet:
 *       line that looks like a title → flush and start new item
 *       anything else                → continuation of the current bullet
 */
export function extractListItems(section: string): SectionItem[] {
  if (!section) return [];

  const lines = section.split("\n").map((l) => l.trim()).filter(Boolean);

  const items: SectionItem[] = [];
  let currentTitle = "";
  let currentSubtitle = "";
  let currentBullets: string[] = [];
  let currentBulletText: string | null = null; // null = not building a bullet

  const flushBullet = () => {
    if (currentBulletText !== null) {
      const text = currentBulletText.trim();
      if (text.length > 0) currentBullets.push(text);
      currentBulletText = null;
    }
  };

  const flushItem = () => {
    flushBullet();
    if (currentTitle.length > 0 || currentBullets.length > 0) {
      items.push({
        title: currentTitle.trim(),
        ...(currentSubtitle.trim() && { subtitle: currentSubtitle.trim() }),
        bullets: [...currentBullets],
      });
    }
    currentTitle = "";
    currentSubtitle = "";
    currentBullets = [];
  };

  for (const line of lines) {
    // ── Bare bullet marker ──────────────────────────────────────────────
    if (line === "•" || line === "·") {
      flushBullet();
      currentBulletText = "";
      continue;
    }

    // ── We are inside a bullet ──────────────────────────────────────────
    if (currentBulletText !== null) {
      if (isTitleLine(line)) {
        // New entry title encountered — flush everything and start fresh
        flushItem();
        currentTitle = line;
      } else {
        // Continuation of a line-wrapped bullet
        currentBulletText =
          currentBulletText.length > 0
            ? currentBulletText + " " + line
            : line;
      }
      continue;
    }

    // ── Not in a bullet: accumulate title / subtitle ────────────────────
    if (currentTitle === "") {
      // First line of a new entry → title
      currentTitle = line;
    } else if (currentSubtitle === "") {
      // Second line of the entry → subtitle (the italic line in the PDF)
      currentSubtitle = line;
    } else {
      // Third non-bullet line → must be a new entry entirely
      flushItem();
      currentTitle = line;
    }
  }

  flushItem(); // persist the last accumulated item

  return items.filter(
    (item) => item.title.length > 0 || item.bullets.length > 0
  );
}
