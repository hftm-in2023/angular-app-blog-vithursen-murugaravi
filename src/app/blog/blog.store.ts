import { Injectable, computed, signal } from '@angular/core';
import { Blog } from './blog.schemas';
import { BlogService } from './blog.service';
import { Subject, takeUntil } from 'rxjs';

type BlogState = {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
};

type BlogAction =
  | { type: 'LOAD_BLOGS' }
  | { type: 'LOAD_BLOGS_SUCCESS'; blogs: Blog[] }
  | { type: 'LOAD_BLOGS_FAILURE'; error: string };

@Injectable({ providedIn: 'root' })
export class BlogStore {
  private readonly initialState: BlogState = {
    blogs: [],
    loading: false,
    error: null,
  };

  private readonly action$ = new Subject<BlogAction>();
  private readonly destroy$ = new Subject<void>();

  private readonly state = signal<BlogState>(this.initialState);

  // Selectors as Signals
  readonly blogs = computed(() => this.state().blogs);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  constructor(private readonly blogService: BlogService) {
    // Effect: respond to actions
    this.action$
      .pipe(takeUntil(this.destroy$))
      .subscribe((action) => this.reduce(action));
  }

  // Public API
  dispatch(action: BlogAction) {
    this.action$.next(action);
  }

  loadBlogs() {
    this.dispatch({ type: 'LOAD_BLOGS' });
    this.blogService.getBlogs().subscribe({
      next: (blogs) => this.dispatch({ type: 'LOAD_BLOGS_SUCCESS', blogs }),
      error: (err) => this.dispatch({ type: 'LOAD_BLOGS_FAILURE', error: String(err?.message || err) })
    });
  }

  // Reducer
  private reduce(action: BlogAction) {
    const current = this.state();
    switch (action.type) {
      case 'LOAD_BLOGS': {
        this.state.set({ ...current, loading: true, error: null });
        break;
      }
      case 'LOAD_BLOGS_SUCCESS': {
        this.state.set({ blogs: action.blogs, loading: false, error: null });
        break;
      }
      case 'LOAD_BLOGS_FAILURE': {
        this.state.set({ ...current, loading: false, error: action.error });
        break;
      }
    }
  }

  // Cleanup (optional if app lifetime)
  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


