import { redirect } from 'next/navigation';
import { TAB_SHORT } from '@/constants';
type ParamsType = {
    locale: string;
};
type ProjectsPropsType = {
    params: ParamsType;
};
export default async function Projects({ params }: ProjectsPropsType) {
    const { locale } = params;
    redirect(`/${locale}/discover/${TAB_SHORT}-projects`);
}
