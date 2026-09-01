import type { SectionItem } from '../parser/parser.types';
import { extractListItems } from './list.extractor';

export function extractExperience(section: string): SectionItem[] {
  return extractListItems(section);
}
