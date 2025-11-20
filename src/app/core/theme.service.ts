import { DOCUMENT } from '@angular/common';
import { inject, Injectable, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  #renderer!: Renderer2;
  #rendererFactory: RendererFactory2 = inject(RendererFactory2)
  #document = inject(DOCUMENT)

  #currentTheme = new BehaviorSubject<'dark' | 'light'>('dark')
  currentTheme$ = this.#currentTheme.asObservable()

  constructor() {
    this.#renderer = this.#rendererFactory.createRenderer(null, null)
    this.loadSavedTheme()
  }

  setTheme(theme: 'dark' | 'light') {
    this.#currentTheme.next(theme)

    this.#renderer.setAttribute(this.#document.body, 'data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark'

    if (this.isValidTheme(savedTheme)) {
      this.setTheme(savedTheme)
    } else {
      this.setTheme('dark')
    }
  }

  toggleTheme() {
    const newTheme = this.#currentTheme.value == 'dark' ? 'light' : 'dark'
    this.setTheme(newTheme)
  }
  currTheme() {
    return this.#currentTheme.value
  }

  private isValidTheme(theme: string | null): theme is 'dark' | 'light' {
    return theme == 'dark' || theme == 'light'
  }

}
