import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getProjectBySlug } from './data/projects';
import CaseStudyDetail from './components/CaseStudyDetail';
import apiClient from '../../services/apiClient';

const CaseStudyDetailPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const staticProject = getProjectBySlug(slug);
  const [project, setProject] = useState(location.state?.project || staticProject);
  const [loading, setLoading] = useState(!project);

  useEffect(() => {
    let isCancelled = false;

    // If already populated from location state or static data, nothing to fetch
    if (project) {
      setLoading(false);
      return;
    }

    if (!slug) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchCaseStudy = async () => {
      // 1. Try directly fetching by slug (or ID if slug is an ID)
      try {
        const res = await apiClient.get(`/api/v1/case-studies/${encodeURIComponent(slug)}`);
        if (!isCancelled && res.data?.success && res.data.data) {
          setProject(res.data.data);
          return;
        }
      } catch (directErr) {
        console.warn('Direct fetch by slug failed:', directErr);
      }

      // 2. Check query param ?id= if available
      const queryParams = new URLSearchParams(location.search);
      const queryId = queryParams.get('id');
      if (queryId && queryId !== slug) {
        try {
          const idRes = await apiClient.get(`/api/v1/case-studies/${encodeURIComponent(queryId)}`);
          if (!isCancelled && idRes.data?.success && idRes.data.data) {
            setProject(idRes.data.data);
            return;
          }
        } catch (idErr) {
          console.warn('Fetch by query id failed:', idErr);
        }
      }

      // 3. Fallback: Fetch case studies list and look for matching slug or id
      try {
        const listRes = await apiClient.get(`/api/v1/case-studies?limit=100`);
        const items = listRes.data?.data;
        if (Array.isArray(items)) {
          const found = items.find(
            (item) => item.slug === slug || item.id === slug || (queryId && item.id === queryId)
          );
          if (!isCancelled && found) {
            setProject(found);
            return;
          }
        }
      } catch (listErr) {
        console.error('List fallback failed:', listErr);
      }
    };

    fetchCaseStudy().finally(() => {
      if (!isCancelled) {
        setLoading(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [slug, location.search, project]);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} – Maktech`;
    }
    return () => {
      document.title = 'Maktech';
    };
  }, [project]);

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-bg-cta border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Case Study Not Found</h2>
        <p className="text-gray-400 mb-6 max-w-md">
          The case study you are looking for might have been moved or does not exist.
        </p>
        <Link
          to="/case-study"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-bg-cta hover:bg-[#e5501a] text-white rounded-lg font-medium transition-all"
        >
          Back to Case Studies
        </Link>
      </main>
    );
  }

  return (
    <main>
      <CaseStudyDetail project={project} />
    </main>
  );
};

export default CaseStudyDetailPage;
