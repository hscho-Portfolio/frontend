import type { Project } from '../data/types'

export const ProjectDetailPage = ({ project }: { project: Project | null }) => {
  return (
    <div class="project-detail-root">
      <div class="project-window">
        <header class="window-bar window-bar-detail">
          <div class="window-controls">
            <a class="wc wc-close" href="/desktop" title="close"></a>
            <span class="wc wc-min"></span>
            <span class="wc wc-max"></span>
          </div>
          <div class="window-title" id="pd-window-title">Loading...</div>
          <div class="window-spacer">
            <a class="window-action" href="/desktop">
              <i class="fa-solid fa-arrow-left"></i> Desktop
            </a>
          </div>
        </header>
        <div id="pd-content"></div>
      </div>
    </div>
  )
}
