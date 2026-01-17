import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Issue {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignee?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssuesResponse {
  items: Issue[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listIssues(params?: {
    search?: string;
    status?: string;
    priority?: string;
    assignee?: string;
    sort?: string;
    page?: number;
    pageSize?: number;
  }): Observable<IssuesResponse> {
    let httpParams = new HttpParams();
    
    if (params) {
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.status) httpParams = httpParams.set('status', params.status);
      if (params.priority) httpParams = httpParams.set('priority', params.priority);
      if (params.assignee) httpParams = httpParams.set('assignee', params.assignee);
      if (params.sort) httpParams = httpParams.set('sort', params.sort);
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }

    return this.http.get<IssuesResponse>(`${this.apiUrl}/issues`, { params: httpParams });
  }

  getIssue(id: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/issues/${id}`);
  }

  createIssue(issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Observable<Issue> {
    return this.http.post<Issue>(`${this.apiUrl}/issues`, issue);
  }

  updateIssue(id: string, issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/issues/${id}`, issue);
  }

  deleteIssue(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/issues/${id}`);
  }
}
