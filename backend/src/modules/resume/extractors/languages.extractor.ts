import type { SectionItem } from '../parser/parser.types';
import { extractListItems } from './list.extractor';

export function extractLanguages(section: string): SectionItem[] {
  return extractListItems(section);
}
