import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage.tsx'
import CalendarPage from './pages/CalendarPage.tsx'
import DatePickerPage from './pages/DatePickerPage.tsx'
import TimePickerPage from './pages/TimePickerPage.tsx'
import TablePage from './pages/TablePage.tsx'
import SchedulePage from './pages/SchedulePage.tsx'
import WeekNavigatorPage from './pages/WeekNavigatorPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/datepicker" element={<DatePickerPage />} />
        <Route path="/timepicker" element={<TimePickerPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/weeknavigator" element={<WeekNavigatorPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
