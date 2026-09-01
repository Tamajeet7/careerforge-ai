import type { SectionItem } from '../parser/parser.types';
import { extractListItems } from './list.extractor';

export function extractProjects(section: string): SectionItem[] {
  return extractListItems(section);
}
