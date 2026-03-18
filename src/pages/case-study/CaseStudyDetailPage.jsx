import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getProjectBySlug } from './data/projects';
import CaseStudyDetail from './components/CaseStudyDetail';

const CaseStudyDetailPage = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} – Maktech`;
    }
    return () => {
      document.title = 'Maktech';
    };
  }, [project]);

  if (!project) return <Navigate to='/case-study' replace />;

  return (
    <main>
      <CaseStudyDetail project={project} />
    </main>
  );
};

export default CaseStudyDetailPage;
