import type { Metadata } from "next";
import { RepoDetailView } from "./RepoDetailView";

interface PageProps {
  params: Promise<{ owner: string; repo: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { owner, repo } = await params;
  return {
    title: `${owner}/${repo}`,
    description: `Explore the ${owner}/${repo} repository on GitExplorer — stats, languages, contributors, and README.`,
  };
}

export default async function RepositoryPage({ params }: PageProps) {
  const { owner, repo } = await params;
  return <RepoDetailView owner={owner} repo={repo} />;
}
