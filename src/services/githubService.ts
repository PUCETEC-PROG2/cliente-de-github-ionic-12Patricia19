import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  }
});

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  private: boolean;
  updated_at: string;
  html_url: string;
  owner: {
    login: string;
  };
}

export interface User {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  email: string | null;
  blog: string | null;
  company: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface CreateRepositoryData {
  name: string;
  description?: string;
  private?: boolean;
  auto_init?: boolean;
  gitignore_template?: string;
  license_template?: string;
}

export interface UpdateRepositoryData {
  name?: string;
  description?: string;
  private?: boolean;
}

export const getRepositories = async (): Promise<Repository[]> => {
  const response = await githubApi.get<Repository[]>('/user/repos', {
    params: {
      sort: 'updated',
      per_page: 100
    }
  });
  return response.data;
};

export const getUserInfo = async (): Promise<User> => {
  const response = await githubApi.get<User>('/user');
  return response.data;
};

export const createRepository = async (data: CreateRepositoryData): Promise<Repository> => {
  const response = await githubApi.post<Repository>('/user/repos', data);
  return response.data;
};

export const deleteRepository = async (owner: string, repo: string): Promise<void> => {
  await githubApi.delete(`/repos/${owner}/${repo}`);
};

export const updateRepository = async (owner: string, repo: string, data: UpdateRepositoryData): Promise<Repository> => {
  const response = await githubApi.patch<Repository>(`/repos/${owner}/${repo}`, data);
  return response.data;
};
