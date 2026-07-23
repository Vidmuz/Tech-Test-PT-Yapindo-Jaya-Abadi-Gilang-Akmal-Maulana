import type { Metadata } from "next";
import { UserDetailView } from "./UserDetailView";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: username,
    description: `Explore ${username}'s GitHub profile and repositories on GitExplorer.`,
  };
}

export default async function UserPage({ params }: PageProps) {
  const { username } = await params;
  return <UserDetailView username={username} />;
}
