import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AirtableBootstrap } from './components/AirtableBootstrap'
import { CommandPalette } from './components/CommandPalette'
import { SiteNav } from './components/SiteNav'
import { ThemeToggle } from './components/ThemeToggle'
import { ProjectProvider } from './context/ProjectContext'
import { DEFAULT_PROJECT_SLUG } from './projects/registry'
import { KitShelfPage } from './projects/lab/KitShelfPage'
import { AnalyzePage } from './projects/lab/AnalyzePage'
import { LivePage } from './projects/lab/LivePage'
import { ProjectLayout } from './routes/ProjectLayout'
import { ProjectShortcutRedirect } from './routes/ProjectShortcutRedirect'
import { WorkbenchSampleFlowsGate } from './routes/WorkbenchSampleFlowsGate'
import { LabHomePage } from './pages/LabHomePage'
import { ProjectsHubPage } from './pages/ProjectsHubPage'
import './App.css'

export default function App() {
  const p = DEFAULT_PROJECT_SLUG
  return (
    <ProjectProvider>
      <AirtableBootstrap />
      <BrowserRouter>
        <div className="app">
          <header className="app-bar">
            <SiteNav />
            <div className="app-bar__right">
              <CommandPalette />
              <ThemeToggle />
            </div>
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<LabHomePage />} />
              <Route path="/lab" element={<Navigate to="/" replace />} />
              <Route path="/p" element={<Navigate to="/projects" replace />} />
              <Route path="/j" element={<ProjectShortcutRedirect to="kits" />} />
              <Route path="/k" element={<ProjectShortcutRedirect to="kits" />} />
              <Route path="/a" element={<ProjectShortcutRedirect to="analyze" />} />
              <Route path="/l" element={<ProjectShortcutRedirect to="live" />} />
              <Route path="/projects" element={<ProjectsHubPage />} />
              <Route path="/projects/:projectSlug" element={<ProjectLayout />}>
                <Route index element={<Navigate to="kits" relative="path" replace />} />
                <Route path="kits" element={<KitShelfPage />} />
                <Route
                  path="analyze"
                  element={
                    <WorkbenchSampleFlowsGate>
                      <AnalyzePage />
                    </WorkbenchSampleFlowsGate>
                  }
                />
                <Route
                  path="live"
                  element={
                    <WorkbenchSampleFlowsGate>
                      <LivePage />
                    </WorkbenchSampleFlowsGate>
                  }
                />
              </Route>
              <Route path="/kits" element={<Navigate to={`/projects/${p}/kits`} replace />} />
              <Route path="/analyze" element={<Navigate to={`/projects/${p}/analyze`} replace />} />
              <Route path="/live" element={<Navigate to={`/projects/${p}/live`} replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ProjectProvider>
  )
}
