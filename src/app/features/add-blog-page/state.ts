import { inject, Injectable, signal } from '@angular/core';
import { AddBlogService, CreatedBlog } from './add-blog.service';
import { Router } from '@angular/router';


type BlogState = {
error?: string;
loading?: boolean;
};


@Injectable({ providedIn: 'root' })
export class BlogStore {
#state = signal<BlogState>({ error: undefined, loading: false }, { debugName: 'BlogState' });
state = this.#state.asReadonly();


private blogService = inject(AddBlogService);
private router = inject(Router);


async addBlog(blog: CreatedBlog) {
this.#state.set({ error: undefined, loading: true });