import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import {
  MdArrowBack,
  MdSearch,
  MdFilterList,
  MdRemoveRedEye,
  MdDelete,
  MdFileDownload,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCheckCircle,
  MdPerson,
  MdWork,
  MdRefresh,
  MdFilePresent,
  MdOpenInNew,
} from "react-icons/md";
import { HiUsers, HiOutlineUsers } from "react-icons/hi";
import { toast } from "react-toastify";
import AdminTable from "../../../components/AdminTable";
import Pagination from "../../../components/Pagination";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import { getPageRange } from "../../../utils/helpers";
import apiClient from "../../../services/apiClient";
import {
  updateApplicantStatusInStorage,
  updateApplicantNotesInStorage,
} from "./data/demoApplicants";

const PAGE_SIZE = 5;

const getFullFileUrl = (url) => {
  if (!url) return "#";
  if (url.startsWith("http")) return url;
  const backendBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  return `${backendBase}${url.startsWith("/") ? "" : "/"}${url}`;
};

const STATUS_CONFIG = {
  ALL: { label: "All Applicants" },
  PENDING: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  REVIEWING: {
    label: "Under Review",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
  SHORTLISTED: {
    label: "Shortlisted",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
  INTERVIEW: {
    label: "Interview",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    dot: "bg-indigo-500",
  },
  HIRED: {
    label: "Hired",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  REJECTED: {
    label: "Rejected",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
};

const TABLE_COLUMNS = [
  { label: "Applicant" },
  { label: "Experience & Location" },
  { label: "Applied Date" },
  { label: "Resume / CV" },
  { label: "Status" },
  { label: "Actions", align: "right" },
];

export default function JobApplicants() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [job, setJob] = useState(location.state?.job || null);
  const [loadingJob, setLoadingJob] = useState(!location.state?.job);

  // Applicants state
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(true);
  const [apiMeta, setApiMeta] = useState(null);
  const [apiStatusCounts, setApiStatusCounts] = useState(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [applicantToDelete, setApplicantToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Fetch Job info if not provided in location state
  useEffect(() => {
    let isCancelled = false;

    if (!job && jobId) {
      const fetchJobDetails = async () => {
        try {
          const res = await apiClient.get(`/api/v1/jobs/${jobId}`);
          if (!isCancelled && res.data?.data) {
            setJob(res.data.data);
          }
        } catch (err) {
          console.warn("Could not fetch job info from API:", err);
        } finally {
          if (!isCancelled) setLoadingJob(false);
        }
      };
      fetchJobDetails();
    } else {
      setLoadingJob(false);
    }

    return () => {
      isCancelled = true;
    };
  }, [jobId, job]);

  // 2. Fetch Applicants from API (with demo data fallback)
  const fetchApplicants = useCallback(async () => {
    if (!jobId) return;
    setLoadingApplicants(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", PAGE_SIZE);
      if (searchQuery.trim()) params.append("searchTerm", searchQuery.trim());
      if (statusFilter && statusFilter !== "ALL") params.append("status", statusFilter);

      const res = await apiClient.get(`/api/v1/jobs/${jobId}/applicants?${params.toString()}`);
      if (res.data?.success) {
        const rawList = Array.isArray(res.data.data)
          ? res.data.data
          : (res.data.data?.applicants || []);
        const pagination = res.data.meta || res.data.data?.pagination || { page: 1, limit: PAGE_SIZE, total: rawList.length, totalPages: 1 };
        const counts = res.data.statusCounts || res.data.data?.statusCounts || null;

        if (rawList && rawList.length > 0) {
          const normalized = rawList.map((app) => {
            let exp = app.experience || "";
            let loc = app.location || "";
            let avatar = app.avatar || null;

            if (Array.isArray(app.answers)) {
              app.answers.forEach((ans) => {
                const title = (ans.question?.title || "").toLowerCase();
                if (!exp && (title.includes("experience") || title.includes("years"))) {
                  exp = typeof ans.answerData === "string" ? ans.answerData : JSON.stringify(ans.answerData);
                }
                if (!loc && (title.includes("location") || title.includes("city") || title.includes("address"))) {
                  loc = typeof ans.answerData === "string" ? ans.answerData : JSON.stringify(ans.answerData);
                }
              });
            }

            return {
              id: app.id,
              jobId: app.jobId,
              jobTitle: app.job?.title || job?.title || "Job Position",
              applicantName: app.applicantName,
              applicantEmail: app.applicantEmail,
              applicantPhone: app.applicantPhone || "N/A",
              location: loc || "Dhaka, Bangladesh",
              experience: exp || "N/A",
              avatar,
              appliedAt: app.createdAt,
              status: app.status || "PENDING",
              resumeUrl: app.resumeUrl,
              resumeName: app.resumeUrl ? app.resumeUrl.split("/").pop() : null,
              resumeSize: app.resumeUrl ? "PDF" : null,
              recruiterNotes: app.recruiterNotes || "",
              answers: (app.answers || []).map((ans) => ({
                questionId: ans.questionId,
                questionTitle: ans.question?.title || "Question",
                type: ans.question?.type ? ans.question.type.toLowerCase().replace(/ /g, "_") : "short_answer",
                value: ans.answerData,
              })),
              isFromApi: true,
            };
          });
          setApplicants(normalized);
          setApiMeta(pagination);
          setApiStatusCounts(counts);
        } else {
          setApplicants([]);
          setApiMeta(pagination || { total: 0, totalPages: 1 });
          if (counts) setApiStatusCounts(counts);
        }
      }
    } catch (err) {
      console.warn("Could not fetch applicants from API:", err);
      setApplicants([]);
      setApiMeta({ total: 0, totalPages: 1 });
    } finally {
      setLoadingApplicants(false);
    }
  }, [jobId, page, searchQuery, statusFilter, job?.title]);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  // Handle status update
  const handleStatusChange = async (applicantId, newStatus) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === applicantId ? { ...app, status: newStatus } : app
      )
    );
    try {
      await apiClient.patch(`/api/v1/jobs/applicants/${applicantId}/status`, {
        status: newStatus,
      });
      toast.success(`Applicant status updated to ${STATUS_CONFIG[newStatus]?.label || newStatus}`);
    } catch (err) {
      updateApplicantStatusInStorage(applicantId, newStatus);
      toast.success(`Applicant status updated to ${STATUS_CONFIG[newStatus]?.label || newStatus}`);
    }
  };

  // View full submission page
  const handleViewApplicant = (applicant) => {
    navigate(
      `/admin/jobs/${jobId || applicant.jobId}/applicants/${applicant.id}`,
      {
        state: { applicant, job },
      },
    );
  };

  // Delete applicant confirmation handler
  const confirmDeleteApplicant = async () => {
    if (!applicantToDelete) return;
    setIsDeleting(true);
    try {
      await apiClient.delete(`/api/v1/jobs/applicants/${applicantToDelete.id}`);
      toast.success("Applicant deleted successfully");
      setApplicantToDelete(null);
      fetchApplicants();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete applicant");
    } finally {
      setIsDeleting(false);
    }
  };

  // Counts for tabs
  const statusCounts = useMemo(() => {
    if (apiStatusCounts) {
      return apiStatusCounts;
    }
    const counts = { ALL: applicants.length };
    applicants.forEach((a) => {
      const st = a.status || "PENDING";
      counts[st] = (counts[st] || 0) + 1;
    });
    return counts;
  }, [applicants, apiStatusCounts]);

  // Filtered applicants (only used when client-side fallback pagination is active)
  const isServerSide = !!apiMeta;

  const filteredApplicants = useMemo(() => {
    if (isServerSide) return applicants;

    return applicants.filter((app) => {
      const matchesStatus =
        statusFilter === "ALL" ? true : app.status === statusFilter;

      if (!matchesStatus) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const name = (app.applicantName || "").toLowerCase();
      const email = (app.applicantEmail || "").toLowerCase();
      const phone = (app.applicantPhone || "").toLowerCase();
      const loc = (app.location || "").toLowerCase();
      const exp = (app.experience || "").toLowerCase();

      return (
        name.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        loc.includes(q) ||
        exp.includes(q)
      );
    });
  }, [applicants, statusFilter, searchQuery, isServerSide]);

  // Pagination calculation
  const totalItems = isServerSide ? (apiMeta?.total ?? applicants.length) : filteredApplicants.length;
  const totalPages = isServerSide ? Math.max(1, apiMeta?.totalPages ?? 1) : Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const pageRange = getPageRange(page, totalPages);
  const rangeStart = totalItems === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, totalItems);

  const paginatedApplicants = useMemo(() => {
    if (isServerSide) return applicants;
    const start = (page - 1) * PAGE_SIZE;
    return filteredApplicants.slice(start, start + PAGE_SIZE);
  }, [filteredApplicants, applicants, page, isServerSide]);

  const handlePage = (p) => {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const jobTitle = job?.title || "Product Designer";
  const jobDepartment = job?.department || "Product & Design";

  return (
    <div className="w-full space-y-6">
      {/* ─── Back to Jobs Button ─── */}
      <div>
        <button
          type="button"
          onClick={() => navigate("/admin/jobs")}
          className="flex items-center text-[13px] text-gray-500 hover:text-gray-800 transition-colors font-medium cursor-pointer"
        >
          <MdArrowBack size={16} className="mr-1.5" /> Back to Jobs
        </button>
      </div>

      {/* ─── Header Info & Actions ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {jobTitle}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-[#ff6533] border border-orange-200">
              {applicants.length} Applicants
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {jobDepartment} • Review candidate submissions, resumes, and
            question responses
          </p>
        </div>

        {/* View Public Job Link */}
        {job?.id && (
          <a
            href={`/careers/${job.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-gray-200 text-gray-600 hover:text-[#ff6533] hover:border-orange-200 shadow-2xs transition-all"
          >
            <span>View Public Job</span>
            <MdOpenInNew className="text-xs" />
          </a>
        )}
      </div>

      {/* ─── Metric Cards ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Applicants */}
        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Total Applied
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              {applicants.length}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              All candidate submissions
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#ff6533] flex items-center justify-center text-2xl shadow-xs">
            <HiUsers />
          </div>
        </div>

        {/* Under Review */}
        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Under Review
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1">
              {(statusCounts.REVIEWING || 0) + (statusCounts.PENDING || 0)}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Pending HR screening</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shadow-xs">
            <MdWork />
          </div>
        </div>

        {/* Shortlisted / Interview */}
        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Interview / Shortlist
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-600 mt-1">
              {(statusCounts.SHORTLISTED || 0) + (statusCounts.INTERVIEW || 0)}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Qualified candidates</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl shadow-xs">
            <MdCheckCircle />
          </div>
        </div>

        {/* Hired */}
        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Hired
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
              {statusCounts.HIRED || 0}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Offer accepted</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shadow-xs">
            <MdPerson />
          </div>
        </div>
      </div>

      {/* ─── Search & Status Filter Dropdown ─── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search by applicant name, email, phone, location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6533]/40 focus:border-[#ff6533] transition-all bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative shrink-0 min-w-[200px]">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              aria-label="Filter applicants by status"
              className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-2xs hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6533]/40 focus:border-[#ff6533] transition-all cursor-pointer"
            >
              <option value="ALL">All Applicants ({statusCounts.ALL || 0})</option>
              <option value="PENDING">Pending ({statusCounts.PENDING || 0})</option>
              <option value="REVIEWING">Under Review ({statusCounts.REVIEWING || 0})</option>
              <option value="SHORTLISTED">Shortlisted ({statusCounts.SHORTLISTED || 0})</option>
              <option value="INTERVIEW">Interview ({statusCounts.INTERVIEW || 0})</option>
              <option value="HIRED">Hired ({statusCounts.HIRED || 0})</option>
              <option value="REJECTED">Rejected ({statusCounts.REJECTED || 0})</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Applicants Table ─── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {paginatedApplicants.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-orange-50 text-[#ff6533] flex items-center justify-center mx-auto mb-3 text-2xl">
              <HiOutlineUsers />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-1">
              No applicants found
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto">
              {searchQuery || statusFilter !== "ALL"
                ? "No applicants matched your search and filter criteria. Try clearing filters."
                : "No one has applied to this position yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <AdminTable
              columns={TABLE_COLUMNS}
              ariaLabel="Job applicants table"
            >
              {paginatedApplicants.map((applicant) => {
                const status = applicant.status || "PENDING";
                const statusMeta =
                  STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;

                return (
                  <tr
                    key={applicant.id}
                    className="border-b border-gray-50 hover:bg-orange-50/20 transition-colors group"
                  >
                    {/* Applicant Profile */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3.5">
                        {applicant.avatar ? (
                          <img
                            src={applicant.avatar}
                            alt={applicant.applicantName}
                            className="w-10 h-10 rounded-xl object-cover shrink-0 border border-gray-100 shadow-2xs"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-[#ff6533] text-white text-sm font-bold flex items-center justify-center shrink-0">
                            {applicant.applicantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900 group-hover:text-[#ff6533] transition-colors truncate">
                            {applicant.applicantName}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-0.5">
                            <span className="truncate hover:text-gray-700 transition-colors">
                              {applicant.applicantEmail}
                            </span>
                            <span>•</span>
                            <span>{applicant.applicantPhone}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Experience & Location */}
                    <td className="px-5 py-4">
                      <div className="text-xs text-gray-700">
                        <span className="font-semibold">
                          {applicant.experience || "N/A"}
                        </span>
                        {applicant.location && (
                          <div className="flex items-center gap-1 text-gray-400 mt-0.5">
                            <MdLocationOn className="text-red-400 text-xs shrink-0" />
                            <span className="truncate">
                              {applicant.location}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Applied Date */}
                    <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(applicant.appliedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </td>

                    {/* Resume / CV */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {applicant.resumeUrl || applicant.resumeName ? (
                        <a
                          href={getFullFileUrl(applicant.resumeUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-gray-700 hover:text-[#ff6533] transition-all"
                          title={applicant.resumeName || "Resume"}
                        >
                          <MdFileDownload className="text-sm text-[#ff6533]" />
                          <span className="truncate max-w-[120px]">
                            CV ({applicant.resumeSize || "PDF"})
                          </span>
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          None
                        </span>
                      )}
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <select
                        value={status}
                        onChange={(e) =>
                          handleStatusChange(applicant.id, e.target.value)
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${statusMeta.bg} ${statusMeta.text} ${statusMeta.border} shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#ff6533]/40 cursor-pointer`}
                      >
                        {[
                          "PENDING",
                          "REVIEWING",
                          "SHORTLISTED",
                          "INTERVIEW",
                          "HIRED",
                          "REJECTED",
                        ].map((stKey) => (
                          <option key={stKey} value={stKey}>
                            {STATUS_CONFIG[stKey].label}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Actions: EYE BUTTON & DELETE BUTTON */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* THE EYE BUTTON */}
                        <button
                          type="button"
                          onClick={() => handleViewApplicant(applicant)}
                          title="View Applicant Submission Details"
                          aria-label={`View full submission for ${applicant.applicantName}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-orange-50 hover:bg-[#ff6533] text-[#ff6533] hover:text-white border border-orange-200 hover:border-[#ff6533] transition-all duration-200 shadow-2xs hover:shadow-xs group/eye cursor-pointer"
                        >
                          <MdRemoveRedEye className="text-base transition-transform group-hover/eye:scale-110" />
                          <span>View Form</span>
                        </button>

                        {/* DELETE BUTTON */}
                        <button
                          type="button"
                          onClick={() => setApplicantToDelete(applicant)}
                          title={`Delete ${applicant.applicantName}`}
                          aria-label={`Delete applicant ${applicant.applicantName}`}
                          className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                        >
                          <MdDelete className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </AdminTable>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-700">
                {rangeStart} to {rangeEnd}
              </span>{" "}
              of <span className="font-bold text-gray-700">{totalItems}</span>{" "}
              applicants
            </p>
            <Pagination
              page={page}
              totalPages={totalPages}
              pageRange={pageRange}
              onPage={handlePage}
            />
          </div>
        )}
      </div>

      {/* ─── Confirm Delete Modal ─── */}
      {applicantToDelete && (
        <ConfirmDeleteModal
          title="Delete Applicant?"
          description={`Are you sure you want to delete ${applicantToDelete.applicantName}'s application?`}
          hint="This action is permanent and cannot be undone."
          confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"}
          onConfirm={confirmDeleteApplicant}
          onCancel={() => setApplicantToDelete(null)}
          onClose={() => setApplicantToDelete(null)}
        />
      )}
    </div>
  );
}
