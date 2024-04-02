import { Project } from '@/types';

export interface ProjectCardProps {
    project: Project;
    priority?: boolean;
    shouldPreventRouting?: boolean;
}
