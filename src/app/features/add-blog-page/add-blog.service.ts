import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { z } from 'zod';
import { environment } from '../../../environments/environment';


const CreatedBlogSchema = z.object({
title: z.string(),
content: z.string(),
});


export type CreatedBlog = z.infer<typeof CreatedBlogSchema>;


@Injectable({ providedIn: 'root' })
export class AddBlogService {
private http = inject(HttpClient);


async addBlog(blog: CreatedBlog): Promise<any> {
// Zod validation
CreatedBlogSchema.parse(blog);


// POST - adjust path to your backend
return lastValueFrom(this.http.post(`${environment.serviceUrl}/entries`, blog));
}


// Utility: check if title exists (used by async validator alternative)
async titleExists(title: string): Promise<boolean> {
try {
const res = await lastValueFrom(
this.http.get<any[]>(`${environment.serviceUrl}/entries`, { params: { title, exact: 'true' } })
);
return Array.isArray(res) && res.length > 0;
} catch {
return false; // fail open
}
}
}