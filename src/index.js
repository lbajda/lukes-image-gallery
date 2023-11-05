import React from 'react'
import './tailwind.css'
import App from './App'

import { createRoot } from 'react-dom/client'
/**
 * The container element for the image gallery.
 * @type {HTMLElement}
 */
const container = document.getElementById('app')
const root = createRoot(container)
root.render(<App />)
