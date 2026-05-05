import { FileBarChart, Download, ShieldCheck, AlertTriangle, Activity } from 'lucide-react';

const reports = [
  {
    title: 'Daily Security Summary',
    description: 'Overview of today’s logs, alerts, and detected threats.',
    status: 'Ready',
    icon: Activity,
  },
  {
    title: 'Critical Threat Report',
    description: 'Detailed report for high-risk and critical security events.',
    status: 'Ready',
    icon: AlertTriangle,
  },
  {
    title: 'System Health Report',
    description: 'Summary of system uptime, health status, and monitoring results.',
    status: 'Draft',
    icon: ShieldCheck,
  },
];

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#0f0f17] border border-[#1f1f2e] p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <FileBarChart className="size-7 text-indigo-400" />
          <h2 className="text-2xl font-semibold text-white">Security Reports</h2>
        </div>

        <p className="text-gray-400">
          Generate and review SIEM reports for logs, alerts, system health, and security activity.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {reports.map((report) => {
          const Icon = report.icon;

          return (
            <div
              key={report.title}
              className="bg-[#0f0f17] border border-[#1f1f2e] p-5 rounded-xl hover:border-indigo-500/60 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-indigo-500/10">
                  <Icon className="size-6 text-indigo-400" />
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-[#14141d] text-gray-300 border border-[#2a2a3a]">
                  {report.status}
                </span>
              </div>

              <h3 className="text-lg font-medium text-white mb-2">{report.title}</h3>
              <p className="text-sm text-gray-400 mb-5">{report.description}</p>

              <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg transition">
                <Download className="size-4" />
                View Report
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}