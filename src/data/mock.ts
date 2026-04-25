/**
 * @deprecated 이 파일은 기존 import 경로 호환을 위한 barrel re-export 레이어입니다.
 *
 * 새 코드는 가능하면 명시적 경로로 import 하세요:
 *   import type { TechStack, Project } from './data/types'
 *   import { ALL_STACKS, STACK_CATEGORIES, pickStacks } from './data/stacks'
 *   import { PROJECTS, findProject } from './data/projects'
 */
export type {
  StackCategory,
  ProjectStatus,
  TechStack,
  ProjectLinks,
  Project,
} from './types'

export { ALL_STACKS, STACK_CATEGORIES, pickStacks, findStack } from './stacks'
export { PROJECTS, findProject, featuredProjects, projectsByCategory } from './projects'
